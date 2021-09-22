<template>
  <div>
    <div class="mb-0">
      <h2>{{ title }}</h2>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
    <h3>Programme</h3>
    <span>During Equinox you can add your topic and time live by typing "!schedule [time] [topic]" in a participating discord server (eg: "!schedule 10:00 Yoga"). </span>
    <span>If you made a mistake, you can always use "!cancel" to remove your entry!</span>
    <br />
    <br />
    <ul class="pl-1">
      <li
        class="programme"
        v-for="(item,index) in programme"
        :key="index"
      >
        <span>{{addZero(new Date(item.time).getHours()) + ':' + addZero(new Date(item.time).getMinutes())}} <b>"{{item.topic }}"</b> by <i>{{item.name}}</i> on {{item.server}}</span>
      </li>
    </ul>
    <br />
    <h3>Status</h3>
    <span>Here you can see where the conversation is at across the participating communities. Click on the "Join" button and navigate to the right voice channel to join the conversation </span>
    <ul class="pl-1">
      <li
        class="room"
        v-for="(room,index) in status"
        :key="index"
        @click="openDiscord(room.invite)"
      >
        <h3>{{ room.name }} <i>({{room.server}})</i><button class="button">click to join</button> </h3> 

        <span
          class="float"
          v-for="(participant,index) in room.participants"
          :key="index"
        >
          <img
            v-bind:src="participant.avatar"
            v-bind:title="participant.name"
            class="avatar"
          />
        </span>

      </li>
    </ul>
  </div>
</template>

<script>
import { GraphQLClient } from "graphql-request";
const  client = new GraphQLClient("//disconference.hackalong.io");
export default {
  props: {
    title: {
      required: false,
      default: "Happening Now",
    },
    subtitle: {
      required: false,
      default: "Check where the conversation is at on discord!",
    },
  },
  data: function () {
    return {
      discorddata: {},
      rooms: {},
      programme: [],
      status: [],
    };
  },

  async mounted() {
    this.fetchDiscordData();
    this.interval = setInterval(
      function () {
        this.fetchDiscordData();
      }.bind(this),
      3000
    );

    // this.fetchData()

    // this.connection = new WebSocket("ws://128.199.39.200:3001");
    // let self = this;

    // this.connection.onmessage = function (event) {
    //   //console.log("received : " + event.data);

    //   // self.programme = self.discorddata = Object.assign(
    //   //   {},
    //   //   JSON.parse(event.data)
    //   // );

    //   self.discorddata = Object.assign(
    //     {},
    //     JSON.parse(event.data)
    //   );

    //   self.rooms = Object.assign(
    //     {},
    //     Object.keys(JSON.parse(event.data))
    //   );
    // };

    // this.connection.onopen = function (event) {
    //   console.log(event);
    //   console.log("Successfully connected to the disconference server...");
    // };
  },
  methods: {
    async fetchDiscordData() {
      // console.log("Getting data from disconference server");
      client
        .request(
          ` query {
                programme {
                  time,
                  name,
                  topic,
                  server
                }
              }`
        )
        .then((data) => {
          this.programme = data.programme;
        });
      client
        .request(
          ` query{
                latest{
                  rooms{
                    name
                    server
                    invite
                    participants{
                      name
                      avatar
                    }
                  }
                }
              }`
        )
        .then((data) => {
          this.status = data.latest.rooms;
        });
    },
    addZero: function (i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    openDiscord: function (invite) {
      if (invite) window.open("https://discord.gg/" + invite, "_blank");
    },
  },
};
</script>

<style scoped>
.float {
  float: left;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.room {
  padding: 5px 5px 70px 5px;
  margin: 5px;
  border: dashed;
}

.button{
  border:solid;
  background-color:red;
  float:right;
}
</style>
