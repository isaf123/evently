export const location = [
  'Jakarta',
  'Surabaya',
  'Malang',
  'Bandung',
  'Semarang',
  'Jogjakarta',
];

export const category = [
  'Music',
  'Nightlife',
  'Holidays',
  'Hobby',
  'Culinary',
  'Other',
];

export const times = ['This\nWeek', 'Next Week', 'This Month', 'Next Month'];
export const price = ['Paid', 'Free'];

export const event = {
  title: "2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta",
  description:
    "CK Star Entertainment proudly presents 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta  Calling all KYUpiter Indonesia! Get ready to swoon because Kyuhyun is about to melt your hearts with his debut concert in Jakarta! Prepare to be swept off your feet this May as Kyuhyun will be coming to Jakarta for his FIRST-EVER solo debut concert happening on 18 May 2024 at Tennis Indoor Senayan! This will also be last and final stop of the 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta, and it’s going to be an amazing night you don’t want to miss.  Cho Kyuhyun or better known as Kyuhyun is a singer from South Korea who is also member and one of the main vocalists of the boy band Super Junior. Apart from being known as a singer, he also has a career as an MC, musical actor and radio DJ. Kyuhyun made his solo debut in 2014 with a mini album entitled 'At Gwanghwamun'.Apart from his musical talents, Kyuhyun also played in several musical dramas. He was also cast in television shows and most recently, he was one of the panelists on the reality show Single Inferno Season 3.On January, 2024, Kyuhyun has announced his upcoming solo 2024 ‘Restart’ Asia tour and he’ll be making a stop in Jakarta. Get ready for an unforgettable night filled with his incredible music and amazing performances. Stay tuned because tickets will be ready for sale on 16 February 2024 at 12:00 PM at Loket.com Follow us on our official Instagram account @ckstar.id to get all the latest news and updates on our shows.",
  term: "Tiket hanya dapat dibeli melalui Loket.com, tiket hanya dapat digunakan untuk masuk ke acara konser 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta.Tickets can only be purchased through Loket.com, tickets are only valid for admission to 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta.Nama sesuai dengan kartu identitas yang sah bersifat wajib untuk membeli Tiket ke konser 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta. Pastikan Anda melakukan pembelian tiket dengan menggunakan data Anda yang sah dan benar (Kartu Identitas/Kartu Pelajar/KTP/KK/SIM/Paspor). Tiket Anda tidak dapat di ubah dan/atau dimodifikasi setelah pembelian sudah dilakukan. You will be required to provide your name in accordance to purchase tickets to the 2024 KYUHYUN ASIA TOUR 'Restart' in Jakarta. The provided name must match the name indicated your personal identification document (ID Card/KTP/KK/Student Card/SIM/Passport). Your ticket(s) cannot be changed, modified or transferred once purchased.",
  category: 'Music',
  price: 50000,
};

export const rupiah = (money: number) => {
  return money.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
};
