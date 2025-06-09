const prodUsers = [
  {
    username: "maria.watson",
    email: "maria.watson@example.com",
    points: 110,
    img_url:
      "https://i0.wp.com/shanemcdonald.ie/wp-content/uploads/2017/02/Twitter-Egg.png?resize=500%2C500&ssl=1",
  },
  {
    username: "liam_bennett",
    email: "liam.bennett@example.com",
    points: 225,
    img_url:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    username: "elena.garcia",
    email: "elena.garcia@example.net",
    points: 90,
    img_url:
      "https://i.guim.co.uk/img/media/acb1627786c251362c4bc87c1f53fa39b49d8d3d/0_103_1368_821/master/1368.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=12e6c7c4929e3b77d15e50ccb7d31414",
  },
  {
    username: "toby.richards",
    email: "t.richards@example.org",
    points: 305,
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbAL2IMa6HB3CtL40LaIQuTHIGIDP1MsnFQ&s",
  },
  {
    username: "natalie_king",
    email: "natalie.king@example.co.uk",
    points: 175,
    img_url:
      "https://i0.wp.com/shanemcdonald.ie/wp-content/uploads/2017/02/Twitter-Egg.png?resize=500%2C500&ssl=1",
  },
  {
    username: "ryan.thompson",
    email: "ryan.thompson@example.com",
    points: 140,
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbAL2IMa6HB3CtL40LaIQuTHIGIDP1MsnFQ&s",
  },
  {
    username: "sophia-li",
    email: "sophia.li@example.dev",
    points: 200,
    img_url:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    username: "dan.jacobs",
    email: "dan.jacobs@example.com",
    points: 60,
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbAL2IMa6HB3CtL40LaIQuTHIGIDP1MsnFQ&s",
  },
  {
    username: "zoe.chan",
    email: "zoe.chan@example.org",
    points: 190,
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbAL2IMa6HB3CtL40LaIQuTHIGIDP1MsnFQ&s",
  },
  {
    username: "alexander.patel",
    email: "alex.patel@example.net",
    points: 330,
    img_url:
      "https://i0.wp.com/shanemcdonald.ie/wp-content/uploads/2017/02/Twitter-Egg.png?resize=500%2C500&ssl=1",
  },
  {
    username: "aisha.khan",
    email: "aisha.khan@example.com",
    points: 155,
    img_url: "https://picsum.photos/128/128?random=101", // Different random seed for each
  },
  {
    username: "carlos.mora",
    email: "carlos.mora@example.org",
    points: 230,
    img_url: "https://picsum.photos/128/128?random=102",
  },
  {
    username: "maya_singh",
    email: "maya.singh@example.net",
    points: 95,
    img_url: "https://picsum.photos/128/128?random=103",
  },
  {
    username: "hiroshi.tanaka",
    email: "hiroshi.tanaka@example.co.uk",
    points: 315,
    img_url: "https://picsum.photos/128/128?random=104",
  },
  {
    username: "fatima.ali",
    email: "fatima.ali@example.com",
    points: 180,
    img_url: "https://picsum.photos/128/128?random=105",
  },
  {
    username: "diego_gonzalez",
    email: "diego.gonzalez@example.dev",
    points: 115,
    img_url: "https://picsum.photos/128/128?random=106",
  },
  {
    username: "ling.wu",
    email: "ling.wu@example.com",
    points: 260,
    img_url: "https://picsum.photos/128/128?random=107",
  },
  {
    username: "samuel.adebayo",
    email: "samuel.adebayo@example.org",
    points: 75,
    img_url: "https://picsum.photos/128/128?random=108",
  },
  {
    username: "chloe.lewis",
    email: "chloe.lewis@example.net",
    points: 205,
    img_url: "https://picsum.photos/128/128?random=109",
  },
  {
    username: "rajesh.kumar",
    email: "rajesh.kumar@example.com",
    points: 145,
    img_url: "https://picsum.photos/128/128?random=110",
  },
  {
    username: "sara.ahmed",
    email: "sara.ahmed@example.com",
    points: 190,
    img_url: "https://picsum.photos/128/128?random=111",
  },
  {
    username: "javier.rodriguez",
    email: "javier.rodriguez@example.org",
    points: 88,
    img_url: "https://picsum.photos/128/128?random=112",
  },
  {
    username: "olivia.nguyen",
    email: "olivia.nguyen@example.net",
    points: 270,
    img_url: "https://picsum.photos/128/128?random=113",
  },
  {
    username: "kenji.sato",
    email: "kenji.sato@example.co.uk",
    points: 112,
    img_url: "https://picsum.photos/128/128?random=114",
  },
  {
    username: "amina.diallo",
    email: "amina.diallo@example.com",
    points: 300,
    img_url: "https://picsum.photos/128/128?random=115",
  },
  {
    username: "david.kim",
    email: "david.kim@example.dev",
    points: 168,
    img_url: "https://picsum.photos/128/128?random=116",
  },
  {
    username: "priya_sharma",
    email: "priya.sharma@example.com",
    points: 220,
    img_url: "https://picsum.photos/128/128?random=117",
  },
  {
    username: "marc.dubois",
    email: "marc.dubois@example.org",
    points: 98,
    img_url: "https://picsum.photos/128/128?random=118",
  },
  {
    username: "lin.chen",
    email: "lin.chen@example.net",
    points: 285,
    img_url: "https://picsum.photos/128/128?random=119",
  },
  {
    username: "isabelle.brun",
    email: "isabelle.brun@example.com",
    points: 135,
    img_url: "https://picsum.photos/128/128?random=120",
  },
];

module.exports = prodUsers;
