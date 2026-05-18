import { useEffect, useRef } from "react";

// ── 案Fカラー定数 ──────────────────────────────────────
const C = {
  bg:        "#faf9ff",
  card:      "#ffffff",
  border:    "#ede9fe",
  borderMid: "#c4b5fd",
  text:      "#1e293b",
  textSub:   "#64748b",
  textMuted: "#a78bfa",
  accent:    "#4c1d95",
  accentSub: "#7c3aed",
  btn:       "#6d28d9",
  plus:      "#10b981",
  minus:     "#ef4444",
  navBg:     "#ffffff",
};

// ── Candlestick Hero（ダーク維持） ──────────────────────
function ChartHero() {
  const candles = [
    ["310","370","384","374","10","#34d399","0.08"],
    ["326","345","368","356","8","#34d399","0.14"],
    ["342","348","362","350","9","#f87171","0.20"],
    ["358","332","356","342","2","#c8c8e0","0.26"],
    ["374","324","345","327","14","#34d399","0.32"],
    ["390","318","352","338","11","#f87171","0.38"],
    ["406","305","332","308","22","#34d399","0.44"],
    ["422","288","318","296","8","#f87171","0.50"],
    ["438","278","302","281","16","#34d399","0.56"],
    ["454","270","298","282","2","#c8c8e0","0.62"],
    ["470","252","285","255","25","#34d399","0.68"],
    ["486","238","265","241","18","#34d399","0.74"],
    ["502","160","248","165","72","#34d399","0.80"],
    ["520","118","182","122","48","#34d399","0.88"],
    ["538","88","182","158","18","#f87171","0.96"],
    ["556","140","240","145","80","#f87171","1.04"],
    ["574","198","295","202","48","#f87171","1.12"],
    ["592","190","275","196","12","#34d399","1.20"],
    ["610","208","310","214","72","#f87171","1.28"],
    ["628","245","320","250","48","#34d399","1.36"],
    ["646","230","302","264","28","#f87171","1.42"],
    ["664","248","295","269","2","#c8c8e0","1.48"],
    ["682","242","320","248","52","#f87171","1.54"],
    ["700","250","335","255","10","#34d399","1.60"],
    ["718","248","288","252","22","#f87171","1.66"],
    ["736","244","285","262","2","#c8c8e0","1.72"],
    ["754","238","278","242","26","#34d399","1.78"],
    ["772","222","282","258","18","#f87171","1.84"],
    ["790","238","272","242","20","#34d399","1.90"],
    ["808","228","278","248","22","#f87171","1.96"],
  ];
  const volBars = [
    ["304","455","18","#b8860b","0.6","0.08"],["320","448","25","#b8860b","0.6","0.14"],
    ["336","452","21","#b8860b","0.6","0.20"],["352","455","18","#b8860b","0.5","0.26"],
    ["368","450","23","#b8860b","0.6","0.32"],["384","446","27","#b8860b","0.65","0.38"],
    ["400","444","29","#b8860b","0.65","0.44"],["416","450","23","#b8860b","0.55","0.50"],
    ["432","448","25","#b8860b","0.6","0.56"],["448","453","20","#b8860b","0.5","0.62"],
    ["464","443","30","#b8860b","0.65","0.68"],["480","442","31","#b8860b","0.65","0.74"],
    ["494","413","60","#d4a017","0.85","0.80"],["512","405","68","#d4a017","0.85","0.88"],
    ["530","408","65","#d4a017","0.8","0.96"],["548","395","78","#e8b820","0.9","1.04"],
    ["567","400","73","#e8b820","0.85","1.12"],["585","418","55","#d4a017","0.75","1.20"],
    ["602","410","63","#e8b820","0.85","1.28"],["621","428","45","#b8860b","0.7","1.36"],
    ["639","432","41","#b8860b","0.65","1.42"],["657","440","33","#b8860b","0.55","1.48"],
    ["675","430","43","#b8860b","0.68","1.54"],["693","438","35","#b8860b","0.58","1.60"],
    ["711","442","31","#b8860b","0.55","1.66"],["729","445","28","#b8860b","0.52","1.72"],
    ["747","440","33","#b8860b","0.58","1.78"],["765","436","37","#b8860b","0.62","1.84"],
    ["783","443","30","#b8860b","0.55","1.90"],["801","439","34","#b8860b","0.6","1.96"],
    ["818","434","39","#d4a017","0.7","2.02"],
  ];

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 480, overflow: "hidden", background: "#150e2a", display: "flex", alignItems: "center" }}>
      <style>{`
        @keyframes ci{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fy{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes sc{0%{transform:translateX(-4px)}100%{transform:translateX(910px)}}
        @keyframes ml{from{stroke-dashoffset:1600}to{stroke-dashoffset:0}}
        @keyframes vg{from{transform:scaleY(0);opacity:0}to{transform:scaleY(1);opacity:1}}
        @keyframes dp{0%,100%{opacity:1}50%{opacity:0.25}}
      `}</style>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.4"/>
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="gl2"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g opacity="0.1">
          {[75,155,235,315,395].map(y => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="#a78bfa" strokeWidth="0.5"/>)}
          {[200,380,560,740].map(x => <line key={x} x1={x} y1="50" x2={x} y2="420" stroke="#a78bfa" strokeWidth="0.5"/>)}
        </g>
        {[["5000","79"],["3800","159"],["2600","239"],["1400","319"]].map(([v,y]) => (
          <text key={v} x="856" y={y} fill="#6d28d9" fontSize="10" fontFamily="monospace">{v}</text>
        ))}
        <polyline fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" opacity="0.85"
          strokeDasharray="1600" strokeDashoffset="1600"
          style={{ animation: "ml 2.5s 0.2s ease-out forwards" }}
          points="310,365 326,358 342,352 358,340 374,330 390,344 406,320 422,308 438,295 454,318 470,285 486,260 502,220 520,168 538,130 556,175 574,225 592,205 610,240 628,270 646,248 664,280 682,258 700,285 718,262 736,278 754,255 772,268 790,252 808,265 826,248"/>
        <polyline fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"
          strokeDasharray="1600" strokeDashoffset="1600"
          style={{ animation: "ml 2.5s 0.5s ease-out forwards" }}
          points="310,385 340,375 370,362 400,348 430,330 460,310 490,285 520,262 550,245 580,238 610,245 640,258 670,270 700,282 730,292 760,298 790,302 820,304 850,306"/>
        {candles.map(([cx, wt, wb, bt, bh, color, delay], i) => (
          <g key={i} style={{ animation: `fu 0.2s ${delay}s both` }} filter={i===12||i===13?"url(#gl2)":undefined}>
            <line x1={cx} y1={wt} x2={cx} y2={wb} stroke={color} strokeWidth={i>=12&&i<=14?"1.5":"1.2"}/>
            <rect x={Number(cx)-6} y={bt} width={i>=12&&i<=14?16:12} height={bh} fill={color} rx="0.5" opacity="0.9"/>
          </g>
        ))}
        <g style={{ animation: "fu 0.3s 2.02s both" }} filter="url(#gl)">
          <line x1="826" y1="232" x2="826" y2="278" stroke="#34d399" strokeWidth="1.5"/>
          <rect x="818" y="236" width="16" height="28" fill="#34d399" rx="1" opacity="0.95"/>
          <line x1="826" y1="226" x2="826" y2="232" stroke="#34d399" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite"/>
          </line>
        </g>
        <circle cx="826" cy="232" r="4" fill="#34d399" filter="url(#gl)">
          <animate attributeName="r" values="4;15;4" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        {volBars.map(([x, y, h, color, opacity, delay], i) => (
          <rect key={i} x={x} y={y} width={i>=28?"16":"12"} height={h} fill={color} opacity={opacity} rx="0.5"
            style={{ transformOrigin: `${Number(x)+6}px 473px`, animation: `vg 0.15s ${delay}s both` }}/>
        ))}
        <g style={{ animation: "fu 0.4s 2.2s both" }}>
          <g style={{ animation: "fy 3s ease-in-out infinite" }}>
            <rect x="675" y="56" width="92" height="28" rx="5" fill="#4c1d95" opacity="0.95" filter="url(#gl2)"/>
            <rect x="675" y="56" width="92" height="28" rx="5" fill="none" stroke="#c4b5fd" strokeWidth="0.5" opacity="0.5"/>
            <text x="721" y="75" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace" fontWeight="bold">¥1,928</text>
          </g>
        </g>
        <g style={{ animation: "fu 0.4s 2.4s both" }}>
          <g style={{ animation: "fy 3.5s 0.5s ease-in-out infinite" }}>
            <rect x="712" y="90" width="66" height="20" rx="4" fill="#34d399" opacity="0.92" filter="url(#gl2)"/>
            <text x="745" y="104" textAnchor="middle" fill="#064e3b" fontSize="11" fontFamily="monospace" fontWeight="bold">+3.74%</text>
          </g>
        </g>
        <g style={{ animation: "fu 0.3s 2.6s both" }}>
          <rect x="495" y="145" width="54" height="16" rx="3" fill="#150e2a" stroke="#fbbf24" strokeWidth="0.5" opacity="0.9"/>
          <text x="522" y="157" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">5日線</text>
        </g>
        <g style={{ animation: "fu 0.3s 2.8s both" }}>
          <rect x="495" y="165" width="54" height="16" rx="3" fill="#150e2a" stroke="#c4b5fd" strokeWidth="0.5" opacity="0.9"/>
          <text x="522" y="177" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">25日線</text>
        </g>
        <rect x="-4" y="50" width="2" height="370" fill="url(#sg)" style={{ animation: "sc 6s 1s linear infinite" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#150e2a 26%,rgba(21,14,42,0.4) 52%,#150e2a 100%)", pointerEvents: "none", zIndex: 2 }}/>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,#150e2a 0%,transparent 10%,transparent 88%,#150e2a 100%)", pointerEvents: "none", zIndex: 2 }}/>
      <div style={{ position: "relative", zIndex: 3, padding: "clamp(40px,8vw,72px) clamp(10px,4vw,44px)", maxWidth: 620 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(76,29,149,0.85)", border: "1px solid #7c3aed", borderRadius: 20, padding: "5px 14px", marginBottom: 20, opacity: 0, animation: "ci 0.5s 0.3s ease-out forwards" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#c4b5fd", animation: "dp 1.8s infinite" }}/>
          <span style={{ fontSize: 10, color: "#e9d5ff", letterSpacing: "0.15em" }}>INDEPENDENT RESEARCH — 2026</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px,6vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16, color: "#f5f3ff", fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif", opacity: 0, animation: "ci 0.6s 0.7s ease-out forwards" }}>
          ミル。シル。<br/>
          <span style={{ background: "linear-gradient(90deg,#e9d5ff,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            データで見える、<br/>値段の裏側。
          </span>
        </h1>
        <p style={{ fontSize: "clamp(13px,2vw,15px)", color: "#c4b5fd", lineHeight: 1.8, marginBottom: 28, fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif", opacity: 0, animation: "ci 0.5s 1.2s ease-out forwards" }}>
          只今制作中<br/>今しばらくお待ちください
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: 0, animation: "ci 0.5s 1.6s ease-out forwards" }}>
          <a href="https://tradercat.site/report/show_market_list.php" style={{textDecoration:'none'}}>
            <button style={{ background: "#6d28d9", color: "#fff", border: "none", padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>マーケットデータを見る</button>
          </a>
          <a href="https://tradercat.site/report/show_company_list.php" style={{textDecoration:'none'}}>
            <button style={{ background: "transparent", color: "#e9d5ff", border: "1px solid #7c3aed", padding: "13px 26px", borderRadius: 7, fontSize: 14, cursor: "pointer", fontFamily: "'Hiragino Sans',sans-serif" }}>企業分析を見る</button>
          </a>
        </div>
      </div>
    </div>
  );
}

const features = [
  { color: "#4c1d95", bg: "#ede9fe", title: "日本の半導体バリューチェーン", body: "ファブレスからファウンドリ、装置・素材まで、バリューチェーン構造を視覚的に俯瞰。日本の半導体産業まとめ 企業名をタップで詳細展開", tag: "Japan · 17社", url: "https://japansemicondu.netlify.app/" },
  { color: "#7c3aed", bg: "#f5f3ff", title: "世界の半導体バリューチェーン", body: "ファブレスからファウンドリ、装置・素材まで、バリューチェーン構造を視覚的に俯瞰。世界の半導体産業まとめ　企業名をタップで詳細展開", tag: "Global · 150社", url: "https://teal-melomakarona-306990.netlify.app/" },
  { color: "#10b981", bg: "#ecfdf5", title: "日本株 設立・上場年一覧", body: "東証上場3,900社以上の設立年・上場年を一覧で確認。業種・周年フィルター付き。", tag: "Japan · 3,900社", url: "https://tradercat.site/report/show_japanmarket.php" },
];

export default function App() {
  return (
    <div style={{ fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif", background: C.bg, color: C.text, minHeight: "100vh", margin: 0, padding: 0 }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0 !important; padding: 0 !important; background: ${C.bg}; }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .feature-grid { grid-template-columns: 1fr !important; }
          .nav-pad { padding: 14px 10px !important; }
          .section-pad { padding: 24px 10px 40px !important; }
          .btn-full { width: 300px !important; }
        }
      `}</style>

      {/* Nav */}
      <div className="nav-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: C.navBg, boxShadow: "0 1px 3px rgba(124,58,237,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="6" fill="#4c1d95"/>
            <rect x="5" y="13" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.6"/>
            <rect x="13" y="5" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.6"/>
            <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#e9d5ff"/>
            <rect x="21" y="13" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.6"/>
            <rect x="13" y="21" width="4" height="4" rx="0.5" fill="#7c3aed" opacity="0.6"/>
            <line x1="9" y1="15" x2="13" y2="15" stroke="#3b0764" strokeWidth="1"/>
            <line x1="17" y1="15" x2="21" y2="15" stroke="#3b0764" strokeWidth="1"/>
            <line x1="15" y1="9" x2="15" y2="13" stroke="#3b0764" strokeWidth="1"/>
            <line x1="15" y1="17" x2="15" y2="21" stroke="#3b0764" strokeWidth="1"/>
          </svg>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", color: C.accent }}>TraderCat</div>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase" }}>Market Intelligence</div>
          </div>
        </div>
        <a href="https://tradercat.site/report/show_market_list.php" style={{textDecoration:'none'}}>
          <button style={{ fontSize: 12, border: `1px solid ${C.border}`, background: "transparent", color: C.accent, padding: "7px 16px", borderRadius: 5, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "inherit", fontWeight: 600 }}>
            レポートを見る
          </button>
        </a>
      </div>

      <ChartHero />

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.card }}>
        {[
          { num: "約3,900社", label: "日本の上場会社数", sub: "JAPAN LISTED" },
          { num: "約5,500社", label: "米国の上場会社数", sub: "US LISTED" },
          { num: "約663兆円", label: "日本のGDP（名目）", sub: "JAPAN GDP 2025" },
          { num: "約30.6兆ドル", label: "米国のGDP（名目）", sub: "US GDP 2025" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "22px 0", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontSize: "clamp(18px,3.5vw,26px)", fontWeight: 800, color: i % 2 === 0 ? C.accent : C.accentSub, letterSpacing: "-0.02em" }}>{s.num}</div>
            <div style={{ fontSize: "clamp(9px,1.8vw,12px)", color: C.text, marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: "clamp(7px,1.2vw,9px)", color: C.textMuted, letterSpacing: "0.08em", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* How to use */}
      <div className="section-pad" style={{ padding: "48px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: C.textMuted, textTransform: "uppercase", marginBottom: 10 }}>How to use</div>
        <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          {/* ▼ ここに画像を入れる場合は下のコメントを外して画像URLを入れてください
          <img src="画像のURL" style={{width:"100%", maxWidth:340, borderRadius:12, display:"block"}} alt="TraderCatの使い方"/>
          */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              トレーダーキャットの<span style={{ color: C.accentSub }}>使い方</span>
            </div>
        <p style={{ fontSize: 13, color: C.textSub, lineHeight: 2, marginBottom: 0 }}>
  相場、物価、企業、消費。<br/>
  世の中の変化は、すべてどこかで繋がっています。<br/><br/>

  TraderCatは、価格データや統計情報、企業情報を横断して、
  比較・分析できる独立系データサイトです。<br/><br/>

  「数字を眺める」だけではなく、
  <span style={{ color: C.accentSub, fontWeight: 700 }}>変化の流れを読み解くための情報基盤</span>
  を目指しています。
</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="section-pad" style={{ padding: "40px 40px 56px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: C.textMuted, textTransform: "uppercase", marginBottom: 10 }}>What we cover</div>
        <div style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 700, color: C.text, marginBottom: 28, letterSpacing: "-0.02em" }}>
          トレーダー視点で設計した<span style={{ color: C.accentSub }}>経済データの可視化ツール</span>
        </div>
        <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {features.map(f => (
            <a key={f.title} href={f.url} target="_blank" style={{textDecoration:'none',color:'inherit'}}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px", position: "relative", overflow: "hidden", boxShadow: "0 1px 4px rgba(124,58,237,0.06)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: f.color }}/>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: f.bg, marginBottom: 12, border: `1px solid ${f.color}30` }}/>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 11, color: C.textSub, lineHeight: 1.7, marginBottom: 10 }}>{f.body}</div>
                <span style={{ fontSize: 10, color: f.color, background: f.color + "15", border: `1px solid ${f.color}30`, borderRadius: 4, padding: "2px 8px" }}>{f.tag}</span>
              </div>
            </a>
          ))}
        </div>

        {/* ボタン */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
          <a href="https://tradercat.site/report/show_market_list.php" style={{textDecoration:'none'}}>
            <button className="btn-full" style={{ background: C.btn, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 7, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>マーケットデータを見る</button>
          </a>
          <a href="https://tradercat.site/report/show_company_list.php" style={{textDecoration:'none'}}>
            <button className="btn-full" style={{ background: "transparent", color: C.accentSub, border: `1px solid ${C.accentSub}`, padding: "13px 28px", borderRadius: 7, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>企業分析を見る</button>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="section-pad" style={{ padding: "64px 40px", textAlign: "center", borderTop: `1px solid ${C.border}`, background: "#f5f3ff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>For serious investors</div>
          <div style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, color: C.accent, marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.2 }}>データを見れば<br/>世界がわかる</div>
          <p style={{ fontSize: 14, color: C.textSub, marginBottom: 0 }}>日々の暮らしから見える経済</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 40px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, background: C.card }}>
        <span style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.05em" }}>© 2026 TraderCat — Independent Market Intelligence</span>
        <span style={{ fontSize: 11, color: C.textMuted }}>tradercat.site</span>
      </div>
    </div>
  );
}
