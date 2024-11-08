export const desktopOS = [
  {
    label: 'Mass Followers',
    value: 72.72,
    color: "#9B88FA"
  },
  {
    label: 'Suspicious',
    value: 20.38,
    color: "#2E96FF"
  },
  {
    label: 'Influencers',
    value: 5.38,
    color: "#32D4BD"
  },
];

export const desktopOS2 = [
  {
    label: 'Mass Followers',
    value: 72.72,
  },
  {
    label: 'Suspicious',
    value: 20.38,

  },
  {
    label: 'Influencers',
    value: 5.38,

  },
];

export const mobileOS = [
  {
    label: 'Android',
    value: 70.48,
  },
  {
    label: 'iOS',
    value: 28.8,
  },
  {
    label: 'Other',
    value: 0.71,
  },
];

export const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

export const countryOptions = [
  {
    label: 'Indonesia',
    value: "Indonesia",
  },

];
export const cityOptions = [
  {
    label: 'Jakarta',
    value: "Jakarta",
  },
  {
    label: 'Bandung',
    value: "Bandung",
  },
  {
    label: 'Surabaya',
    value: "Surabaya",
  },
  {
    label: 'Yogyakarta',
    value: "Yogyakarta",
  },
  {
    label: 'Makassar',
    value: "Makassar",
  },
  {
    label: 'Medan',
    value: "Medan",
  },
  {
    label: 'Bekasi',
    value: "Bekasi",
  },
  {
    label: 'Semarang',
    value: "Semarang",
  },
  {
    label: 'Denpasar',
    value: "Denpasar",
  },
  {
    label: 'Bogor',
    value: "Bogor",
  },

];

export const genderOptions = [
  {
    label: 'Any',
    value: "Any",
  },
  {
    label: 'Male',
    value: "Male",
  },
  {
    label: 'Female',
    value: "Female",
  },

];
export const verifiedOptions = [
  {
    label: 'Any',
    value: "Any",
  },
  {
    label: 'Verified',
    value: "Verified",
  },

];
export const accountOptions = [
  {
    label: 'Any',
    value: "Any",
  },
  {
    label: 'Busines',
    value: "Busines",
  },
  {
    label: 'Creator',
    value: "Creator",
  },
  {
    label: 'Personal',
    value: "Personal",
  },

];
export const ageOptions = [
  {
    label: 'Any',
    value: "Any",
  },
  {
    label: '18 - 24',
    value: "18 - 24",
  },
  {
    label: '25 - 34',
    value: "25 - 34",
  },
  {
    label: '35 - 44',
    value: "35 - 44",
  },
  {
    label: '45 - 54',
    value: "45 - 54",
  },
  {
    label: '55 >',
    value: "55 >",
  },

];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item) => `${item.value}%`;