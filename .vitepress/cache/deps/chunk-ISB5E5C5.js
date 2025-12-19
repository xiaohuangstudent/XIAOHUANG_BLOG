import {
  createCommentVNode,
  createElementBlock,
  defineComponent,
  onMounted,
  openBlock,
  ref
} from "./chunk-W6V53FDX.js";

// node_modules/@giscus/vue/dist/index.mjs
var d = ["id", "host", "repo", "repoid", "category", "categoryid", "mapping", "term", "strict", "reactionsenabled", "emitmetadata", "inputposition", "theme", "lang", "loading"];
var l = defineComponent({
  __name: "Giscus",
  props: {
    id: {},
    host: {},
    repo: {},
    repoId: {},
    category: {},
    categoryId: {},
    mapping: {},
    term: {},
    theme: {},
    strict: {},
    reactionsEnabled: {},
    emitMetadata: {},
    inputPosition: {},
    lang: {},
    loading: {}
  },
  setup(s) {
    const t = ref(false);
    return onMounted(() => {
      t.value = true, import("./giscus-aTimukGI-L5CJQOZ5.js");
    }), (e, m) => t.value ? (openBlock(), createElementBlock("giscus-widget", {
      key: 0,
      id: e.id,
      host: e.host,
      repo: e.repo,
      repoid: e.repoId,
      category: e.category,
      categoryid: e.categoryId,
      mapping: e.mapping,
      term: e.term,
      strict: e.strict,
      reactionsenabled: e.reactionsEnabled,
      emitmetadata: e.emitMetadata,
      inputposition: e.inputPosition,
      theme: e.theme,
      lang: e.lang,
      loading: e.loading
    }, null, 8, d)) : createCommentVNode("", true);
  }
});

export {
  l
};
//# sourceMappingURL=chunk-ISB5E5C5.js.map
