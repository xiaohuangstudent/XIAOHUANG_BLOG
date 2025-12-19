import {
  l
} from "./chunk-ISB5E5C5.js";
import {
  createApp,
  h,
  nextTick,
  onMounted,
  watch
} from "./chunk-W6V53FDX.js";
import "./chunk-JVWSFFO4.js";

// node_modules/vitepress-plugin-comment-with-giscus/lib/giscus.js
var setGiscus = (props, frontmatter, defaultEnable = true) => {
  var _a;
  const defaultProps = {
    id: "comment",
    host: "https://giscus.app",
    category: "General",
    mapping: "pathname",
    term: "Welcome to giscus!",
    reactionsEnabled: "1",
    inputPosition: "top",
    lang: "zh-CN",
    loading: "lazy",
    repo: "xxx/xxx",
    repoId: "",
    homePageShowComment: false
  };
  if (props.locales) {
    const element = document.querySelector("html");
    const lang = element.getAttribute("lang");
    if (lang && props.locales[lang]) {
      props.lang = props.locales[lang];
    }
  }
  const lightTheme = props.lightTheme || "light";
  const darkTheme = props.darkTheme || "transparent_dark";
  let oldCommentContainer = document.getElementById("giscus");
  if (oldCommentContainer) {
    oldCommentContainer.parentNode.removeChild(oldCommentContainer);
  }
  if ((frontmatter == null ? void 0 : frontmatter.value.comment) !== void 0) {
    if (!Boolean(frontmatter == null ? void 0 : frontmatter.value.comment)) {
      return;
    }
  } else {
    if (!defaultEnable) {
      return;
    }
  }
  if (!props.homePageShowComment && (!location.pathname || location.pathname === "/")) {
    return;
  }
  const isDark = ((_a = document.querySelector("html")) == null ? void 0 : _a.className.indexOf("dark")) !== -1;
  const docContent = document.getElementsByClassName("content-container")[0];
  if (docContent) {
    const bindGiscus = document.createElement("div");
    bindGiscus.setAttribute("id", "giscus");
    bindGiscus.style.height = "auto";
    bindGiscus.style.marginTop = "40px";
    bindGiscus.style.borderTop = "1px solid var(--vp-c-divider)";
    bindGiscus.style.paddingTop = "20px";
    docContent.append(bindGiscus);
    createApp({
      render: () => {
        return h(l, { ...defaultProps, theme: isDark ? darkTheme : lightTheme, ...props });
      }
    }).mount("#giscus");
  }
};
var setThemeWatch = (props) => {
  const element = document.querySelector("html");
  const lightTheme = props.lightTheme || "light";
  const darkTheme = props.darkTheme || "transparent_dark";
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        let comment = document.getElementById("comment");
        comment == null ? void 0 : comment.setAttribute("theme", element.className.indexOf("dark") !== -1 ? darkTheme : lightTheme);
      }
    });
  });
  observer.observe(element, {
    attributeFilter: ["class"]
  });
};
var giscusTalk = (props, vitepressObj, defaultEnable = true) => {
  onMounted(() => {
    setGiscus(props, vitepressObj.frontmatter, defaultEnable);
    setThemeWatch(props);
  });
  watch(() => vitepressObj.route.path, () => nextTick(() => {
    setGiscus(props, vitepressObj.frontmatter, defaultEnable);
  }));
};
var giscus_default = giscusTalk;
export {
  giscus_default as default
};
//# sourceMappingURL=vitepress-plugin-comment-with-giscus.js.map
