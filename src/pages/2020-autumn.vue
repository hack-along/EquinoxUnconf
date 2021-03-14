<template>
  <LayoutCurtains>
    <template slot="hero">
      <hero-curtains :bg="heroBG"></hero-curtains>
    </template>

    <!-- agenda -->
    <div
      id="learn"
      class="flex flex-wrap my-40"
    >
      <!-- the events are dynamically added from the /content/events files -->
      <event-container
        :title="'Equinox 22/09/2020'"
        :subtitle="'explore what was teached and learned'"
      />
    </div>

  </LayoutCurtains>
</template>

<static-query>
query Blocks {
  data: allBlocks {
    edges {
      node {
          title
          subtitle
          img
          content
          link
          emoji
          extraClass
          tags
          extraClassImg
          extraClassHeader
          fileName
      }
    }
  },
    metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>


<script>
export default {
  metaInfo() {
    return {
      meta: [
        // twitter-card: https://cards-dev.twitter.com/validator
        { name: "twitter:title", content: this.$static.metadata.siteName },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:description",
          content: this.$static.metadata.siteDescription,
        },
        { name: "twitter:image", content: this.getCoverImage },
        { property: "og:title", content: this.$static.metadata.siteName },
        { property: "og:url", content: this.getUrl },
        { property: "og:image", content: this.getCoverImage },
        {
          property: "og:description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
  data() {
    return {
      heroBG: "bg.png",
    };
  },
  methods: {
    splitString(string, node) {
      let name = string.split("_");
      let resultString = {};
      let count = name.length;
      if (count > 1) {
        resultString = {};
        for (var i = 1; i < count; i++) {
          resultString[name[i]] = node;
        }
      } else {
        resultString = node;
      }
      return [name[0], resultString];
    },
  },
  computed: {
    getCoverImage() {
      // @TODO: ADD A CARD FALLBACK IMG
      return this.$static.metadata.siteUrl + "card2021.jpg";
    },
    getUrl() {
      return this.$static.metadata.siteUrl;
    },
    page() {
      let cleanData = {};
      this.$static.data.edges.map((elem) => {
        let prop = elem.node.fileName;
        let object = this.splitString(prop, elem.node);
        if (cleanData.hasOwnProperty(object[0])) {
          Object.assign(cleanData[object[0]], object[1]);
        } else {
          cleanData[object[0]] = object[1];
        }
      });
      return cleanData;
    },
  },
};
</script>