import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Grow, Tooltip } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip as ChartTooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

import api from "../api/client";
import "./dashboard.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const WATCHLIST = [
  { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
  { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
  { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
  { name: "KPITTECH", price: 266.45, percent: "+3.54%", isDown: false },
  { name: "QUICKHEAL", price: 308.55, percent: "-0.15%", isDown: true },
  { name: "WIPRO", price: 577.75, percent: "+0.32%", isDown: false },
  { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
  { name: "RELIANCE", price: 2112.4, percent: "+1.44%", isDown: false },
  { name: "HUL", price: 512.4, percent: "+1.04%", isDown: false },
];

const DashboardActionContext = createContext({
  openOrderWindow: () => {},
  closeOrderWindow: () => {},
});

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (value) => currencyFormatter.format(Number(value || 0));
const isNegativeValue = (value) => String(value ?? "").trim().startsWith("-");

const parseStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    return null;
  }
};

const useApiData = (endpoint, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(endpoint);

        if (isMounted) {
          setData(response.data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError.response?.data?.message ||
              "Something went wrong while loading this section."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};

const DashboardPage = () => {
  const location = useLocation();
  const section = location.pathname.replace(/^\/dashboard\/?/, "").split("/")[0];

  if (section && !["orders", "holdings", "positions", "funds", "apps"].includes(section)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardActionProvider>
      <div className="dashboard-shell">
        <DashboardTopbar />

        <div className="dashboard-shell__body">
          <WatchlistPanel />

          <main className="dashboard-shell__content">
            {section === "orders" && <OrdersSection />}
            {section === "holdings" && <HoldingsSection />}
            {section === "positions" && <PositionsSection />}
            {section === "funds" && <FundsSection />}
            {section === "apps" && <AppsSection />}
            {!section && <SummarySection />}
          </main>
        </div>
      </div>
    </DashboardActionProvider>
  );
};

const DashboardTopbar = () => {
  const navigate = useNavigate();
  const user = parseStoredUser();
  const username = user?.username || "Investor";
  const avatarLabel = username.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar__indices">
        <MarketIndex label="NIFTY 50" points="24,648.45" change="+0.42%" />
        <MarketIndex label="SENSEX" points="81,245.18" change="+0.37%" />
      </div>

      <div className="dashboard-topbar__menu">
        <img
          src="/media/images/brandlogo.png"
          alt="StockSphere"
          className="dashboard-topbar__logo"
        />

        <nav className="dashboard-nav">
          <NavItem end to="/dashboard">
            Dashboard
          </NavItem>
          <NavItem to="/dashboard/orders">Orders</NavItem>
          <NavItem to="/dashboard/holdings">Holdings</NavItem>
          <NavItem to="/dashboard/positions">Positions</NavItem>
          <NavItem to="/dashboard/funds">Funds</NavItem>
          <NavItem to="/dashboard/apps">Apps</NavItem>
        </nav>

        <div className="dashboard-profile">
          <div className="dashboard-profile__avatar">{avatarLabel || "IN"}</div>
          <div className="dashboard-profile__meta">
            <span className="dashboard-profile__name">{username}</span>
            <button
              type="button"
              className="dashboard-profile__logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const MarketIndex = ({ label, points, change }) => (
  <div className="dashboard-index">
    <span className="dashboard-index__label">{label}</span>
    <span className="dashboard-index__points">{points}</span>
    <span className="dashboard-index__change">{change}</span>
  </div>
);

const NavItem = ({ children, ...props }) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      `dashboard-nav__link${isActive ? " dashboard-nav__link--active" : ""}`
    }
  >
    {children}
  </NavLink>
);

const WatchlistPanel = () => {
  const [query, setQuery] = useState("");

  const filteredWatchlist = WATCHLIST.filter((stock) =>
    stock.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const chartData = {
    labels: WATCHLIST.map((stock) => stock.name),
    datasets: [
      {
        data: WATCHLIST.map((stock) => stock.price),
        backgroundColor: [
          "#2b8a3e",
          "#4c6ef5",
          "#f08c00",
          "#e03131",
          "#12b886",
          "#7048e8",
          "#1971c2",
          "#d9480f",
          "#c2255c",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <aside className="dashboard-watchlist">
      <div className="dashboard-card dashboard-watchlist__card">
        <div className="dashboard-watchlist__header">
          <input
            className="dashboard-watchlist__search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search eg: infy, tcs, reliance"
          />
          <span className="dashboard-watchlist__count">
            {filteredWatchlist.length} / {WATCHLIST.length}
          </span>
        </div>

        <ul className="dashboard-watchlist__list">
          {filteredWatchlist.map((stock) => (
            <WatchlistItem key={stock.name} stock={stock} />
          ))}
        </ul>

        <div className="dashboard-watchlist__chart">
          <Doughnut data={chartData} />
        </div>
      </div>
    </aside>
  );
};

const WatchlistItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      className="dashboard-watchlist__item"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="dashboard-watchlist__item-main">
        <div>
          <p
            className={`dashboard-watchlist__symbol${
              stock.isDown ? " dashboard-watchlist__symbol--down" : ""
            }`}
          >
            {stock.name}
          </p>
        </div>

        <div className="dashboard-watchlist__item-meta">
          <span>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="dashboard-watchlist__icon dashboard-watchlist__icon--down" />
          ) : (
            <KeyboardArrowUp className="dashboard-watchlist__icon dashboard-watchlist__icon--up" />
          )}
          <span>{formatCurrency(stock.price)}</span>
        </div>
      </div>

      <div
        className={`dashboard-watchlist__actions${
          showActions ? " dashboard-watchlist__actions--visible" : ""
        }`}
      >
        <WatchlistActions stock={stock} />
      </div>
    </li>
  );
};

const WatchlistActions = ({ stock }) => {
  const { openOrderWindow } = useContext(DashboardActionContext);

  return (
    <div className="dashboard-watchlist__buttons">
      <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
        <button
          type="button"
          className="dashboard-watchlist__button dashboard-watchlist__button--buy"
          onClick={() => openOrderWindow(stock, "BUY")}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
        <button
          type="button"
          className="dashboard-watchlist__button dashboard-watchlist__button--sell"
          onClick={() => openOrderWindow(stock, "SELL")}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip
        title="Analytics coming soon"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button type="button" className="dashboard-watchlist__icon-button">
          <BarChartOutlined fontSize="small" />
        </button>
      </Tooltip>

      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button type="button" className="dashboard-watchlist__icon-button">
          <MoreHoriz fontSize="small" />
        </button>
      </Tooltip>
    </div>
  );
};

const DashboardActionProvider = ({ children }) => {
  const [orderWindow, setOrderWindow] = useState({
    isOpen: false,
    symbol: "",
    price: 0,
    mode: "BUY",
  });

  const openOrderWindow = (stock, mode) => {
    setOrderWindow({
      isOpen: true,
      symbol: stock.name,
      price: stock.price,
      mode,
    });
  };

  const closeOrderWindow = () => {
    setOrderWindow({
      isOpen: false,
      symbol: "",
      price: 0,
      mode: "BUY",
    });
  };

  return (
    <DashboardActionContext.Provider
      value={{ openOrderWindow, closeOrderWindow }}
    >
      {children}
      {orderWindow.isOpen && <OrderWindow {...orderWindow} />}
    </DashboardActionContext.Provider>
  );
};

const OrderWindow = ({ symbol, price, mode }) => {
  const { closeOrderWindow } = useContext(DashboardActionContext);
  const [orderMode, setOrderMode] = useState(mode);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price || 0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const estimatedMargin = Number(stockQuantity || 0) * Number(stockPrice || 0);

  const handleSubmit = async (selectedMode) => {
    try {
      setSubmitting(true);
      setError("");

      await api.post("/api/orders", {
        name: symbol,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: selectedMode,
      });

      closeOrderWindow();
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Unable to place the order right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-modal" role="dialog" aria-modal="true">
      <div
        className="dashboard-modal__backdrop"
        onClick={closeOrderWindow}
        aria-hidden="true"
      />

      <div className="dashboard-modal__card">
        <div className="dashboard-modal__header">
          <div>
            <p className="dashboard-modal__eyebrow">Order Window</p>
            <h3>{symbol}</h3>
          </div>

          <button
            type="button"
            className="dashboard-modal__close"
            onClick={closeOrderWindow}
          >
            Close
          </button>
        </div>

        <div className="dashboard-modal__mode-switch">
          <button
            type="button"
            className={`dashboard-pill${
              orderMode === "BUY" ? " dashboard-pill--active" : ""
            }`}
            onClick={() => setOrderMode("BUY")}
          >
            Buy
          </button>
          <button
            type="button"
            className={`dashboard-pill${
              orderMode === "SELL" ? " dashboard-pill--active" : ""
            }`}
            onClick={() => setOrderMode("SELL")}
          >
            Sell
          </button>
        </div>

        <div className="dashboard-modal__inputs">
          <label className="dashboard-field">
            <span>Quantity</span>
            <input
              type="number"
              min="1"
              step="1"
              value={stockQuantity}
              onChange={(event) => setStockQuantity(event.target.value)}
            />
          </label>

          <label className="dashboard-field">
            <span>Price</span>
            <input
              type="number"
              min="0.05"
              step="0.05"
              value={stockPrice}
              onChange={(event) => setStockPrice(event.target.value)}
            />
          </label>
        </div>

        <div className="dashboard-modal__footer">
          <div>
            <p className="dashboard-modal__margin-label">Estimated value</p>
            <strong>{formatCurrency(estimatedMargin)}</strong>
          </div>

          <div className="dashboard-modal__actions">
            <button
              type="button"
              className="dashboard-button dashboard-button--ghost"
              onClick={closeOrderWindow}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="dashboard-button dashboard-button--primary"
              onClick={() => handleSubmit(orderMode)}
              disabled={submitting}
            >
              {submitting ? "Placing..." : `${orderMode} Order`}
            </button>
          </div>
        </div>

        {error && <p className="dashboard-feedback dashboard-feedback--error">{error}</p>}
      </div>
    </div>
  );
};

const SummarySection = () => {
  const { data, loading, error } = useApiData("/api/summary", null);

  if (loading) {
    return <SectionMessage title="Loading dashboard..." />;
  }

  if (error) {
    return <SectionMessage title={error} tone="error" />;
  }

  return (
    <>
      <SectionHeader
        eyebrow="Overview"
        title={`Hi, ${data.userName}`}
        description="Your merged dashboard is now running inside the main frontend app."
      />

      <div className="dashboard-stat-grid">
        <StatCard
          label="Margin available"
          value={formatCurrency(data.margin)}
          helper={`Margins used ${formatCurrency(data.used)}`}
        />
        <StatCard
          label="Opening balance"
          value={formatCurrency(data.balance)}
          helper="Equity account snapshot"
        />
        <StatCard
          label="Current value"
          value={formatCurrency(data.current)}
          helper={`Investment ${formatCurrency(data.investment)}`}
        />
        <StatCard
          label="P&L"
          value={formatCurrency(data.pnl)}
          helper={data.percentage}
          tone={isNegativeValue(data.pnl) ? "negative" : "positive"}
        />
      </div>

      <div className="dashboard-summary-grid">
        <SummaryBlock
          title="Equity"
          rows={[
            ["Available margin", formatCurrency(data.margin)],
            ["Margins used", formatCurrency(data.used)],
            ["Opening balance", formatCurrency(data.balance)],
          ]}
        />
        <SummaryBlock
          title="Holdings"
          rows={[
            ["Current value", formatCurrency(data.current)],
            ["Investment", formatCurrency(data.investment)],
            ["Net P&L", `${formatCurrency(data.pnl)} (${data.percentage})`],
          ]}
        />
      </div>
    </>
  );
};

const HoldingsSection = () => {
  const { data: holdings, loading, error } = useApiData("/api/holdings", []);

  if (loading) {
    return <SectionMessage title="Loading holdings..." />;
  }

  if (error) {
    return <SectionMessage title={error} tone="error" />;
  }

  if (!holdings.length) {
    return (
      <SectionMessage
        title="No holdings available yet."
        description="Seed a few holdings in MongoDB or use your existing dataset to see this page fill up."
      />
    );
  }

  const investment = holdings.reduce(
    (total, stock) => total + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );
  const current = holdings.reduce(
    (total, stock) => total + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );
  const pnl = current - investment;
  const percentage = investment === 0 ? 0 : (pnl / investment) * 100;

  const chartData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [
      {
        label: "Last traded price",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "#387ed1",
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
      <SectionHeader
        eyebrow="Portfolio"
        title={`Holdings (${holdings.length})`}
        description="Live holdings are now fetched from the backend instead of hardcoded dashboard data."
      />

      <div className="dashboard-stat-grid">
        <StatCard label="Investment" value={formatCurrency(investment)} />
        <StatCard label="Current value" value={formatCurrency(current)} />
        <StatCard
          label="Net P&L"
          value={formatCurrency(pnl)}
          helper={`${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`}
          tone={pnl < 0 ? "negative" : "positive"}
        />
      </div>

      <DataTable
        headers={[
          "Instrument",
          "Qty.",
          "Avg. cost",
          "LTP",
          "Current value",
          "P&L",
          "Net chg.",
          "Day chg.",
        ]}
        rows={holdings.map((stock) => {
          const currentValue = Number(stock.price || 0) * Number(stock.qty || 0);
          const stockPnl =
            currentValue - Number(stock.avg || 0) * Number(stock.qty || 0);

          return [
            stock.name,
            stock.qty,
            formatCurrency(stock.avg),
            formatCurrency(stock.price),
            formatCurrency(currentValue),
            <span
              className={
                stockPnl < 0 ? "dashboard-tone--negative" : "dashboard-tone--positive"
              }
            >
              {formatCurrency(stockPnl)}
            </span>,
            <span
              className={
                isNegativeValue(stock.net)
                  ? "dashboard-tone--negative"
                  : "dashboard-tone--positive"
              }
            >
              {stock.net}
            </span>,
            <span
              className={
                isNegativeValue(stock.day)
                  ? "dashboard-tone--negative"
                  : "dashboard-tone--positive"
              }
            >
              {stock.day}
            </span>,
          ];
        })}
      />

      <div className="dashboard-card dashboard-chart-card">
        <h3 className="dashboard-card__title">Price distribution</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
          }}
        />
      </div>
    </>
  );
};

const PositionsSection = () => {
  const { data: positions, loading, error } = useApiData("/api/positions", []);

  if (loading) {
    return <SectionMessage title="Loading positions..." />;
  }

  if (error) {
    return <SectionMessage title={error} tone="error" />;
  }

  return (
    <>
      <SectionHeader
        eyebrow="Trades"
        title={`Positions (${positions.length})`}
        description="Positions now come from the backend API instead of the old static dashboard file."
      />

      <DataTable
        headers={["Product", "Instrument", "Qty.", "Avg.", "LTP", "P&L", "Chg."]}
        rows={positions.map((stock) => {
          const currentValue = Number(stock.price || 0) * Number(stock.qty || 0);
          const stockPnl =
            currentValue - Number(stock.avg || 0) * Number(stock.qty || 0);

          return [
            stock.product,
            stock.name,
            stock.qty,
            formatCurrency(stock.avg),
            formatCurrency(stock.price),
            <span
              className={
                stockPnl < 0 ? "dashboard-tone--negative" : "dashboard-tone--positive"
              }
            >
              {formatCurrency(stockPnl)}
            </span>,
            <span
              className={
                isNegativeValue(stock.day)
                  ? "dashboard-tone--negative"
                  : "dashboard-tone--positive"
              }
            >
              {stock.day}
            </span>,
          ];
        })}
      />
    </>
  );
};

const OrdersSection = () => {
  const { data: orders, loading, error } = useApiData("/api/orders", []);

  if (loading) {
    return <SectionMessage title="Loading orders..." />;
  }

  if (error) {
    return <SectionMessage title={error} tone="error" />;
  }

  if (!orders.length) {
    return (
      <SectionMessage
        title="You haven't placed any orders yet."
        description="Use the watchlist on the left to place a buy or sell order."
        action={
          <Link to="/dashboard" className="dashboard-button dashboard-button--primary">
            Open dashboard
          </Link>
        }
      />
    );
  }

  return (
    <>
      <SectionHeader
        eyebrow="Activity"
        title={`Orders (${orders.length})`}
        description="Every order placed from the watchlist is now persisted and listed here."
      />

      <DataTable
        headers={["Time", "Instrument", "Mode", "Qty.", "Price", "Value"]}
        rows={orders.map((order) => [
          order.createdAt
            ? new Date(order.createdAt).toLocaleString("en-IN")
            : "Just now",
          order.name,
          <span
            className={`dashboard-badge${
              order.mode === "SELL"
                ? " dashboard-badge--sell"
                : " dashboard-badge--buy"
            }`}
          >
            {order.mode}
          </span>,
          order.qty,
          formatCurrency(order.price),
          formatCurrency(Number(order.qty || 0) * Number(order.price || 0)),
        ])}
      />
    </>
  );
};

const FundsSection = () => {
  const { data, loading, error } = useApiData("/api/summary", null);

  if (loading) {
    return <SectionMessage title="Loading funds..." />;
  }

  if (error) {
    return <SectionMessage title={error} tone="error" />;
  }

  const funds = data.funds;

  return (
    <>
      <SectionHeader
        eyebrow="Balance"
        title="Funds"
        description="This section is wired to the same backend summary data used by the dashboard overview."
      />

      <div className="dashboard-funds-actions">
        <button type="button" className="dashboard-button dashboard-button--success">
          Add funds
        </button>
        <button type="button" className="dashboard-button dashboard-button--primary">
          Withdraw
        </button>
      </div>

      <div className="dashboard-summary-grid dashboard-summary-grid--single">
        <SummaryBlock
          title="Equity"
          rows={[
            ["Available margin", formatCurrency(funds.availableMargin)],
            ["Used margin", formatCurrency(funds.usedMargin)],
            ["Available cash", formatCurrency(funds.availableCash)],
            ["Opening balance", formatCurrency(funds.openingBalance)],
            ["Payin", formatCurrency(funds.payin)],
            ["SPAN", formatCurrency(funds.span)],
            ["Delivery margin", formatCurrency(funds.deliveryMargin)],
            ["Exposure", formatCurrency(funds.exposure)],
            ["Options premium", formatCurrency(funds.optionsPremium)],
            ["Collateral (liquid funds)", formatCurrency(funds.collateralLiquid)],
            ["Collateral (equity)", formatCurrency(funds.collateralEquity)],
            ["Total collateral", formatCurrency(funds.totalCollateral)],
          ]}
        />
      </div>
    </>
  );
};

const AppsSection = () => (
  <>
    <SectionHeader
      eyebrow="Products"
      title="Apps"
      description="The dashboard is merged, so your key product surfaces now live inside one client."
    />

    <div className="dashboard-app-grid">
      <AppCard
        title="Kite"
        description="Trading dashboard with holdings, positions, and orders wired to the backend."
      />
      <AppCard
        title="Console"
        description="Portfolio insights and account snapshots can now be extended from the shared API layer."
      />
      <AppCard
        title="Coin"
        description="This shell is ready for the next round of mutual fund and long-term investing features."
      />
    </div>
  </>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="dashboard-section-header">
    <div>
      <p className="dashboard-section-header__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="dashboard-section-header__description">{description}</p>}
    </div>
  </div>
);

const StatCard = ({ label, value, helper, tone = "default" }) => (
  <div className="dashboard-card dashboard-stat-card">
    <p className="dashboard-stat-card__label">{label}</p>
    <h3
      className={`dashboard-stat-card__value${
        tone === "positive"
          ? " dashboard-tone--positive"
          : tone === "negative"
          ? " dashboard-tone--negative"
          : ""
      }`}
    >
      {value}
    </h3>
    {helper && <p className="dashboard-stat-card__helper">{helper}</p>}
  </div>
);

const SummaryBlock = ({ title, rows }) => (
  <div className="dashboard-card dashboard-table-card">
    <h3 className="dashboard-card__title">{title}</h3>
    <div className="dashboard-summary-list">
      {rows.map(([label, value]) => (
        <div className="dashboard-summary-list__row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  </div>
);

const DataTable = ({ headers, rows }) => (
  <div className="dashboard-card dashboard-table-card">
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${index}-${headers[0]}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${index}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AppCard = ({ title, description }) => (
  <div className="dashboard-card dashboard-app-card">
    <h3 className="dashboard-card__title">{title}</h3>
    <p>{description}</p>
  </div>
);

const SectionMessage = ({ title, description, action, tone = "default" }) => (
  <div className="dashboard-card dashboard-message-card">
    <h3 className={tone === "error" ? "dashboard-tone--negative" : ""}>{title}</h3>
    {description && <p>{description}</p>}
    {action}
  </div>
);

export default DashboardPage;
