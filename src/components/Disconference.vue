<template>
  <div>
    <div class="mb-0">
      <h2>{{ title }}</h2>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
    <ul class="pl-1">
      <li class="room" v-for="(room,index) in rooms" :key="index">
        <h3>{{ discorddata[room].name }} <button @click="openDiscord(discorddata[room].invite)">Join</button> </h3>
        
          <span class="float"
            v-for="(participant,index) in discorddata[room].participants"
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

    this.connection = new WebSocket("ws://128.199.39.200:3001");
    let self = this;

    this.connection.onmessage = function (event) {
      //console.log("received : " + event.data);
      
      // self.programme = self.discorddata = Object.assign(
      //   {},
      //   JSON.parse(event.data)
      // );


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
  methods:{
      openDiscord: function (invite) {   
          window.open("https://discord.gg/"+invite, "_blank");    
      }
    }
};

</script>

<style scoped>

.float{
  float:left
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
  border-radius: 5%;
  border:solid;
}
</style>
