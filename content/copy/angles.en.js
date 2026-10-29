// The /shops and /services pages: how Dakio helps, one angle at a time
// (components/home/Angles.jsx). Each angle opens with the owner's worry in their
// own words, answers it with a real app screen, and ends with one result line.
// Every claim is a feature that works today; nothing from core.md's "Not in
// Dakio yet" list. An angle without a `shot` is not shown yet.
//
// shot: key = public/app/<key>.webp, size = its pixels, note = Nova's note on
// it, at = where the note sits (% of the screen), focus = how far right the
// phone crop looks (%). The screens are the example store Saril, shot on the
// throwaway screens database; shop-website is Saril's Studio theme.

export default {
  shops: {
    ask: "What costs your shop the most today?",
    angles: [
      {
        id: "missed",
        chip: "Missed messages",
        n: "Never miss a sale",
        worry: "Customers message at 2 a.m. and I'm asleep. By morning they have bought somewhere else.",
        h: "Nova answers in seconds, day and night, and takes the order.",
        d: "Messenger, Instagram, WhatsApp and your website chat land in one inbox. Nova reads Bangla, Banglish, voice notes and screenshots of your posts, checks the stock and the delivery charge, and takes the order right in the chat.",
        points: [
          "A \"price?\" under your post gets a reply, and the price goes to their inbox",
          "Stock and price are checked before she says yes",
          "A refund or an angry customer always comes to you",
        ],
        result: "You wake up to orders, not unread messages.",
        shot: {
          key: "shop-inbox",
          size: [1600, 800],
          url: "app.dakio.io/front-office",
          alt: "Dakio Front Office: a customer asks about a Peacock Teal Panjabi at 00:52 and Nova answers with the price and sizes in stock at 00:53",
          note: "Answered at 12:53 at night",
          at: { x: 76, y: 36 },
          focus: 100,
        },
      },
      {
        id: "fake",
        chip: "Fake orders",
        n: "Stop losing money",
        worry: "Fake orders and returns eat my profit. I pay the courier both ways and get nothing back.",
        h: "You see who returns parcels before you ship one.",
        d: "Every order shows the buyer's history: how many parcels they took and how many came back. A buyer who keeps returning is marked as a risk, so you can ask for the delivery charge first. Repeat orders from the same phone or device are caught too.",
        points: [
          "Delivered and returned counts on every order",
          "Repeat orders from one phone or device are caught, with an SMS code check if you want it",
          "Returned parcels are tracked until they are back with you",
        ],
        result: "Fewer wasted parcels, and less money paid to couriers for nothing.",
        shot: {
          key: "shop-risk",
          size: [1600, 966],
          url: "app.dakio.io/orders",
          alt: "Dakio order page: a new order from Imran Kabir, whose customer history is marked RISK with 3 of 4 orders cancelled or returned, and a tip to take the delivery charge in advance",
          note: "3 earlier parcels came back",
          at: { x: 62, y: 62 },
          focus: 100,
        },
      },
      {
        id: "courier",
        chip: "Courier hassle",
        n: "Save hours every day",
        worry: "Half my day goes on copying addresses into the courier and answering \"where is my parcel?\"",
        h: "Approve the order and the courier is booked. The buyer gets the tracking in the chat.",
        d: "Orders from chats, comments, your website and the counter sit in one list. Steadfast, Pathao and RedX are built in: when you approve an order, the parcel is booked with your courier, and the tracking number lands on the order.",
        points: [
          "One list for every order, wherever it came from",
          "Steadfast, Pathao and RedX built in",
          "Confirmed, shipped and out for delivery updates go to the buyer in the chat",
        ],
        result: "No more copying addresses, and far fewer \"where is it?\" calls.",
        shot: {
          key: "shop-couriers",
          size: [1600, 1089],
          url: "app.dakio.io/orders",
          alt: "Dakio Orders page filtered to Delivered: eleven orders, each with its courier, Steadfast or Pathao, and the tracking number",
          note: "Every parcel with its tracking",
          at: { x: 78, y: 26 },
          focus: 100,
        },
      },
      {
        id: "repeat",
        chip: "One-time buyers",
        n: "Sell more to the same people",
        worry: "People ask the price, then go quiet. And the ones who buy, buy once and disappear.",
        h: "Nova follows up, offers what goes well with it, and asks for a review.",
        d: "A chat that went quiet gets a friendly follow up. When the buyer is ready, Nova offers an add-on that goes well with what they picked, uses the coupons you set, and asks for a review after delivery.",
        points: [
          "Follow ups on quiet chats, with a last chance before she stops",
          "\"Goes well with\" add-ons, and free delivery over an amount you set",
          "A review asked for after every delivery",
        ],
        result: "More of the people who ask end up buying, and buying more.",
        shot: {
          key: "shop-followup",
          size: [1600, 1423],
          url: "app.dakio.io/front-office",
          alt: "Dakio Front Office: Sadia asks about a Pistachio kurti and goes quiet, Nova follows up, Sadia orders at 2:29 at night and also takes the White Chikankari Anarkali that Nova suggested",
          note: "Followed up, then sold one more",
          at: { x: 58, y: 47 },
          focus: 80,
        },
      },
      {
        id: "money",
        chip: "No idea of profit",
        n: "Know where your money is",
        worry: "I sell every day, but at the end of the month I don't know if I made a profit.",
        h: "Your profit, your cash and what the couriers owe you, counted for you.",
        d: "Every sale, delivery, courier payment and expense goes into your own books by itself. You see the cash in each account, what each courier still holds, and this month's profit. Nova reads the same books and briefs you every morning.",
        points: [
          "This month's profit, live from your books",
          "What Steadfast and Pathao still hold for you",
          "Bank, bKash and cash in one place, and a journal for your accountant",
        ],
        result: "You know your numbers without opening a spreadsheet.",
        shot: {
          key: "shop-money",
          size: [1600, 986],
          url: "app.dakio.io/money",
          alt: "Dakio Accounting overview for Saril: cash and banks ৳244,980, this month's profit ৳16,850, couriers holding ৳13,740 (Pathao ৳9,480, Steadfast ৳4,260), and the bank, bKash and cash accounts",
          note: "Counted from your own books",
          at: { x: 50, y: 41 },
          focus: 0,
        },
      },
      {
        id: "website",
        chip: "No website",
        n: "Look like a big brand",
        worry: "I only have a Facebook page. A website feels expensive and slow to make.",
        h: "Your own website from day one, with your products already in it.",
        d: "Pick a theme, and your products, prices and stock are already there. Buyers order on the site or in the chat, get a receipt and order updates, and Nova answers the website chat too. Add your own domain whenever you like.",
        points: [
          "Ready themes, no developer needed",
          "The same products, stock and orders as your app",
          "Your own domain when you want it",
        ],
        result: "A shop people trust, live in minutes.",
        shot: {
          key: "shop-website",
          size: [1440, 900],
          url: "yourshop.com",
          alt: "The Saril website on a Dakio theme: a festive saree banner, the menu for women, men, panjabi and kids, and cash on delivery all over Bangladesh",
          note: "Live in minutes",
          at: { x: 76, y: 72 },
          focus: 30,
        },
      },
      {
        id: "stock",
        chip: "No stock",
        n: "No stock? Still sell",
        worry: "I want to sell more products, but I can't buy and store the stock.",
        h: "Sell from verified suppliers. Dakio packs and ships.",
        d: "Browse products from verified suppliers that already sit in Dakio's warehouse, and add them to your shop in one tap. When an order comes, Dakio packs and ships it, and you keep the difference.",
        points: [
          "Verified suppliers, products already in Dakio's warehouse",
          "Import in one tap and set your own price",
          "Dakio packs and ships every order",
        ],
        result: "More to sell, without money stuck in stock.",
        shot: {
          key: "shop-dropship",
          size: [1600, 986],
          url: "app.dakio.io/dropshipping",
          alt: "Dakio Dropshipping: jewellery from a verified supplier, each with the wholesale price, the price it sells for, the stock in Dakio's warehouse and an Import button",
          note: "Already in Dakio's warehouse",
          at: { x: 76, y: 20 },
          focus: 0,
        },
      },
    ],
  },
};
