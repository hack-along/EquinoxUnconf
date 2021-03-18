<template>
  <div>
    <div class="mb-0">
      <h2>{{ title }}</h2>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
    <ul class="pl-1">
      <li v-for="room in rooms" :key="room">
        <h3>{{ discorddata[room].name }}</h3>
   
          <span
            v-for="participant in discorddata[room].participants"
            :key="participant"
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
      rooms:{}
    };
  },

  created: function () {
    console.log("Starting connection to the disconference server");

    this.connection = new WebSocket("ws://disconference.herokuapp.com");
    let self = this;

    this.connection.onmessage = function (event) {
      //console.log("received : " + event.data);
      //parse data
      self.discorddata = Object.assign(
        {},
        JSON.parse(event.data)
      );

      self.rooms = Object.assign(
        {},
        Object.keys(JSON.parse(event.data))
      );
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the disconference server...");
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
