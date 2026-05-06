import { useState, useEffect, useRef } from "react";

// ── JAVA SOURCE CODE ──────────────────────────────────────────────────────────
const JAVA = {
  factorial: `import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.math.BigInteger;

public class FactorialGUI extends JFrame {
    private JTextField inputField;
    private JTextArea resultArea;
    private JButton calcBtn;

    public FactorialGUI() {
        setTitle("Factorial Calculator");
        setSize(420, 280);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));
        getContentPane().setBackground(new Color(18, 18, 30));

        // Title
        JLabel title = new JLabel("n! Factorial", SwingConstants.CENTER);
        title.setFont(new Font("Segoe UI", Font.BOLD, 20));
        title.setForeground(new Color(130, 200, 255));
        title.setBorder(BorderFactory.createEmptyBorder(12, 0, 0, 0));
        add(title, BorderLayout.NORTH);

        // Input panel
        JPanel inputPanel = new JPanel(new FlowLayout());
        inputPanel.setBackground(new Color(18, 18, 30));

        inputField = new JTextField(8);
        inputField.setFont(new Font("Consolas", Font.PLAIN, 16));
        inputField.setBackground(new Color(30, 30, 50));
        inputField.setForeground(Color.WHITE);
        inputField.setCaretColor(Color.WHITE);

        calcBtn = new JButton("Calculate");
        calcBtn.setBackground(new Color(80, 140, 255));
        calcBtn.setForeground(Color.WHITE);
        calcBtn.setFocusPainted(false);
        calcBtn.setFont(new Font("Segoe UI", Font.BOLD, 13));

        inputPanel.add(new JLabel("Enter n: ") {{
            setForeground(Color.LIGHT_GRAY);
            setFont(new Font("Segoe UI", Font.PLAIN, 13));
        }});
        inputPanel.add(inputField);
        inputPanel.add(calcBtn);
        add(inputPanel, BorderLayout.CENTER);

        // Result
        resultArea = new JTextArea(4, 30);
        resultArea.setFont(new Font("Consolas", Font.PLAIN, 13));
        resultArea.setBackground(new Color(24, 24, 40));
        resultArea.setForeground(new Color(100, 255, 180));
        resultArea.setEditable(false);
        resultArea.setBorder(BorderFactory.createEmptyBorder(8, 12, 8, 12));
        add(new JScrollPane(resultArea), BorderLayout.SOUTH);

        calcBtn.addActionListener(e -> calculate());
        inputField.addActionListener(e -> calculate());
        setLocationRelativeTo(null);
        setVisible(true);
    }

    // Recursive factorial using BigInteger (handles large numbers)
    private BigInteger factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be >= 0");
        if (n == 0 || n == 1) return BigInteger.ONE;
        return BigInteger.valueOf(n).multiply(factorial(n - 1));
    }

    private void calculate() {
        try {
            int n = Integer.parseInt(inputField.getText().trim());
            BigInteger result = factorial(n);
            resultArea.setText(n + "! = " + result);
        } catch (NumberFormatException ex) {
            resultArea.setText("Please enter a valid integer.");
        } catch (IllegalArgumentException ex) {
            resultArea.setText(ex.getMessage());
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(FactorialGUI::new);
    }
}`,

  bubbleSort: `import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Arrays;

public class BubbleSortGUI extends JFrame {
    private JTextField inputField;
    private JTextArea stepsArea;
    private JButton sortBtn;

    public BubbleSortGUI() {
        setTitle("Bubble Sort Visualizer");
        setSize(500, 420);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));
        getContentPane().setBackground(new Color(20, 15, 30));

        JLabel title = new JLabel("Bubble Sort", SwingConstants.CENTER);
        title.setFont(new Font("Segoe UI", Font.BOLD, 20));
        title.setForeground(new Color(255, 160, 100));
        title.setBorder(BorderFactory.createEmptyBorder(12, 0, 0, 0));
        add(title, BorderLayout.NORTH);

        JPanel inputPanel = new JPanel(new FlowLayout());
        inputPanel.setBackground(new Color(20, 15, 30));

        inputField = new JTextField("64,34,25,12,22,11,90", 22);
        inputField.setFont(new Font("Consolas", Font.PLAIN, 14));
        inputField.setBackground(new Color(35, 25, 50));
        inputField.setForeground(Color.WHITE);
        inputField.setCaretColor(Color.WHITE);

        sortBtn = new JButton("Sort");
        sortBtn.setBackground(new Color(255, 120, 60));
        sortBtn.setForeground(Color.WHITE);
        sortBtn.setFocusPainted(false);
        sortBtn.setFont(new Font("Segoe UI", Font.BOLD, 13));

        inputPanel.add(new JLabel("Numbers (comma-separated): ") {{
            setForeground(Color.LIGHT_GRAY);
        }});
        inputPanel.add(inputField);
        inputPanel.add(sortBtn);
        add(inputPanel, BorderLayout.CENTER);

        stepsArea = new JTextArea();
        stepsArea.setFont(new Font("Consolas", Font.PLAIN, 12));
        stepsArea.setBackground(new Color(15, 10, 25));
        stepsArea.setForeground(new Color(255, 220, 150));
        stepsArea.setEditable(false);
        stepsArea.setBorder(BorderFactory.createEmptyBorder(8, 12, 8, 12));
        add(new JScrollPane(stepsArea), BorderLayout.SOUTH);

        sortBtn.addActionListener(e -> runSort());
        setLocationRelativeTo(null);
        setVisible(true);
    }

    // Bubble Sort with step logging
    private void runSort() {
        try {
            String[] parts = inputField.getText().split(",");
            int[] arr = Arrays.stream(parts)
                .map(String::trim)
                .mapToInt(Integer::parseInt)
                .toArray();

            StringBuilder log = new StringBuilder();
            log.append("Initial: ").append(Arrays.toString(arr)).append("\\n\\n");

            int n = arr.length;
            for (int i = 0; i < n - 1; i++) {
                boolean swapped = false;
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        swapped = true;
                    }
                }
                log.append("Pass ").append(i + 1).append(": ")
                   .append(Arrays.toString(arr)).append("\\n");
                if (!swapped) break;  // Early termination
            }
            log.append("\\nSorted: ").append(Arrays.toString(arr));
            stepsArea.setText(log.toString());
        } catch (NumberFormatException ex) {
            stepsArea.setText("Invalid input. Use comma-separated numbers.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(BubbleSortGUI::new);
    }
}`,

  calculator: `import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Stack;

public class CalculatorGUI extends JFrame {
    private JTextField display;
    private String expression = "";
    private boolean hasResult = false;

    private static final String[][] BUTTONS = {
        {"C", "±", "%", "÷"},
        {"7", "8", "9", "×"},
        {"4", "5", "6", "−"},
        {"1", "2", "3", "+"},
        {"0", ".", "⌫", "="}
    };

    public CalculatorGUI() {
        setTitle("Calculator");
        setSize(320, 480);
        setResizable(false);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        getContentPane().setBackground(new Color(25, 25, 35));

        // Display
        display = new JTextField("0");
        display.setFont(new Font("SF Pro Display", Font.PLAIN, 38));
        display.setHorizontalAlignment(JTextField.RIGHT);
        display.setEditable(false);
        display.setBackground(new Color(25, 25, 35));
        display.setForeground(Color.WHITE);
        display.setBorder(BorderFactory.createEmptyBorder(20, 15, 10, 15));
        add(display, BorderLayout.NORTH);

        // Button grid
        JPanel grid = new JPanel(new GridLayout(5, 4, 6, 6));
        grid.setBackground(new Color(25, 25, 35));
        grid.setBorder(BorderFactory.createEmptyBorder(10, 12, 12, 12));

        Color opColor  = new Color(255, 149, 0);
        Color topColor = new Color(70, 70, 80);
        Color numColor = new Color(50, 50, 62);

        for (String[] row : BUTTONS) {
            for (String label : row) {
                JButton btn = new JButton(label);
                btn.setFont(new Font("Segoe UI", Font.PLAIN, 20));
                btn.setForeground(Color.WHITE);
                btn.setFocusPainted(false);
                btn.setBorderPainted(false);
                btn.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

                if (label.matches("[÷×−+]") || label.equals("="))
                    btn.setBackground(opColor);
                else if (label.matches("[C±%]"))
                    btn.setBackground(topColor);
                else
                    btn.setBackground(numColor);

                btn.addActionListener(e -> handleButton(label));
                grid.add(btn);
            }
        }
        add(grid, BorderLayout.CENTER);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void handleButton(String key) {
        switch (key) {
            case "C" -> { expression = ""; display.setText("0"); hasResult = false; }
            case "⌫" -> {
                if (!expression.isEmpty())
                    expression = expression.substring(0, expression.length() - 1);
                display.setText(expression.isEmpty() ? "0" : expression);
            }
            case "=" -> {
                try {
                    double result = evaluate(expression
                        .replace("×", "*").replace("÷", "/").replace("−", "-"));
                    String formatted = result == (long) result
                        ? String.valueOf((long) result)
                        : String.valueOf(result);
                    display.setText(formatted);
                    expression = formatted;
                    hasResult = true;
                } catch (Exception ex) {
                    display.setText("Error");
                    expression = "";
                }
            }
            case "±" -> {
                try {
                    double v = Double.parseDouble(expression);
                    expression = String.valueOf(-v);
                    display.setText(expression);
                } catch (Exception ignored) {}
            }
            case "%" -> {
                try {
                    double v = Double.parseDouble(expression) / 100;
                    expression = String.valueOf(v);
                    display.setText(expression);
                } catch (Exception ignored) {}
            }
            default -> {
                if (hasResult && key.matches("[0-9.]")) {
                    expression = ""; hasResult = false;
                }
                expression += key;
                display.setText(expression);
            }
        }
    }

    // Evaluate expression using Shunting-yard algorithm
    private double evaluate(String expr) {
        Stack<Double> vals = new Stack<>();
        Stack<Character> ops  = new Stack<>();
        int i = 0;
        while (i < expr.length()) {
            char c = expr.charAt(i);
            if (c == ' ') { i++; continue; }
            if (c == '-' && (i == 0 || expr.charAt(i-1) == '(')) {
                StringBuilder sb = new StringBuilder("-");
                i++;
                while (i < expr.length() && (Character.isDigit(expr.charAt(i)) || expr.charAt(i) == '.'))
                    sb.append(expr.charAt(i++));
                vals.push(Double.parseDouble(sb.toString()));
            } else if (Character.isDigit(c) || c == '.') {
                StringBuilder sb = new StringBuilder();
                while (i < expr.length() && (Character.isDigit(expr.charAt(i)) || expr.charAt(i) == '.'))
                    sb.append(expr.charAt(i++));
                vals.push(Double.parseDouble(sb.toString()));
            } else if (c == '(') { ops.push(c); i++;
            } else if (c == ')') {
                while (ops.peek() != '(') vals.push(applyOp(ops.pop(), vals.pop(), vals.pop()));
                ops.pop(); i++;
            } else if ("+-*/".indexOf(c) >= 0) {
                while (!ops.isEmpty() && prec(ops.peek()) >= prec(c))
                    vals.push(applyOp(ops.pop(), vals.pop(), vals.pop()));
                ops.push(c); i++;
            } else i++;
        }
        while (!ops.isEmpty()) vals.push(applyOp(ops.pop(), vals.pop(), vals.pop()));
        return vals.pop();
    }

    private int prec(char op) {
        return (op == '+' || op == '-') ? 1 : (op == '*' || op == '/') ? 2 : 0;
    }
    private double applyOp(char op, double b, double a) {
        return switch (op) {
            case '+' -> a + b; case '-' -> a - b;
            case '*' -> a * b; case '/' -> a / b; default -> 0;
        };
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(CalculatorGUI::new);
    }
}`
};

// ── HASKELL SOURCE CODE ───────────────────────────────────────────────────────
const HASKELL = {
  factorial: `module Main where

import Graphics.UI.Gtk
import Data.IORef
import Numeric.Natural (Natural)

-- Pure recursive factorial using Integer (arbitrary precision)
factorial :: Integer -> Integer
factorial 0 = 1
factorial n
  | n < 0    = error "Negative input"
  | otherwise = n * factorial (n - 1)

-- Alternative: using product (point-free style)
factorial' :: Integer -> Integer
factorial' n = product [1..n]

main :: IO ()
main = do
  initGUI

  win <- windowNew
  set win [ windowTitle         := "Factorial — Haskell"
          , windowDefaultWidth  := 400
          , windowDefaultHeight := 260
          , containerBorderWidth := 16 ]

  vbox <- vBoxNew False 10
  containerAdd win vbox

  -- Title label
  title <- labelNew (Just "n!  Factorial Calculator")
  miscSetAlignment title 0.5 0.5
  labelSetMarkup title
    "<span font='16' weight='bold' color='#82C8FF'>n!  Factorial Calculator</span>"
  boxPackStart vbox title PackNatural 0

  -- Input row
  hbox <- hBoxNew False 8
  lbl  <- labelNew (Just "Enter n:")
  widgetModifyFg lbl StateNormal (Color 52000 52000 52000)
  entry <- entryNew
  entrySetWidthChars entry 10
  btn   <- buttonNewWithLabel "Calculate"
  mapM_ (\w -> boxPackStart hbox w PackNatural 0) [toWidget lbl, toWidget entry, toWidget btn]
  boxPackStart vbox hbox PackNatural 0

  -- Result label
  result <- labelNew Nothing
  labelSetSelectable result True
  boxPackStart vbox result PackGrow 0

  -- Button handler
  on btn buttonActivated $ do
    txt <- entryGetText entry
    case reads txt :: [(Integer, String)] of
      [(n, "")] ->
        if n < 0
          then labelSetMarkup result
            "<span color='#FF6060'>Error: n must be non-negative</span>"
          else do
            let ans = factorial n
            labelSetMarkup result $
              "<span font='13' color='#64FFB4'>" ++
              show n ++ "! = " ++ show ans ++ "</span>"
      _ -> labelSetMarkup result
             "<span color='#FF6060'>Please enter a valid integer</span>"

  on win deleteEvent $ liftIO mainQuit >> return False
  widgetShowAll win
  mainGUI`,

  bubbleSort: `module Main where

import Graphics.UI.Gtk
import Data.List (intercalate)
import Data.IORef

-- Pure Bubble Sort — returns list of intermediate states
bubbleSort :: Ord a => [a] -> [[a]]
bubbleSort xs = go xs []
  where
    go lst acc
      | lst == sorted = reverse (lst : acc)
      | otherwise     = go (onePass lst) (lst : acc)
    onePass []       = []
    onePass [x]      = [x]
    onePass (x:y:rest)
      | x > y     = y : onePass (x : rest)
      | otherwise  = x : onePass (y : rest)
    sorted = go' xs
    go' l = if l == onePass l then l else go' (onePass l)

showPass :: Show a => Int -> [a] -> String
showPass i xs =
  "Pass " ++ show i ++ ": [" ++
  intercalate ", " (map show xs) ++ "]"

main :: IO ()
main = do
  initGUI
  win <- windowNew
  set win [ windowTitle        := "Bubble Sort — Haskell"
          , windowDefaultWidth  := 520
          , windowDefaultHeight := 420
          , containerBorderWidth := 12 ]

  vbox <- vBoxNew False 8
  containerAdd win vbox

  title <- labelNew Nothing
  labelSetMarkup title
    "<span font='16' weight='bold' color='#FFA064'>Bubble Sort Visualizer</span>"
  boxPackStart vbox title PackNatural 0

  -- Input row
  hbox  <- hBoxNew False 8
  lbl   <- labelNew (Just "Numbers:")
  entry <- entryNew
  entrySetText entry "64,34,25,12,22,11,90"
  entrySetWidthChars entry 28
  btn   <- buttonNewWithLabel "Sort"
  mapM_ (\w -> boxPackStart hbox w PackNatural 0)
    [toWidget lbl, toWidget entry, toWidget btn]
  boxPackStart vbox hbox PackNatural 0

  -- Steps area (scrolled)
  tv    <- textViewNew
  textViewSetEditable tv False
  textViewSetWrapMode tv WrapWord
  sw    <- scrolledWindowNew Nothing Nothing
  scrolledWindowSetPolicy sw PolicyAutomatic PolicyAutomatic
  containerAdd sw tv
  boxPackStart vbox sw PackGrow 0

  on btn buttonActivated $ do
    txt <- entryGetText entry
    let nums = map (read . trim) (splitOn ',' txt) :: [Int]
        steps = bubbleSort nums
        header = "Initial: [" ++ intercalate ", " (map show nums) ++ "]\\n\\n"
        body   = unlines $ zipWith showPass [1..] (tail steps)
        final  = "\\nSorted: [" ++ intercalate ", " (map show (last steps)) ++ "]"
    buf <- textViewGetBuffer tv
    textBufferSetText buf (header ++ body ++ final)

  on win deleteEvent $ liftIO mainQuit >> return False
  widgetShowAll win
  mainGUI

-- Helpers
trim :: String -> String
trim = reverse . dropWhile (== ' ') . reverse . dropWhile (== ' ')

splitOn :: Char -> String -> [String]
splitOn _ "" = []
splitOn d s  = let (pre, suf) = break (== d) s
               in  pre : case suf of { [] -> []; _:rest -> splitOn d rest }`,

  calculator: `module Main where

import Graphics.UI.Gtk
import Data.IORef
import Text.Read (readMaybe)

-- Safe arithmetic evaluation (simple two-operand version)
data Op = Add | Sub | Mul | Div deriving Eq

applyOp :: Op -> Double -> Double -> Double
applyOp Add a b = a + b
applyOp Sub a b = a - b
applyOp Mul a b = a * b
applyOp Div a b = a / b          -- Haskell returns Infinity for /0

opSymbol :: Op -> String
opSymbol Add = "+" ; opSymbol Sub = "−"
opSymbol Mul = "×" ; opSymbol Div = "÷"

formatNum :: Double -> String
formatNum n
  | n == fromIntegral (round n :: Int) = show (round n :: Int)
  | otherwise = show n

data CalcState = CalcState
  { csDisplay  :: String
  , csAccum    :: Double
  , csPendingOp :: Maybe Op
  , csNewEntry :: Bool
  }

initState :: CalcState
initState = CalcState "0" 0 Nothing True

main :: IO ()
main = do
  initGUI
  stateRef <- newIORef initState

  win <- windowNew
  set win [ windowTitle        := "Calculator — Haskell"
          , windowDefaultWidth  := 300
          , windowDefaultHeight := 450
          , containerBorderWidth := 0
          , windowResizable    := False ]

  vbox <- vBoxNew False 4
  containerAdd win vbox

  -- Display
  display <- labelNew (Just "0")
  miscSetAlignment display 1.0 0.5
  labelSetMarkup display "<span font='36' color='white'>0</span>"
  frame <- frameNew
  containerAdd frame display
  boxPackStart vbox frame PackNatural 0

  let updateDisplay = do
        st <- readIORef stateRef
        labelSetMarkup display $
          "<span font='36' color='white'>" ++ csDisplay st ++ "</span>"

  -- Button grid
  grid <- tableNew 5 4 True
  tableSetRowSpacings grid 5
  tableSetColSpacings grid 5
  boxPackStart vbox grid PackGrow 0

  let buttons = [ ["C",  "±",  "%",  "÷"]
                , ["7",  "8",  "9",  "×"]
                , ["4",  "5",  "6",  "−"]
                , ["1",  "2",  "3",  "+"]
                , ["0",  ".",  "⌫",  "="] ]

  mapM_ (\\(r, row) ->
    mapM_ (\\(c, lbl) -> do
      btn <- buttonNewWithLabel lbl
      tableAttachDefaults grid btn c (c+1) r (r+1)
      on btn buttonActivated $ handleButton stateRef lbl >> updateDisplay
    ) (zip [0..] row)
  ) (zip [0..] buttons)

  on win deleteEvent $ liftIO mainQuit >> return False
  widgetShowAll win
  mainGUI

handleButton :: IORef CalcState -> String -> IO ()
handleButton ref key = modifyIORef ref (process key)

process :: String -> CalcState -> CalcState
process "C"  _  = initState
process "⌫" st  =
  let d  = csDisplay st
      d' = if length d <= 1 then "0" else init d
  in  st { csDisplay = d' }
process "="  st =
  case csPendingOp st of
    Nothing -> st
    Just op ->
      let b   = read (csDisplay st) :: Double
          res = applyOp op (csAccum st) b
      in  CalcState (formatNum res) res Nothing True
process "±"  st =
  let v = read (csDisplay st) :: Double
  in  st { csDisplay = formatNum (-v) }
process "%"  st =
  let v = read (csDisplay st) :: Double
  in  st { csDisplay = formatNum (v / 100) }
process sym  st
  | sym \`elem\` ["+", "−", "×", "÷"] =
      let op  = case sym of
                  "+" -> Add; "−" -> Sub; "×" -> Mul; _ -> Div
          cur = read (csDisplay st) :: Double
          acc = case csPendingOp st of
                  Nothing -> cur
                  Just op' -> applyOp op' (csAccum st) cur
      in  st { csAccum = acc, csPendingOp = Just op, csNewEntry = True
             , csDisplay = formatNum acc }
  | otherwise =
      let d' = if csNewEntry st || csDisplay st == "0"
               then sym
               else if sym == "." && '.' \`elem\` csDisplay st
                    then csDisplay st
                    else csDisplay st ++ sym
      in  st { csDisplay = d', csNewEntry = False }`
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const TABS = ["Factorial n!", "Bubble Sort", "Calculator"];
const LANGS = ["Java", "Haskell"];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={copy} style={{
        position: "absolute", top: 10, right: 10, zIndex: 10,
        background: copied ? "#4ade80" : "#334155",
        color: copied ? "#000" : "#94a3b8",
        border: "none", borderRadius: 6, padding: "4px 12px",
        fontSize: 11, cursor: "pointer", fontFamily: "monospace",
        transition: "all .2s"
      }}>{copied ? "✓ Copied" : "Copy"}</button>
      <pre style={{
        margin: 0, padding: "16px 16px 16px 16px",
        background: "#0d1117", color: "#e2e8f0",
        borderRadius: 10, fontSize: 12, lineHeight: 1.65,
        overflowX: "auto", fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        maxHeight: 420, overflowY: "auto",
        border: "1px solid #1e293b"
      }}>
        <SyntaxHighlight code={code} />
      </pre>
    </div>
  );
}

function SyntaxHighlight({ code }) {
  // Simple tokenizer for coloring
  const lines = code.split("\n");
  const javaKw = /\b(import|public|private|class|void|new|static|return|if|else|for|while|try|catch|switch|case|default|break|final|extends|implements|int|double|boolean|String|this|null|true|false|throw|throws|enum|interface)\b/g;
  const haskKw = /\b(module|where|import|data|type|newtype|let|in|case|of|if|then|else|do|return|True|False|Nothing|Just|IO|String|Int|Double|Integer|Maybe|Either|map|mapM_|show|read|otherwise|deriving)\b/g;
  const isHaskell = code.includes("module Main") || code.includes(" :: ");
  const kwRe = isHaskell ? haskKw : javaKw;

  return lines.map((line, i) => {
    const parts = [];
    let last = 0;
    const re = new RegExp(kwRe.source, "g");
    let m;
    // Detect comment
    const commentIdx = isHaskell ? line.indexOf("--") : line.indexOf("//");
    const strLine = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const comment = commentIdx >= 0 ? line.slice(commentIdx) : "";

    while ((m = re.exec(strLine)) !== null) {
      if (m.index > last) parts.push(<span key={last}>{strLine.slice(last, m.index)}</span>);
      parts.push(<span key={m.index} style={{ color: "#c792ea" }}>{m[0]}</span>);
      last = m.index + m[0].length;
    }
    if (last < strLine.length) parts.push(<span key="rest">{strLine.slice(last)}</span>);
    if (comment) parts.push(<span key="cmt" style={{ color: "#636e7b", fontStyle: "italic" }}>{comment}</span>);

    return <div key={i} style={{ minHeight: "1.65em" }}>{parts}</div>;
  });
}

// ── DEMO WIDGETS ──────────────────────────────────────────────────────────────
function FactorialDemo() {
  const [n, setN] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const calc = () => {
    const v = parseInt(n, 10);
    if (isNaN(v) || v < 0) { setErr("กรุณาใส่จำนวนเต็มที่ไม่ติดลบ"); setResult(null); return; }
    if (v > 170) { setErr("ค่ามากเกินไป (max 170)"); setResult(null); return; }
    setErr("");
    let r = BigInt(1);
    for (let i = 2n; i <= BigInt(v); i++) r *= i;
    setResult({ n: v, val: r.toString() });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
        ลองรัน Factorial จริงๆ ใน browser:
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={n} onChange={e => setN(e.target.value)}
          onKeyDown={e => e.key === "Enter" && calc()}
          placeholder="ใส่ n เช่น 12"
          style={{
            background: "#1e293b", border: "1px solid #334155", color: "white",
            padding: "8px 12px", borderRadius: 8, fontSize: 15, width: 120,
            fontFamily: "monospace", outline: "none"
          }} />
        <button onClick={calc} style={{
          background: "linear-gradient(135deg,#3b82f6,#6366f1)",
          color: "white", border: "none", padding: "8px 20px",
          borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14
        }}>คำนวณ</button>
      </div>
      {err && <div style={{ color: "#f87171", fontSize: 13 }}>{err}</div>}
      {result && (
        <div style={{
          background: "#0f172a", border: "1px solid #1e3a2f",
          borderRadius: 10, padding: "12px 16px"
        }}>
          <span style={{ color: "#64ffb4", fontFamily: "monospace", fontSize: 13, wordBreak: "break-all" }}>
            {result.n}! = {result.val}
          </span>
        </div>
      )}
    </div>
  );
}

function BubbleSortDemo() {
  const [input, setInput] = useState("64,34,25,12,22,11,90");
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const doSort = () => {
    const arr = input.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (!arr.length) return;
    const history = [arr.slice()];
    const a = arr.slice();
    for (let i = 0; i < a.length - 1; i++) {
      let sw = false;
      for (let j = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) { [a[j], a[j+1]] = [a[j+1], a[j]]; sw = true; }
      }
      history.push(a.slice());
      if (!sw) break;
    }
    setSteps(history); setCurrent(0);
    clearInterval(timerRef.current);
    let idx = 0;
    timerRef.current = setInterval(() => {
      idx++;
      if (idx >= history.length) { clearInterval(timerRef.current); return; }
      setCurrent(idx);
    }, 600);
  };

  const max = steps[current] ? Math.max(...steps[current]) : 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Animate Bubble Sort แบบ real-time:</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          style={{
            background: "#1e293b", border: "1px solid #334155", color: "white",
            padding: "8px 12px", borderRadius: 8, fontSize: 13, flex: 1,
            fontFamily: "monospace", outline: "none", minWidth: 180
          }} />
        <button onClick={doSort} style={{
          background: "linear-gradient(135deg,#f97316,#ef4444)",
          color: "white", border: "none", padding: "8px 20px",
          borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14
        }}>Sort</button>
      </div>
      {steps.length > 0 && (
        <>
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 6, height: 90,
            background: "#0f172a", borderRadius: 10, padding: "12px 16px", overflow: "hidden"
          }}>
            {steps[current].map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <span style={{ color: "#fbbf24", fontSize: 10, fontFamily: "monospace" }}>{v}</span>
                <div style={{
                  width: "100%", height: `${(v / max) * 54}px`,
                  background: current === steps.length - 1
                    ? "linear-gradient(180deg,#4ade80,#22d3ee)"
                    : "linear-gradient(180deg,#f97316,#ef4444)",
                  borderRadius: "4px 4px 0 0",
                  transition: "height .5s ease, background .3s"
                }} />
              </div>
            ))}
          </div>
          <div style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>
            Pass {current} / {steps.length - 1}  {current === steps.length - 1 ? "✓ Sorted!" : ""}
          </div>
        </>
      )}
    </div>
  );
}

function CalcDemo() {
  const [display, setDisplay] = useState("0");
  const [accum, setAccum] = useState(0);
  const [op, setOp] = useState(null);
  const [newEntry, setNewEntry] = useState(true);

  const btns = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "⌫", "="],
  ];
  const handle = (k) => {
    if (k === "C") { setDisplay("0"); setAccum(0); setOp(null); setNewEntry(true); return; }
    if (k === "⌫") { setDisplay(d => d.length <= 1 ? "0" : d.slice(0, -1)); return; }
    if (k === "=") {
      if (!op) return;
      const b = parseFloat(display);
      const res = op === "+" ? accum + b : op === "−" ? accum - b : op === "×" ? accum * b : accum / b;
      const fmt = Number.isInteger(res) ? String(res) : res.toFixed(6).replace(/\.?0+$/, "");
      setDisplay(fmt); setAccum(res); setOp(null); setNewEntry(true);
      return;
    }
    if (["÷", "×", "−", "+"].includes(k)) {
      const cur = parseFloat(display);
      const acc2 = op ? (op === "+" ? accum + cur : op === "−" ? accum - cur : op === "×" ? accum * cur : accum / cur) : cur;
      setAccum(acc2); setOp(k); setNewEntry(true);
      setDisplay(Number.isInteger(acc2) ? String(acc2) : acc2.toFixed(6).replace(/\.?0+$/, ""));
      return;
    }
    if (k === "±") { setDisplay(d => d.startsWith("-") ? d.slice(1) : "-" + d); return; }
    if (k === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
    setDisplay(d => {
      if (newEntry) { setNewEntry(false); return k === "." ? "0." : k; }
      if (k === "." && d.includes(".")) return d;
      return d === "0" ? k : d + k;
    });
  };

  const isOp = k => ["÷", "×", "−", "+", "="].includes(k);
  const isTop = k => ["C", "±", "%"].includes(k);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 260 }}>
      <div style={{
        background: "#111827", borderRadius: "12px 12px 0 0",
        padding: "16px 16px 8px", textAlign: "right",
        border: "1px solid #1f2937", borderBottom: "none"
      }}>
        <div style={{
          fontSize: Math.max(20, 36 - display.length * 1.2),
          color: "white", fontFamily: "monospace", fontWeight: 300,
          letterSpacing: -1, wordBreak: "break-all"
        }}>{display}</div>
        {op && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>op: {op}</div>}
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2,
        background: "#1f2937", padding: 2, borderRadius: "0 0 12px 12px",
        border: "1px solid #1f2937", borderTop: "none"
      }}>
        {btns.flat().map((k, i) => (
          <button key={i} onClick={() => handle(k)} style={{
            background: isOp(k) ? "#f97316" : isTop(k) ? "#374151" : "#2d3748",
            color: "white", border: "none", padding: "14px 0",
            fontSize: 17, cursor: "pointer", fontFamily: "monospace",
            borderRadius: 6, transition: "filter .1s",
            fontWeight: isOp(k) ? 700 : 400
          }}
          onMouseDown={e => e.currentTarget.style.filter = "brightness(1.3)"}
          onMouseUp={e => e.currentTarget.style.filter = ""}
          >{k}</button>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [lang, setLang] = useState(0);
  const [showDemo, setShowDemo] = useState(true);

  const codeMap = [
    [JAVA.factorial, HASKELL.factorial],
    [JAVA.bubbleSort, HASKELL.bubbleSort],
    [JAVA.calculator, HASKELL.calculator],
  ];

  const LANG_COLORS = ["#3b82f6", "#9c5fff"];
  const TAB_ICONS = ["∑", "↕", "⊞"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #0a1628 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "white", padding: "24px 16px"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 50, padding: "6px 18px", marginBottom: 14
        }}>
          <span style={{ fontSize: 11, color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>
            Java &amp; Haskell Programs
          </span>
        </div>
        <h1 style={{
          margin: 0, fontSize: "clamp(22px,4vw,36px)", fontWeight: 800,
          background: "linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          3 โปรแกรม · 2 ภาษา
        </h1>
        <p style={{ color: "#475569", fontSize: 13, margin: "6px 0 0" }}>
          Factorial · Bubble Sort · Calculator — พร้อม Swing / GTK GUI
        </p>
      </div>

      {/* Program Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            background: tab === i ? "rgba(99,102,241,.25)" : "rgba(255,255,255,.04)",
            border: `1px solid ${tab === i ? "#6366f1" : "rgba(255,255,255,.08)"}`,
            color: tab === i ? "#a5b4fc" : "#64748b",
            padding: "8px 20px", borderRadius: 10, cursor: "pointer",
            fontSize: 14, fontWeight: tab === i ? 700 : 400, transition: "all .2s",
            display: "flex", alignItems: "center", gap: 7
          }}>
            <span style={{ fontSize: 16 }}>{TAB_ICONS[i]}</span> {t}
          </button>
        ))}
      </div>

      {/* Language Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
        {LANGS.map((l, i) => (
          <button key={i} onClick={() => setLang(i)} style={{
            background: lang === i ? LANG_COLORS[i] + "33" : "rgba(255,255,255,.03)",
            border: `1px solid ${lang === i ? LANG_COLORS[i] : "rgba(255,255,255,.07)"}`,
            color: lang === i ? "white" : "#475569",
            padding: "6px 22px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600, transition: "all .2s"
          }}>
            {l === "Java" ? "☕ Java" : "λ Haskell"}
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div style={{
        maxWidth: 860, margin: "0 auto",
        display: "grid", gridTemplateColumns: showDemo ? "1fr 1fr" : "1fr",
        gap: 16, alignItems: "start"
      }}>
        {/* Code Panel */}
        <div style={{
          background: "#111827", borderRadius: 14,
          border: "1px solid #1e293b", overflow: "hidden"
        }}>
          <div style={{
            padding: "12px 16px", borderBottom: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ef4444","#f59e0b","#22c55e"].map((c,i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>
              {TABS[tab].toLowerCase().replace(" ", "_")}.{lang === 0 ? "java" : "hs"}
            </span>
            <span style={{
              fontSize: 11, color: LANG_COLORS[lang],
              background: LANG_COLORS[lang] + "20",
              padding: "2px 8px", borderRadius: 4, fontWeight: 700
            }}>
              {lang === 0 ? "Java + Swing" : "Haskell + GTK"}
            </span>
          </div>
          <CodeBlock code={codeMap[tab][lang]} />
        </div>

        {/* Demo Panel */}
        {showDemo && (
          <div style={{
            background: "#111827", borderRadius: 14,
            border: "1px solid #1e293b", overflow: "hidden"
          }}>
            <div style={{
              padding: "12px 16px", borderBottom: "1px solid #1e293b",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <span style={{ fontSize: 14, color: "#22d3ee" }}>▶</span>
              <span style={{ fontSize: 12, color: "#475569" }}>Live Demo (JavaScript)</span>
            </div>
            <div style={{ padding: 20 }}>
              {tab === 0 && <FactorialDemo />}
              {tab === 1 && <BubbleSortDemo />}
              {tab === 2 && <CalcDemo />}
            </div>
          </div>
        )}
      </div>

      {/* Info cards */}
      <div style={{
        maxWidth: 860, margin: "20px auto 0",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12
      }}>
        {[
          { icon: "☕", title: "Java + Swing", color: "#3b82f6", items: [
            "JFrame, JButton, JTextField",
            "BigInteger (factorial ขนาดใหญ่)",
            "Shunting-yard algorithm (calculator)",
            "Early-termination Bubble Sort"
          ]},
          { icon: "λ", title: "Haskell + GTK", color: "#9c5fff", items: [
            "Graphics.UI.Gtk (gtk2hs)",
            "Pattern matching + recursion",
            "Algebraic Data Types (Op, CalcState)",
            "Pure functions + IO monad"
          ]}
        ].map((c, i) => (
          <div key={i} style={{
            background: "#111827", borderRadius: 12,
            border: `1px solid ${c.color}30`, padding: 16
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <span style={{ fontWeight: 700, color: c.color, fontSize: 14 }}>{c.title}</span>
            </div>
            {c.items.map((it, j) => (
              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ color: c.color, fontSize: 10, marginTop: 4 }}>◆</span>
                <span style={{ color: "#94a3b8", fontSize: 12 }}>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Run instructions */}
      <div style={{
        maxWidth: 860, margin: "16px auto 0",
        background: "#0f172a", borderRadius: 12, border: "1px solid #1e293b",
        padding: 16
      }}>
        <div style={{ fontSize: 12, color: "#475569", marginBottom: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
          วิธี Compile &amp; Run
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ color: "#3b82f6", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>☕ Java</div>
            <pre style={{ margin: 0, color: "#94a3b8", fontSize: 11, fontFamily: "monospace", lineHeight: 1.8 }}>
{`# ต้องมี JDK 17+
javac FactorialGUI.java
java  FactorialGUI

javac BubbleSortGUI.java
java  BubbleSortGUI

javac CalculatorGUI.java
java  CalculatorGUI`}
            </pre>
          </div>
          <div>
            <div style={{ color: "#9c5fff", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>λ Haskell</div>
            <pre style={{ margin: 0, color: "#94a3b8", fontSize: 11, fontFamily: "monospace", lineHeight: 1.8 }}>
{`# ต้องมี GHC + gtk2hs
cabal install gtk

ghc -o factorial Factorial.hs \\
    $(pkg-config --libs gtk+-3.0)
./factorial`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
