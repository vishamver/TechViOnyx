(() => {
    const BASE_CURRENCY = "INR";
    const STORAGE_KEY = "techvionyx_currency";

    const CURRENCY_RATES = {
        INR: 1,
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.0095,
        AED: 0.044,
        AUD: 0.018,
        CAD: 0.016,
        SGD: 0.016
    };

    const CURRENCY_LABELS = [
        { code: "INR", label: "\uD83C\uDDEE\uD83C\uDDF3 INR \u20B9" },
        { code: "USD", label: "\uD83C\uDDFA\uD83C\uDDF8 USD $" },
        { code: "EUR", label: "\uD83C\uDDEA\uD83C\uDDFA EUR \u20AC" },
        { code: "GBP", label: "\uD83C\uDDEC\uD83C\uDDE7 GBP \u00A3" },
        { code: "AED", label: "\uD83C\uDDE6\uD83C\uDDEA AED \u062F.\u0625" },
        { code: "AUD", label: "\uD83C\uDDE6\uD83C\uDDFA AUD $" },
        { code: "CAD", label: "\uD83C\uDDE8\uD83C\uDDE6 CAD $" },
        { code: "SGD", label: "\uD83C\uDDF8\uD83C\uDDEC SGD $" }
    ];

    const REGION_TO_CURRENCY = {
        IN: "INR",
        US: "USD",
        GB: "GBP",
        AE: "AED",
        AU: "AUD",
        CA: "CAD",
        SG: "SGD",
        IE: "EUR",
        DE: "EUR",
        FR: "EUR",
        ES: "EUR",
        IT: "EUR",
        NL: "EUR",
        PT: "EUR",
        BE: "EUR",
        AT: "EUR",
        FI: "EUR",
        GR: "EUR"
    };

    const CURRENCY_LOCALE = {
        INR: "en-IN",
        USD: "en-US",
        EUR: "en-IE",
        GBP: "en-GB",
        AED: "en-AE",
        AUD: "en-AU",
        CAD: "en-CA",
        SGD: "en-SG"
    };

    const PRICE_SELECTOR = ".plan-price, .trial-price";

    const getRegionFromLocale = (locale) => {
        if (!locale) return null;
        try {
            return new Intl.Locale(locale).region || null;
        } catch (error) {
            const parts = locale.split("-");
            return parts.length > 1 ? parts[1].toUpperCase() : null;
        }
    };

    const detectDefaultCurrency = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && CURRENCY_RATES[stored]) {
            return stored;
        }

        const locale = navigator.language || "en-IN";
        const region = getRegionFromLocale(locale);
        const regionCurrency = region ? REGION_TO_CURRENCY[region] : null;
        return regionCurrency && CURRENCY_RATES[regionCurrency] ? regionCurrency : BASE_CURRENCY;
    };

    const parseAmount = (rawText) => {
        if (!rawText) return null;
        const hasPlus = rawText.includes("+");
        const numeric = rawText.replace(/[^0-9.,]/g, "").replace(/,/g, "");
        const amount = Number.parseFloat(numeric);
        if (!Number.isFinite(amount)) return null;
        return { amount, hasPlus };
    };

    const formatCurrency = (amount, currency) => {
        const locale = CURRENCY_LOCALE[currency] || "en-US";
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const applyCurrency = (currency) => {
        const targetCurrency = CURRENCY_RATES[currency] ? currency : BASE_CURRENCY;
        const rate = CURRENCY_RATES[targetCurrency] || 1;
        const priceElements = document.querySelectorAll(PRICE_SELECTOR);

        priceElements.forEach((element) => {
            if (!element.dataset.baseAmount) {
                const parsed = parseAmount(element.textContent);
                if (!parsed) return;
                element.dataset.baseAmount = parsed.amount.toString();
                element.dataset.hasPlus = parsed.hasPlus ? "true" : "false";
            }

            const baseAmount = Number.parseFloat(element.dataset.baseAmount);
            if (!Number.isFinite(baseAmount)) return;

            const converted = baseAmount * rate;
            const formatted = formatCurrency(Math.round(converted), targetCurrency);
            const suffix = element.dataset.hasPlus === "true" ? "+" : "";
            element.textContent = `${formatted}${suffix}`;
        });

        localStorage.setItem(STORAGE_KEY, targetCurrency);
    };

    const ensureStyles = () => {
        if (document.getElementById("price-currency-style")) return;
        const style = document.createElement("style");
        style.id = "price-currency-style";
        style.textContent = `
            body.currency-switcher-enabled .plan-price::before,
            body.currency-switcher-enabled .trial-price::before {
                content: "" !important;
                margin-right: 0 !important;
            }

            .currency-switcher {
                margin-top: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 0.95rem;
                font-weight: 600;
                color: #fff;
                position: relative;
                z-index: 1;
                font-family: "Segoe UI", "Noto Sans", sans-serif;
            }

            .currency-switcher .currency-button {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.35);
                background: rgba(255, 255, 255, 0.16);
                color: #fff;
                font-weight: 600;
                outline: none;
                cursor: pointer;
            }

            .currency-switcher .currency-menu {
                position: absolute;
                top: calc(100% + 8px);
                left: 50%;
                transform: translateX(-50%);
                background: #ffffff;
                color: #111;
                border-radius: 10px;
                box-shadow: 0 16px 40px rgba(0,0,0,0.2);
                border: 1px solid rgba(0,0,0,0.1);
                min-width: 200px;
                padding: 6px;
                display: none;
                max-height: 260px;
                overflow-y: auto;
                z-index: 9999;
            }

            .currency-switcher.open .currency-menu {
                display: block;
            }

            .currency-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 10px;
                border-radius: 8px;
                cursor: pointer;
                border: 0;
                width: 100%;
                background: transparent;
                font: inherit;
                text-align: left;
            }

            .currency-option:hover,
            .currency-option[aria-selected="true"] {
                background: #f1f5f9;
            }

            .currency-flag {
                width: 18px;
                height: 12px;
                border-radius: 2px;
                box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
                flex: 0 0 auto;
            }

            .container header {
                overflow: visible;
            }
        `;
        document.head.appendChild(style);
    };

    const FLAG_SVGS = {
        INR: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='4' y='0' fill='%23FF9933'/><rect width='18' height='4' y='4' fill='%23FFFFFF'/><rect width='18' height='4' y='8' fill='%23138745'/><circle cx='9' cy='6' r='1.6' fill='%23000080'/></svg>",
        USD: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%23B22234'/><g fill='%23FFFFFF'><rect y='1' width='18' height='1'/><rect y='3' width='18' height='1'/><rect y='5' width='18' height='1'/><rect y='7' width='18' height='1'/><rect y='9' width='18' height='1'/><rect y='11' width='18' height='1'/></g><rect width='7.5' height='5.5' fill='%233C3B6E'/></svg>",
        EUR: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%230039A6'/><circle cx='9' cy='6' r='3.5' fill='%23FFCC00'/></svg>",
        GBP: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%23002147'/><path d='M0 0 L18 12 M18 0 L0 12' stroke='%23FFFFFF' stroke-width='2.2'/><path d='M0 0 L18 12 M18 0 L0 12' stroke='%23CF142B' stroke-width='1.2'/><rect x='7' width='4' height='12' fill='%23FFFFFF'/><rect y='4' width='18' height='4' fill='%23FFFFFF'/><rect x='7.7' width='2.6' height='12' fill='%23CF142B'/><rect y='4.7' width='18' height='2.6' fill='%23CF142B'/></svg>",
        AED: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%23008000'/><rect width='18' height='4' y='4' fill='%23FFFFFF'/><rect width='18' height='4' y='8' fill='%23000000'/><rect width='4' height='12' fill='%23FF0000'/></svg>",
        AUD: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%23001B70'/><circle cx='12.8' cy='6.5' r='1.3' fill='%23FFFFFF'/><circle cx='15.2' cy='3.2' r='1' fill='%23FFFFFF'/></svg>",
        CAD: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='12' fill='%23FFFFFF'/><rect width='4' height='12' x='0' fill='%23D52B1E'/><rect width='4' height='12' x='14' fill='%23D52B1E'/><polygon points='9,3 10,6 12,6 10,7 11,9 9,8 7,9 8,7 6,6 8,6' fill='%23D52B1E'/></svg>",
        SGD: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='12' viewBox='0 0 18 12'><rect width='18' height='6' y='0' fill='%23EF3340'/><rect width='18' height='6' y='6' fill='%23FFFFFF'/><circle cx='4.5' cy='3' r='2' fill='%23FFFFFF'/><circle cx='5.2' cy='3' r='1.6' fill='%23EF3340'/></svg>"
    };

    const buildButtonLabel = (currencyCode) => {
        const label = CURRENCY_LABELS.find(c => c.code === currencyCode)?.label || currencyCode;
        return label;
    };

    const renderSwitcher = (selectedCurrency) => {
        const header = document.querySelector(".container header");
        const target = header || document.querySelector("#main-content");
        if (!target || document.querySelector(".currency-switcher")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "currency-switcher";
        wrapper.innerHTML = `
            <span>Currency:</span>
            <button type="button" class="currency-button" aria-haspopup="listbox" aria-expanded="false"></button>
            <div class="currency-menu" role="listbox"></div>
        `;

        const button = wrapper.querySelector(".currency-button");
        const menu = wrapper.querySelector(".currency-menu");

        button.textContent = buildButtonLabel(selectedCurrency);
        CURRENCY_LABELS.forEach((currency) => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "currency-option";
            option.setAttribute("role", "option");
            option.setAttribute("data-currency", currency.code);
            option.setAttribute("aria-selected", currency.code === selectedCurrency ? "true" : "false");

            const flag = document.createElement("span");
            flag.className = "currency-flag";
            flag.style.backgroundImage = `url("${FLAG_SVGS[currency.code]}")`;
            flag.style.backgroundSize = "cover";

            const label = document.createElement("span");
            label.textContent = currency.label;

            option.appendChild(flag);
            option.appendChild(label);
            menu.appendChild(option);
        });

        menu.addEventListener("click", (event) => {
            const option = event.target.closest(".currency-option");
            if (!option) return;
            const currency = option.getAttribute("data-currency");
            if (!currency) return;
            applyCurrency(currency);
            button.textContent = buildButtonLabel(currency);
            menu.querySelectorAll(".currency-option").forEach((opt) => {
                opt.setAttribute("aria-selected", opt === option ? "true" : "false");
            });
            wrapper.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        });

        button.addEventListener("click", () => {
            const isOpen = wrapper.classList.toggle("open");
            button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", (event) => {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
            }
        });

        if (header) {
            header.appendChild(wrapper);
        } else {
            target.prepend(wrapper);
        }
    };

    const init = () => {
        document.body.classList.add("currency-switcher-enabled");
        ensureStyles();
        const currency = detectDefaultCurrency();
        const existing = document.querySelector(".currency-switcher");
        if (existing) {
            existing.remove();
        }
        renderSwitcher(currency);
        applyCurrency(currency);
    };

    window.TvxInitCurrencySwitcher = init;
    document.addEventListener("tvx:page:load", init);
    if (document.readyState !== "loading") {
        init();
    }
})();

