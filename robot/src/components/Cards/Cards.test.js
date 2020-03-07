import React from "react"
import { shallow } from "enzyme"
import Cards from "./index"

const data = [
  {
    source: { id: "engadget", name: "Engadget" },
    author: "Jon Fingas",
    title: "Google searches are showing rival business directories in Europe",
    description:
      "Google seems to be taking extra steps to please EU regulators worried that it's abusing its search dominance. Search Engine Land has discovered that Google is highlighting rival directory services like Yelp when you search for businesses in European countries…",
    url:
      "https://www.engadget.com/2020/02/24/google-europe-searches-show-rival-directories/",
    urlToImage:
      "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D4999%252C3333%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C1067%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-images%252F2020-02%252F17f9fd00-5690-11ea-bef9-5421fbd6ffbd%26client%3Da1acac3e1b3290917d92%26signature%3D1e430b3aa7ffec09562d668d0553e5b980480f20&client=amp-blogside-v2&signature=b7969676841d57efdd05e794b55c4b835b6cb7e0",
    publishedAt: "2020-02-24T06:24:00Z",
    content:
      "The company appeared to have tested this in Germany before rolling it out to a wider audience that includes the UK.\r\n" +
      "There's no certainty this will prevent another antitrust case against Google. The competing directories are clearly visible, but they're ultim… [+375 chars]"
  },
  {
    source: { id: "engadget", name: "Engadget" },
    author: "Jon Fingas",
    title:
      "Google will review Android apps that request background location info",
    description:
      "Google's upcoming efforts to improve mobile privacy will extend beyond the upgrades in Android 11. Starting August 3rd, the company will require approval for background location requests in all Play Store-bound Android apps. It'll determine if the feature is …",
    url:
      "https://www.engadget.com/2020/02/19/google-will-review-android-app-location-requests/",
    urlToImage:
      "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D4541%252C3027%252C384%252C300%26quality%3D85%26format%3Djpg%26resize%3D1600%252C1067%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-images%252F2019-10%252F0d2c0990-e4ee-11e9-bff8-5e0f2cb5fb40%26client%3Da1acac3e1b3290917d92%26signature%3D2d5f0784a90b49c5a013a5e66edaa890bec773bb&client=amp-blogside-v2&signature=bfd6eece8f415b3889c9fcc931afcabdce6b8929",
    publishedAt: "2020-02-19T21:47:00Z",
    content:
      "The policy will change in April, but developers can ask for feedback on their use cases starting in May. There will also be a grace period for the first few months. Only new apps will need background location approval when August 3rd arrives, but Google will … [+748 chars]"
  },
  {
    source: { id: "engadget", name: "Engadget" },
    author: "Christine Fisher",
    title: "Google might finally pay news outlets for their content",
    description:
      "Google is considering paying news publishers for their content, The Wall Street Journal reports. The company is reportedly in talks with publishers about licensing fees. The details are still sparse, but it sounds like Google could be working on a news subscr…",
    url:
      "https://www.engadget.com/2020/02/14/google-news-publisher-licensing-fees/",
    urlToImage:
      "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D4099%252C2559%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C999%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-images%252F2019-10%252F4845dd60-ec39-11e9-a8ff-177df3751c83%26client%3Da1acac3e1b3290917d92%26signature%3D5bcc319b09f2f26f2e46786feda240bb5db1cceb&client=amp-blogside-v2&signature=d25f74950af80c1f3d1fe9dfd527dd7703fd15cb",
    publishedAt: "2020-02-14T15:33:00Z",
    content: `"We want to help people find quality journalism—it's important to informed democracy and helps support a sustainable news industry," Google said in a statement shared by WSJ. "We care deeply about this and are talking with partners and looking at more ways to… [+761 chars]`
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Frederic Lardinois",
    title: "Google Cloud opens its Seoul region",
    description:
      "Google Cloud today announced that its new Seoul region, its first in Korea, is now open for business. The region, which it first talked about last April, will feature three availability zones and support for virtually all of Google Cloud’s standard service, r…",
    url:
      "http://techcrunch.com/2020/02/19/google-cloud-opens-its-seoul-region/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2020/02/gcp_seoul.gif?w=711",
    publishedAt: "2020-02-19T17:43:13Z",
    content:
      "Google Cloud today announced that its new Seoul region, its first in Korea, is now open for business. The region, which it first talked about last April, will feature three availability zones and support for virtually all of Google Cloud’s standard service, r… [+969 chars]"
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Frederic Lardinois",
    title: "Google Cloud acquires mainframe migration service Cornerstone",
    description:
      "Google today announced that it has acquired Cornerstone, a Dutch company that specializes in helping enterprise migrate their legacy workloads from mainframes to public clouds. Cornerstone, which provides very hands-on migration assistance, will form the basi…",
    url:
      "http://techcrunch.com/2020/02/19/google-cloud-acquires-mainframe-migration-service-cornerstone/",
    urlToImage:
      "https://techcrunch.com/wp-content/uploads/2020/02/GettyImages-170482694.jpg?w=625",
    publishedAt: "2020-02-19T15:00:37Z",
    content:
      "Google today announced that it has acquired Cornerstone, a Dutch company that specializes in helping enterprise migrate their legacy workloads from mainframes to public clouds. Cornerstone, which provides very hands-on migration assistance, will form the basi… [+1742 chars]"
  },
  {
    source: { id: "wired", name: "Wired" },
    author: "Steven Levy",
    title: "Google, Amazon, and Apple Have a Trillion Dollar Problem",
    description:
      "Plus: Steve Jobs' too-modest vision for Apple, the real problem with bitcoin, and the anointing of Rush Limbaugh.",
    url:
      "https://www.wired.com/story/plaintext-google-amazon-apple-big-tech-trillion-dollar-problem/",
    urlToImage:
      "https://media.wired.com/photos/5e3c93f3e601630009b7e7cb/191:100/w_1280,c_limit/Biz-drevil-MSDAUPO_EC043.jpg",
    publishedAt: "2020-02-07T14:00:00Z",
    content:
      "Hi again, its Steven Levy, WIREDs editor at large, with edition two of the Plaintext newsletter. Thanks for all your great comments about last weeks debut.\r\n" +
      "I got a lot of questions about how this winds up in your mailbox. Short answer: Subscribe to WIRED. If… [+2181 chars]"
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Dami Lee",
    title: "Wacom tablets are sharing your app usage with Google Analytics",
    description:
      "Software engineer Robert Heaton discovered that Wacom tablets are collecting data on users’ app usage and sending the information to Google Analytics. Users can opt out of the data collection by going to their settings in the Wacom Experience Program.",
    url:
      "https://www.theverge.com/2020/2/6/21126245/wacom-tablet-app-tracking-google-analytics",
    urlToImage:
      "https://cdn.vox-cdn.com/thumbor/HN1oZHt9iC3h0I0d53Dd-yJLpJg=/0x69:960x572/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/15908644/wacom-mobile-stuido-16-gallery-g1.0.0.1476103990.jpg",
    publishedAt: "2020-02-06T16:14:53Z",
    content:
      "Users can opt out in settings\r\n" +
      "Wacom tablets have been collecting data on what apps users open, and its not entirely clear what Wacom is doing with the data. Software engineer Robert Heaton writes in a detailed blog post that he discovered the behavior after … [+2082 chars]"
  }
]

test("renders without crashing", () => {
  shallow(<Cards data={data} />)
})
