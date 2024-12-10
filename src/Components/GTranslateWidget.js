import React, { useEffect, useRef } from "react";

const GTranslateWidget = () => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapperSelector = ".gtranslate_wrapper";

        if (!window.gtranslateSettings) {
            window.gtranslateSettings = {
                default_language: "en",
                native_language_names: true,
                detect_browser_language: true,
                languages: [
                    "en", "fr", "de", "it", "es", "ar", "hi", "nl", "ja", "ru", "th",
                    "bg", "zh-TW", "ko", "id", "pt", "tr", "af", "ms"
                ],
                wrapper_selector: wrapperSelector,
                flag_size: 16,
                switcher_horizontal_position: "right",
                switcher_vertical_position: "inline",
                alt_flags: { en: "usa" },
            };

            const popupScript = document.createElement("script");
            popupScript.src = "https://cdn.gtranslate.net/widgets/latest/popup.js";
            popupScript.defer = true;

            document.body.appendChild(popupScript);
        } else {
            window.GTranslateWidget?.translate(wrapperSelector);
        }

        const style = document.createElement("style");
        style.textContent = `
            .goog-te-combo {
                width: 120px;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const widgetElement = document.querySelector(".gtranslate_widget");
            if (widgetElement) widgetElement.remove();

            const popupScript = document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/popup.js"]');
            if (popupScript) popupScript.remove();

            style.remove();
        };
    }, []);

    return <div ref={wrapperRef} className="gtranslate_wrapper"></div>;
};

export default GTranslateWidget;
