// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import moment from 'moment-timezone';
import '~/assets/css/main.scss'
import VueYouTubeEmbed from 'vue-youtube-embed'


import DefaultLayout from '~/layouts/Default.vue'
import HeroLayout from '~/layouts/Hero.vue'
import CurtainsLayout from '~/layouts/Curtains.vue'
import NavBar from '~/layouts/partials/NavBar.vue'
import Footer from '~/layouts/partials/Footer.vue'
import HeroContainer from '~/layouts/partials/HeroContainer.vue'
import HeroCurtains from '~/layouts/partials/HeroCurtains.vue' //animation for equinox

import Logo from '~/components/Logo.vue'
import Card from '~/components/Card.vue'
import EventContainer from '~/components/EventContainer.vue'
import EventList from '~/components/EventList.vue'
import TagNav from '~/components/TagNav.vue'
import Disconference from '~/components/Disconference.vue'

import ThankYou from '~/components/ThankYouContainer.vue'
import PerspectiveWrapper from '~/components/PerspectiveWrapper.vue' //animation for equinox


import IndexPage from '~/pages/Index.vue'
import Sprite from '~/components/Sprite.vue'

import VueScrollactive from 'vue-scrollactive';

import VueKinesis from 'vue-kinesis'


export default function (Vue, {
  router,
  head,
  isClient
}) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('LayoutHero', HeroLayout)
  Vue.component('LayoutCurtains', CurtainsLayout)
  Vue.component('PerspectiveWrapper', PerspectiveWrapper)

  Vue.component('Logo', Logo)


  Vue.component('IndexPage', IndexPage)

  Vue.component('disconference', Disconference)

  //add page parts as default components
  Vue.component('nav-bar', NavBar)
  Vue.component('hero-container', HeroContainer)
  Vue.component('hero-curtains', HeroCurtains)
  Vue.component('g-footer', Footer)

  //cards
  Vue.component('card', Card)

  //custom contnet parts
  //events
  Vue.component('event-container', EventContainer)
  Vue.component('event-list', EventList)
  Vue.component('tag-nav', TagNav)

  // credits 
  Vue.component('thank-you', ThankYou)

  //animation
  Vue.component('sprite', Sprite)
  Vue.use(VueScrollactive);
  Vue.use(VueKinesis);
  //initilize other plugins
  Vue.use(VueYouTubeEmbed) // To embed a video use:  <youtube :video-id="videoId"></youtube>

  Vue.filter('formatDate', function (value, format) {
    if (!value) return;
    let date,
      isoTimestamp;

    format = format ? format : 'MM-DD-YYYY';
    isoTimestamp = moment(String(value), 'YYYY-MM-DDTHH:mm:ssZ').isValid();

    date = isoTimestamp ?
      moment(String(value), 'YYYY-MM-DDTHH:mm:ssZ').format(format) :
      moment(String(value), 'x').format(format);

    return date
  });
  Vue.filter('formatTime', function (value, format, timezones) {
    if (!value || value === "0000") return;
    let date,
      isoTimestamp;
    let seperator = "  ";
    format = format ? format : 'HH:mm z';
    isoTimestamp = moment(value, 'h:mm a').isValid();

    date = isoTimestamp ? moment.tz(value, 'h:mm a', 'Europe/Rome').format(format) : value;

    if (timezones) {
      let timzoneDate = isoTimestamp ? moment.tz(value, 'h:mm ', 'Europe/Rome') : false;
      if (timzoneDate && date !== "00:00") {
        date = date + seperator + timzoneDate.tz('America/Costa_Rica').format(format) +
          seperator + timzoneDate.tz('Asia/Kolkata').format(format)
      }
    }

    if (date !== "00:00") return date
  });

  //gridsome configs for head





}