import {
  buildFormatLongFn,
  buildLocalizeFn,
  buildMatchFn,
  buildMatchPatternFn,
  formatDistance_default,
  formatRelative_default,
  localize_default,
  match_default,
  requiredArgs,
  startOfUTCWeek,
  toDate
} from "./chunk-EJKQFAKC.js";

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/_lib/formatDistance/index.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "minder as 'n sekonde",
    other: "minder as {{count}} sekondes"
  },
  xSeconds: {
    one: "1 sekonde",
    other: "{{count}} sekondes"
  },
  halfAMinute: "'n halwe minuut",
  lessThanXMinutes: {
    one: "minder as 'n minuut",
    other: "minder as {{count}} minute"
  },
  xMinutes: {
    one: "'n minuut",
    other: "{{count}} minute"
  },
  aboutXHours: {
    one: "ongeveer 1 uur",
    other: "ongeveer {{count}} ure"
  },
  xHours: {
    one: "1 uur",
    other: "{{count}} ure"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dae"
  },
  aboutXWeeks: {
    one: "ongeveer 1 week",
    other: "ongeveer {{count}} weke"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weke"
  },
  aboutXMonths: {
    one: "ongeveer 1 maand",
    other: "ongeveer {{count}} maande"
  },
  xMonths: {
    one: "1 maand",
    other: "{{count}} maande"
  },
  aboutXYears: {
    one: "ongeveer 1 jaar",
    other: "ongeveer {{count}} jaar"
  },
  xYears: {
    one: "1 jaar",
    other: "{{count}} jaar"
  },
  overXYears: {
    one: "meer as 1 jaar",
    other: "meer as {{count}} jaar"
  },
  almostXYears: {
    one: "byna 1 jaar",
    other: "byna {{count}} jaar"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "oor " + result;
    } else {
      return result + " gelede";
    }
  }
  return result;
};
var formatDistance_default2 = formatDistance;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/_lib/formatLong/index.js
var dateFormats = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "yyyy/MM/dd"
};
var timeFormats = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong_default = formatLong;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/_lib/formatRelative/index.js
var formatRelativeLocale = {
  lastWeek: "'verlede' eeee 'om' p",
  yesterday: "'gister om' p",
  today: "'vandag om' p",
  tomorrow: "'môre om' p",
  nextWeek: "eeee 'om' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative_default2 = formatRelative;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/_lib/localize/index.js
var eraValues = {
  narrow: ["vC", "nC"],
  abbreviated: ["vC", "nC"],
  wide: ["voor Christus", "na Christus"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1ste kwartaal", "2de kwartaal", "3de kwartaal", "4de kwartaal"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
  wide: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"]
};
var dayValues = {
  narrow: ["S", "M", "D", "W", "D", "V", "S"],
  short: ["So", "Ma", "Di", "Wo", "Do", "Vr", "Sa"],
  abbreviated: ["Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat"],
  wide: ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"]
};
var dayPeriodValues = {
  narrow: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "middaguur",
    morning: "oggend",
    afternoon: "middag",
    evening: "laat middag",
    night: "aand"
  },
  abbreviated: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "middaguur",
    morning: "oggend",
    afternoon: "middag",
    evening: "laat middag",
    night: "aand"
  },
  wide: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "middaguur",
    morning: "oggend",
    afternoon: "middag",
    evening: "laat middag",
    night: "aand"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "uur die middag",
    morning: "uur die oggend",
    afternoon: "uur die middag",
    evening: "uur die aand",
    night: "uur die aand"
  },
  abbreviated: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "uur die middag",
    morning: "uur die oggend",
    afternoon: "uur die middag",
    evening: "uur die aand",
    night: "uur die aand"
  },
  wide: {
    am: "vm",
    pm: "nm",
    midnight: "middernag",
    noon: "uur die middag",
    morning: "uur die oggend",
    afternoon: "uur die middag",
    evening: "uur die aand",
    night: "uur die aand"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 < 20) {
    switch (rem100) {
      case 1:
      case 8:
        return number + "ste";
      default:
        return number + "de";
    }
  }
  return number + "ste";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize_default2 = localize;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/_lib/match/index.js
var matchOrdinalNumberPattern = /^(\d+)(ste|de)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?C\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234](st|d)e kwartaal/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(Jan|Feb|Mrt|Apr|Mei|Jun|Jul|Aug|Sep|Okt|Nov|Dec)\.?/i,
  wide: /^(Januarie|Februarie|Maart|April|Mei|Junie|Julie|Augustus|September|Oktober|November|Desember)/i
};
var parseMonthPatterns = {
  narrow: [/^J/i, /^F/i, /^M/i, /^A/i, /^M/i, /^J/i, /^J/i, /^A/i, /^S/i, /^O/i, /^N/i, /^D/i],
  any: [/^Jan/i, /^Feb/i, /^Mrt/i, /^Apr/i, /^Mei/i, /^Jun/i, /^Jul/i, /^Aug/i, /^Sep/i, /^Okt/i, /^Nov/i, /^Dec/i]
};
var matchDayPatterns = {
  narrow: /^[smdwv]/i,
  short: /^(So|Ma|Di|Wo|Do|Vr|Sa)/i,
  abbreviated: /^(Son|Maa|Din|Woe|Don|Vry|Sat)/i,
  wide: /^(Sondag|Maandag|Dinsdag|Woensdag|Donderdag|Vrydag|Saterdag)/i
};
var parseDayPatterns = {
  narrow: [/^S/i, /^M/i, /^D/i, /^W/i, /^D/i, /^V/i, /^S/i],
  any: [/^So/i, /^Ma/i, /^Di/i, /^Wo/i, /^Do/i, /^Vr/i, /^Sa/i]
};
var matchDayPeriodPatterns = {
  any: /^(vm|nm|middernag|(?:uur )?die (oggend|middag|aand))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^vm/i,
    pm: /^nm/i,
    midnight: /^middernag/i,
    noon: /^middaguur/i,
    morning: /oggend/i,
    afternoon: /middag/i,
    evening: /laat middag/i,
    night: /aand/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match_default2 = match;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/af/index.js
var locale = {
  code: "af",
  formatDistance: formatDistance_default2,
  formatLong: formatLong_default,
  formatRelative: formatRelative_default2,
  localize: localize_default2,
  match: match_default2,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var af_default = locale;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/_lib/formatDistance/index.js
var formatDistanceLocale2 = {
  lessThanXSeconds: {
    one: "أقل من ثانية",
    two: "أقل من ثانيتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية واحدة",
    two: "ثانيتان",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نصف دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقائق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة واحدة",
    two: "دقيقتان",
    threeToTen: "{{count}} دقائق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة واحدة تقريباً",
    two: "ساعتين تقريبا",
    threeToTen: "{{count}} ساعات تقريباً",
    other: "{{count}} ساعة تقريباً"
  },
  xHours: {
    one: "ساعة واحدة",
    two: "ساعتان",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم واحد",
    two: "يومان",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "أسبوع واحد تقريبا",
    two: "أسبوعين تقريبا",
    threeToTen: "{{count}} أسابيع تقريبا",
    other: "{{count}} أسبوعا تقريبا"
  },
  xWeeks: {
    one: "أسبوع واحد",
    two: "أسبوعان",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوعا"
  },
  aboutXMonths: {
    one: "شهر واحد تقريباً",
    two: "شهرين تقريبا",
    threeToTen: "{{count}} أشهر تقريبا",
    other: "{{count}} شهرا تقريباً"
  },
  xMonths: {
    one: "شهر واحد",
    two: "شهران",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهرا"
  },
  aboutXYears: {
    one: "سنة واحدة تقريباً",
    two: "سنتين تقريبا",
    threeToTen: "{{count}} سنوات تقريباً",
    other: "{{count}} سنة تقريباً"
  },
  xYears: {
    one: "سنة واحد",
    two: "سنتان",
    threeToTen: "{{count}} سنوات",
    other: "{{count}} سنة"
  },
  overXYears: {
    one: "أكثر من سنة",
    two: "أكثر من سنتين",
    threeToTen: "أكثر من {{count}} سنوات",
    other: "أكثر من {{count}} سنة"
  },
  almostXYears: {
    one: "ما يقارب سنة واحدة",
    two: "ما يقارب سنتين",
    threeToTen: "ما يقارب {{count}} سنوات",
    other: "ما يقارب {{count}} سنة"
  }
};
var formatDistance3 = function formatDistance4(token, count, options) {
  var usageGroup = formatDistanceLocale2[token];
  var result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace("{{count}}", String(count));
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "خلال " + result;
    } else {
      return "منذ " + result;
    }
  }
  return result;
};
var formatDistance_default3 = formatDistance3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/_lib/formatLong/index.js
var dateFormats2 = {
  full: "EEEE، do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats2 = {
  full: "HH:mm:ss",
  long: "HH:mm:ss",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats2 = {
  full: "{{date}} 'عند الساعة' {{time}}",
  long: "{{date}} 'عند الساعة' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong2 = {
  date: buildFormatLongFn({
    formats: dateFormats2,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats2,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats2,
    defaultWidth: "full"
  })
};
var formatLong_default2 = formatLong2;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/_lib/formatRelative/index.js
var formatRelativeLocale2 = {
  lastWeek: "eeee 'الماضي عند الساعة' p",
  yesterday: "'الأمس عند الساعة' p",
  today: "'اليوم عند الساعة' p",
  tomorrow: "'غدا عند الساعة' p",
  nextWeek: "eeee 'القادم عند الساعة' p",
  other: "P"
};
var formatRelative3 = function formatRelative4(token) {
  return formatRelativeLocale2[token];
};
var formatRelative_default3 = formatRelative3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/_lib/localize/index.js
var eraValues2 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues2 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues2 = {
  narrow: ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"],
  abbreviated: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  wide: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var dayValues2 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues2 = {
  narrow: {
    am: "ص",
    pm: "م",
    morning: "الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "المساء",
    night: "الليل",
    midnight: "منتصف الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    morning: "الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "المساء",
    night: "الليل",
    midnight: "منتصف الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    morning: "الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "المساء",
    night: "الليل",
    midnight: "منتصف الليل"
  }
};
var formattingDayPeriodValues2 = {
  narrow: {
    am: "ص",
    pm: "م",
    morning: "في الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل",
    midnight: "منتصف الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    morning: "في الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل",
    midnight: "منتصف الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    morning: "في الصباح",
    noon: "الظهر",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل",
    midnight: "منتصف الليل"
  }
};
var ordinalNumber3 = function ordinalNumber4(num) {
  return String(num);
};
var localize2 = {
  ordinalNumber: ordinalNumber3,
  era: buildLocalizeFn({
    values: eraValues2,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues2,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback2(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues2,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues2,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues2,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues2,
    defaultFormattingWidth: "wide"
  })
};
var localize_default3 = localize2;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/_lib/match/index.js
var matchOrdinalNumberPattern2 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern2 = /\d+/i;
var matchEraPatterns2 = {
  narrow: /[قب]/,
  abbreviated: /[قب]\.م\./,
  wide: /(قبل|بعد) الميلاد/
};
var parseEraPatterns2 = {
  any: [/قبل/, /بعد/]
};
var matchQuarterPatterns2 = {
  narrow: /^[1234]/i,
  abbreviated: /ر[1234]/,
  wide: /الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns2 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns2 = {
  narrow: /^[أيفمسند]/,
  abbreviated: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns2 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^يناير/i, /^فبراير/i, /^مارس/i, /^أبريل/i, /^مايو/i, /^يونيو/i, /^يوليو/i, /^أغسطس/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
};
var matchDayPatterns2 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns2 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns2 = {
  narrow: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/,
  any: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/
};
var parseDayPeriodPatterns2 = {
  any: {
    am: /^ص/,
    pm: /^م/,
    midnight: /منتصف الليل/,
    noon: /الظهر/,
    afternoon: /بعد الظهر/,
    morning: /في الصباح/,
    evening: /في المساء/,
    night: /في الليل/
  }
};
var match2 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern2,
    parsePattern: parseOrdinalNumberPattern2,
    valueCallback: function valueCallback3(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns2,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns2,
    defaultParseWidth: "any",
    valueCallback: function valueCallback4(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns2,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns2,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns2,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns2,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns2,
    defaultParseWidth: "any"
  })
};
var match_default3 = match2;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar/index.js
var locale2 = {
  code: "ar",
  formatDistance: formatDistance_default3,
  formatLong: formatLong_default2,
  formatRelative: formatRelative_default3,
  localize: localize_default3,
  match: match_default3,
  options: {
    weekStartsOn: 6,
    firstWeekContainsDate: 1
  }
};
var ar_default = locale2;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/_lib/formatDistance/index.js
var formatDistanceLocale3 = {
  lessThanXSeconds: {
    one: "أقل من ثانية واحدة",
    two: "أقل من ثانتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية واحدة",
    two: "ثانتين",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نصف دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقائق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة واحدة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقائق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة واحدة تقريباً",
    two: "ساعتين تقريباً",
    threeToTen: "{{count}} ساعات تقريباً",
    other: "{{count}} ساعة تقريباً"
  },
  xHours: {
    one: "ساعة واحدة",
    two: "ساعتين",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم واحد",
    two: "يومين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "أسبوع واحد تقريباً",
    two: "أسبوعين تقريباً",
    threeToTen: "{{count}} أسابيع تقريباً",
    other: "{{count}} أسبوع تقريباً"
  },
  xWeeks: {
    one: "أسبوع واحد",
    two: "أسبوعين",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوع"
  },
  aboutXMonths: {
    one: "شهر واحد تقريباً",
    two: "شهرين تقريباً",
    threeToTen: "{{count}} أشهر تقريباً",
    other: "{{count}} شهر تقريباً"
  },
  xMonths: {
    one: "شهر واحد",
    two: "شهرين",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  },
  xYears: {
    one: "عام واحد",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من عام",
    two: "أكثر من عامين",
    threeToTen: "أكثر من {{count}} أعوام",
    other: "أكثر من {{count}} عام"
  },
  almostXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  }
};
var formatDistance5 = function formatDistance6(token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale3[token];
  var result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace("{{count}}", String(count));
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في خلال " + result;
    } else {
      return "منذ " + result;
    }
  }
  return result;
};
var formatDistance_default4 = formatDistance5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/_lib/formatLong/index.js
var dateFormats3 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats3 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats3 = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong3 = {
  date: buildFormatLongFn({
    formats: dateFormats3,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats3,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats3,
    defaultWidth: "full"
  })
};
var formatLong_default3 = formatLong3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/_lib/formatRelative/index.js
var formatRelativeLocale3 = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: "P"
};
var formatRelative5 = function formatRelative6(token, _date, _baseDate, _options) {
  return formatRelativeLocale3[token];
};
var formatRelative_default4 = formatRelative5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/_lib/localize/index.js
var eraValues3 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues3 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues3 = {
  narrow: ["ج", "ف", "م", "أ", "م", "ج", "ج", "أ", "س", "أ", "ن", "د"],
  abbreviated: ["جانـ", "فيفـ", "مارس", "أفريل", "مايـ", "جوانـ", "جويـ", "أوت", "سبتـ", "أكتـ", "نوفـ", "ديسـ"],
  wide: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var dayValues3 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنـ", "ثلا", "أربـ", "خميـ", "جمعة", "سبت"],
  wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues3 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  }
};
var formattingDayPeriodValues3 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "في الصباح",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  }
};
var ordinalNumber5 = function ordinalNumber6(dirtyNumber) {
  return String(dirtyNumber);
};
var localize3 = {
  ordinalNumber: ordinalNumber5,
  era: buildLocalizeFn({
    values: eraValues3,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues3,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback3(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues3,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues3,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues3,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues3,
    defaultFormattingWidth: "wide"
  })
};
var localize_default4 = localize3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/_lib/match/index.js
var matchOrdinalNumberPattern3 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern3 = /\d+/i;
var matchEraPatterns3 = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns3 = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns3 = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns3 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns3 = {
  narrow: /^[جفمأسند]/i,
  abbreviated: /^(جان|فيف|مار|أفر|ماي|جوا|جوي|أوت|سبت|أكت|نوف|ديس)/i,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/i
};
var parseMonthPatterns3 = {
  narrow: [/^ج/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ج/i, /^ج/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^جان/i, /^فيف/i, /^مار/i, /^أفر/i, /^ماي/i, /^جوا/i, /^جوي/i, /^أوت/i, /^سبت/i, /^أكت/i, /^نوف/i, /^ديس/i]
};
var matchDayPatterns3 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns3 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns3 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns3 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match3 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern3,
    parsePattern: parseOrdinalNumberPattern3,
    valueCallback: function valueCallback5(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns3,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns3,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns3,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns3,
    defaultParseWidth: "any",
    valueCallback: function valueCallback6(index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns3,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns3,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns3,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns3,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns3,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns3,
    defaultParseWidth: "any"
  })
};
var match_default4 = match3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-DZ/index.js
var locale3 = {
  code: "ar-DZ",
  formatDistance: formatDistance_default4,
  formatLong: formatLong_default3,
  formatRelative: formatRelative_default4,
  localize: localize_default4,
  match: match_default4,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ar_DZ_default = locale3;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/_lib/formatDistance/index.js
var formatDistanceLocale4 = {
  lessThanXSeconds: {
    one: "أقل من ثانية",
    two: "أقل من ثانيتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية",
    two: "ثانيتين",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نص دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقايق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقايق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "حوالي ساعة",
    two: "حوالي ساعتين",
    threeToTen: "حوالي {{count}} ساعات",
    other: "حوالي {{count}} ساعة"
  },
  xHours: {
    one: "ساعة",
    two: "ساعتين",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم",
    two: "يومين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "حوالي أسبوع",
    two: "حوالي أسبوعين",
    threeToTen: "حوالي {{count}} أسابيع",
    other: "حوالي {{count}} أسبوع"
  },
  xWeeks: {
    one: "أسبوع",
    two: "أسبوعين",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوع"
  },
  aboutXMonths: {
    one: "حوالي شهر",
    two: "حوالي شهرين",
    threeToTen: "حوالي {{count}} أشهر",
    other: "حوالي {{count}} شهر"
  },
  xMonths: {
    one: "شهر",
    two: "شهرين",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "حوالي سنة",
    two: "حوالي سنتين",
    threeToTen: "حوالي {{count}} سنين",
    other: "حوالي {{count}} سنة"
  },
  xYears: {
    one: "عام",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من سنة",
    two: "أكثر من سنتين",
    threeToTen: "أكثر من {{count}} سنين",
    other: "أكثر من {{count}} سنة"
  },
  almostXYears: {
    one: "عام تقريبًا",
    two: "عامين تقريبًا",
    threeToTen: "{{count}} أعوام تقريبًا",
    other: "{{count}} عام تقريبًا"
  }
};
var formatDistance7 = function formatDistance8(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale4[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2) {
    result = tokenValue.two;
  } else if (count <= 10) {
    result = tokenValue.threeToTen.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في خلال ".concat(result);
    } else {
      return "منذ ".concat(result);
    }
  }
  return result;
};
var formatDistance_default5 = formatDistance7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/_lib/formatLong/index.js
var dateFormats4 = {
  full: "EEEE، do MMMM y",
  long: "do MMMM y",
  medium: "dd/MMM/y",
  short: "d/MM/y"
};
var timeFormats4 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats4 = {
  full: "{{date}} 'الساعة' {{time}}",
  long: "{{date}} 'الساعة' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong4 = {
  date: buildFormatLongFn({
    formats: dateFormats4,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats4,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats4,
    defaultWidth: "full"
  })
};
var formatLong_default4 = formatLong4;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/_lib/formatRelative/index.js
var formatRelativeLocale4 = {
  lastWeek: "eeee 'اللي جاي الساعة' p",
  yesterday: "'إمبارح الساعة' p",
  today: "'النهاردة الساعة' p",
  tomorrow: "'بكرة الساعة' p",
  nextWeek: "eeee 'الساعة' p",
  other: "P"
};
var formatRelative7 = function formatRelative8(token, _date, _baseDate, _options) {
  return formatRelativeLocale4[token];
};
var formatRelative_default5 = formatRelative7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/_lib/localize/index.js
var eraValues4 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م", "ب.م"],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues4 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues4 = {
  narrow: ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"],
  abbreviated: ["ينا", "فبر", "مارس", "أبريل", "مايو", "يونـ", "يولـ", "أغسـ", "سبتـ", "أكتـ", "نوفـ", "ديسـ"],
  wide: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var dayValues4 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues4 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءً",
    night: "ليلاً"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهراً",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءً",
    night: "ليلاً"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهراً",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءً",
    night: "ليلاً"
  }
};
var formattingDayPeriodValues4 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهراً",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    morning: "في الصباح",
    noon: "ظهراً",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  }
};
var ordinalNumber7 = function ordinalNumber8(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize4 = {
  ordinalNumber: ordinalNumber7,
  era: buildLocalizeFn({
    values: eraValues4,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues4,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback4(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues4,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues4,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues4,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues4,
    defaultFormattingWidth: "wide"
  })
};
var localize_default5 = localize4;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/_lib/match/index.js
var matchOrdinalNumberPattern4 = /^(\d+)/;
var parseOrdinalNumberPattern4 = /\d+/i;
var matchEraPatterns4 = {
  narrow: /^(ق|ب)/g,
  abbreviated: /^(ق.م|ب.م)/g,
  wide: /^(قبل الميلاد|بعد الميلاد)/g
};
var parseEraPatterns4 = {
  any: [/^ق/g, /^ب/g]
};
var matchQuarterPatterns4 = {
  narrow: /^[1234]/,
  abbreviated: /^ر[1234]/,
  wide: /^الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns4 = {
  wide: [/الربع الأول/, /الربع الثاني/, /الربع الثالث/, /الربع الرابع/],
  any: [/1/, /2/, /3/, /4/]
};
var matchMonthPatterns4 = {
  narrow: /^(ي|ف|م|أ|س|ن|د)/,
  abbreviated: /^(ينا|فبر|مارس|أبريل|مايو|يونـ|يولـ|أغسـ|سبتـ|أكتـ|نوفـ|ديسـ)/,
  wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns4 = {
  narrow: [/^ي/, /^ف/, /^م/, /^أ/, /^م/, /^ي/, /^ي/, /^أ/, /^س/, /^أ/, /^ن/, /^د/],
  any: [/^ينا/, /^فبر/, /^مارس/, /^أبريل/, /^مايو/, /^يون/, /^يول/, /^أغس/, /^سبت/, /^أكت/, /^نوف/, /^ديس/]
};
var matchDayPatterns4 = {
  narrow: /^(ح|ن|ث|ر|خ|ج|س)/,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/
};
var parseDayPatterns4 = {
  narrow: [/^ح/, /^ن/, /^ث/, /^ر/, /^خ/, /^ج/, /^س/],
  any: [/أحد/, /اثنين/, /ثلاثاء/, /أربعاء/, /خميس/, /جمعة/, /سبت/]
};
var matchDayPeriodPatterns4 = {
  narrow: /^(ص|م|ن|ظ|في الصباح|بعد الظهر|في المساء|في الليل)/,
  abbreviated: /^(ص|م|نصف الليل|ظهراً|في الصباح|بعد الظهر|في المساء|في الليل)/,
  wide: /^(ص|م|نصف الليل|في الصباح|ظهراً|بعد الظهر|في المساء|في الليل)/,
  any: /^(ص|م|صباح|ظهر|مساء|ليل)/
};
var parseDayPeriodPatterns4 = {
  any: {
    am: /^ص/,
    pm: /^م/,
    midnight: /^ن/,
    noon: /^ظ/,
    morning: /^ص/,
    afternoon: /^بعد/,
    evening: /^م/,
    night: /^ل/
  }
};
var match4 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern4,
    parsePattern: parseOrdinalNumberPattern4,
    valueCallback: function valueCallback7(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns4,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns4,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns4,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns4,
    defaultParseWidth: "any",
    valueCallback: function valueCallback8(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns4,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns4,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns4,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns4,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns4,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns4,
    defaultParseWidth: "any"
  })
};
var match_default5 = match4;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-EG/index.js
var locale4 = {
  code: "ar-EG",
  formatDistance: formatDistance_default5,
  formatLong: formatLong_default4,
  formatRelative: formatRelative_default5,
  localize: localize_default5,
  match: match_default5,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ar_EG_default = locale4;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/_lib/formatDistance/index.js
var formatDistanceLocale5 = {
  lessThanXSeconds: {
    one: "أقل من ثانية واحدة",
    two: "أقل من ثانتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية واحدة",
    two: "ثانتين",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نصف دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقائق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة واحدة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقائق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة واحدة تقريباً",
    two: "ساعتين تقريباً",
    threeToTen: "{{count}} ساعات تقريباً",
    other: "{{count}} ساعة تقريباً"
  },
  xHours: {
    one: "ساعة واحدة",
    two: "ساعتين",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم واحد",
    two: "يومين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "أسبوع واحد تقريباً",
    two: "أسبوعين تقريباً",
    threeToTen: "{{count}} أسابيع تقريباً",
    other: "{{count}} أسبوع تقريباً"
  },
  xWeeks: {
    one: "أسبوع واحد",
    two: "أسبوعين",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوع"
  },
  aboutXMonths: {
    one: "شهر واحد تقريباً",
    two: "شهرين تقريباً",
    threeToTen: "{{count}} أشهر تقريباً",
    other: "{{count}} شهر تقريباً"
  },
  xMonths: {
    one: "شهر واحد",
    two: "شهرين",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  },
  xYears: {
    one: "عام واحد",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من عام",
    two: "أكثر من عامين",
    threeToTen: "أكثر من {{count}} أعوام",
    other: "أكثر من {{count}} عام"
  },
  almostXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  }
};
var formatDistance9 = function formatDistance10(token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale5[token];
  var result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace("{{count}}", String(count));
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في خلال " + result;
    } else {
      return "منذ " + result;
    }
  }
  return result;
};
var formatDistance_default6 = formatDistance9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/_lib/formatLong/index.js
var dateFormats5 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats5 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats5 = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong5 = {
  date: buildFormatLongFn({
    formats: dateFormats5,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats5,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats5,
    defaultWidth: "full"
  })
};
var formatLong_default5 = formatLong5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/_lib/formatRelative/index.js
var formatRelativeLocale5 = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: "P"
};
var formatRelative9 = function formatRelative10(token, _date, _baseDate, _options) {
  return formatRelativeLocale5[token];
};
var formatRelative_default6 = formatRelative9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/_lib/localize/index.js
var eraValues5 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues5 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues5 = {
  narrow: ["ي", "ف", "م", "أ", "م", "ي", "ي", "غ", "ش", "أ", "ن", "د"],
  abbreviated: ["ينا", "فبر", "مارس", "أبريل", "ماي", "يونـ", "يولـ", "غشت", "شتنـ", "أكتـ", "نونـ", "دجنـ"],
  wide: ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"]
};
var dayValues5 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنـ", "ثلا", "أربـ", "خميـ", "جمعة", "سبت"],
  wide: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues5 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  }
};
var formattingDayPeriodValues5 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "في الصباح",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  }
};
var ordinalNumber9 = function ordinalNumber10(dirtyNumber) {
  return String(dirtyNumber);
};
var localize5 = {
  ordinalNumber: ordinalNumber9,
  era: buildLocalizeFn({
    values: eraValues5,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues5,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback5(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues5,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues5,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues5,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues5,
    defaultFormattingWidth: "wide"
  })
};
var localize_default6 = localize5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/_lib/match/index.js
var matchOrdinalNumberPattern5 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern5 = /\d+/i;
var matchEraPatterns5 = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns5 = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns5 = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns5 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns5 = {
  narrow: /^[يفمأمسند]/i,
  abbreviated: /^(ين|ف|مار|أب|ماي|يون|يول|غش|شت|أك|ن|د)/i,
  wide: /^(ين|ف|مار|أب|ماي|يون|يول|غش|شت|أك|ن|د)/i
};
var parseMonthPatterns5 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^غ/i, /^ش/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^ين/i, /^فب/i, /^مار/i, /^أب/i, /^ماي/i, /^يون/i, /^يول/i, /^غشت/i, /^ش/i, /^أك/i, /^ن/i, /^د/i]
};
var matchDayPatterns5 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|إثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|إثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الإثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns5 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الإثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^إث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns5 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns5 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match5 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern5,
    parsePattern: parseOrdinalNumberPattern5,
    valueCallback: function valueCallback9(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns5,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns5,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns5,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns5,
    defaultParseWidth: "any",
    valueCallback: function valueCallback10(index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns5,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns5,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns5,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns5,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns5,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns5,
    defaultParseWidth: "any"
  })
};
var match_default6 = match5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-MA/index.js
var locale5 = {
  code: "ar-MA",
  formatDistance: formatDistance_default6,
  formatLong: formatLong_default5,
  formatRelative: formatRelative_default6,
  localize: localize_default6,
  match: match_default6,
  options: {
    // Monday is 1
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ar_MA_default = locale5;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/_lib/formatDistance/index.js
var formatDistanceLocale6 = {
  lessThanXSeconds: {
    one: "أقل من ثانية واحدة",
    two: "أقل من ثانتين",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية واحدة",
    two: "ثانتين",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نصف دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقائق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة واحدة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقائق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة واحدة تقريباً",
    two: "ساعتين تقريباً",
    threeToTen: "{{count}} ساعات تقريباً",
    other: "{{count}} ساعة تقريباً"
  },
  xHours: {
    one: "ساعة واحدة",
    two: "ساعتين",
    threeToTen: "{{count}} ساعات",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "يوم واحد",
    two: "يومين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "أسبوع واحد تقريباً",
    two: "أسبوعين تقريباً",
    threeToTen: "{{count}} أسابيع تقريباً",
    other: "{{count}} أسبوع تقريباً"
  },
  xWeeks: {
    one: "أسبوع واحد",
    two: "أسبوعين",
    threeToTen: "{{count}} أسابيع",
    other: "{{count}} أسبوع"
  },
  aboutXMonths: {
    one: "شهر واحد تقريباً",
    two: "شهرين تقريباً",
    threeToTen: "{{count}} أشهر تقريباً",
    other: "{{count}} شهر تقريباً"
  },
  xMonths: {
    one: "شهر واحد",
    two: "شهرين",
    threeToTen: "{{count}} أشهر",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  },
  xYears: {
    one: "عام واحد",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من عام",
    two: "أكثر من عامين",
    threeToTen: "أكثر من {{count}} أعوام",
    other: "أكثر من {{count}} عام"
  },
  almostXYears: {
    one: "عام واحد تقريباً",
    two: "عامين تقريباً",
    threeToTen: "{{count}} أعوام تقريباً",
    other: "{{count}} عام تقريباً"
  }
};
var formatDistance11 = function formatDistance12(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale6[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2) {
    result = tokenValue.two;
  } else if (count <= 10) {
    result = tokenValue.threeToTen.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في خلال " + result;
    } else {
      return "منذ " + result;
    }
  }
  return result;
};
var formatDistance_default7 = formatDistance11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/_lib/formatLong/index.js
var dateFormats6 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats6 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats6 = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong6 = {
  date: buildFormatLongFn({
    formats: dateFormats6,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats6,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats6,
    defaultWidth: "full"
  })
};
var formatLong_default6 = formatLong6;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/_lib/formatRelative/index.js
var formatRelativeLocale6 = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: "P"
};
var formatRelative11 = function formatRelative12(token, _date, _baseDate, _options) {
  return formatRelativeLocale6[token];
};
var formatRelative_default7 = formatRelative11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/_lib/localize/index.js
var eraValues6 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues6 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues6 = {
  narrow: ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"],
  abbreviated: ["ينا", "فبر", "مارس", "أبريل", "مايو", "يونـ", "يولـ", "أغسـ", "سبتـ", "أكتـ", "نوفـ", "ديسـ"],
  wide: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var dayValues6 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنـ", "ثلا", "أربـ", "خميـ", "جمعة", "سبت"],
  wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues6 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظهر",
    evening: "مساءاً",
    night: "ليلاً"
  }
};
var formattingDayPeriodValues6 = {
  narrow: {
    am: "ص",
    pm: "م",
    midnight: "ن",
    noon: "ظ",
    morning: "في الصباح",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "في الصباح",
    afternoon: "بعد الظهر",
    evening: "في المساء",
    night: "في الليل"
  },
  wide: {
    am: "ص",
    pm: "م",
    midnight: "نصف الليل",
    noon: "ظهر",
    morning: "صباحاً",
    afternoon: "بعد الظـهر",
    evening: "في المساء",
    night: "في الليل"
  }
};
var ordinalNumber11 = function ordinalNumber12(dirtyNumber) {
  return String(dirtyNumber);
};
var localize6 = {
  ordinalNumber: ordinalNumber11,
  era: buildLocalizeFn({
    values: eraValues6,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues6,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback6(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues6,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues6,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues6,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues6,
    defaultFormattingWidth: "wide"
  })
};
var localize_default7 = localize6;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/_lib/match/index.js
var matchOrdinalNumberPattern6 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern6 = /\d+/i;
var matchEraPatterns6 = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns6 = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns6 = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns6 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns6 = {
  narrow: /^[يفمأمسند]/i,
  abbreviated: /^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i,
  wide: /^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i
};
var parseMonthPatterns6 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^ين/i, /^ف/i, /^مار/i, /^أب/i, /^ماي/i, /^يون/i, /^يول/i, /^أغ/i, /^س/i, /^أك/i, /^ن/i, /^د/i]
};
var matchDayPatterns6 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns6 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns6 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns6 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match6 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern6,
    parsePattern: parseOrdinalNumberPattern6,
    valueCallback: function valueCallback11(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns6,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns6,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns6,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns6,
    defaultParseWidth: "any",
    valueCallback: function valueCallback12(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns6,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns6,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns6,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns6,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns6,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns6,
    defaultParseWidth: "any"
  })
};
var match_default7 = match6;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-SA/index.js
var locale6 = {
  code: "ar-SA",
  formatDistance: formatDistance_default7,
  formatLong: formatLong_default6,
  formatRelative: formatRelative_default7,
  localize: localize_default7,
  match: match_default7,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ar_SA_default = locale6;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/_lib/formatDistance/index.js
var formatDistanceLocale7 = {
  lessThanXSeconds: {
    one: "أقل من ثانية",
    two: "أقل من زوز ثواني",
    threeToTen: "أقل من {{count}} ثواني",
    other: "أقل من {{count}} ثانية"
  },
  xSeconds: {
    one: "ثانية",
    two: "زوز ثواني",
    threeToTen: "{{count}} ثواني",
    other: "{{count}} ثانية"
  },
  halfAMinute: "نص دقيقة",
  lessThanXMinutes: {
    one: "أقل من دقيقة",
    two: "أقل من دقيقتين",
    threeToTen: "أقل من {{count}} دقايق",
    other: "أقل من {{count}} دقيقة"
  },
  xMinutes: {
    one: "دقيقة",
    two: "دقيقتين",
    threeToTen: "{{count}} دقايق",
    other: "{{count}} دقيقة"
  },
  aboutXHours: {
    one: "ساعة تقريب",
    two: "ساعتين تقريب",
    threeToTen: "{{count}} سوايع تقريب",
    other: "{{count}} ساعة تقريب"
  },
  xHours: {
    one: "ساعة",
    two: "ساعتين",
    threeToTen: "{{count}} سوايع",
    other: "{{count}} ساعة"
  },
  xDays: {
    one: "نهار",
    two: "نهارين",
    threeToTen: "{{count}} أيام",
    other: "{{count}} يوم"
  },
  aboutXWeeks: {
    one: "جمعة تقريب",
    two: "جمعتين تقريب",
    threeToTen: "{{count}} جماع تقريب",
    other: "{{count}} جمعة تقريب"
  },
  xWeeks: {
    one: "جمعة",
    two: "جمعتين",
    threeToTen: "{{count}} جماع",
    other: "{{count}} جمعة"
  },
  aboutXMonths: {
    one: "شهر تقريب",
    two: "شهرين تقريب",
    threeToTen: "{{count}} أشهرة تقريب",
    other: "{{count}} شهر تقريب"
  },
  xMonths: {
    one: "شهر",
    two: "شهرين",
    threeToTen: "{{count}} أشهرة",
    other: "{{count}} شهر"
  },
  aboutXYears: {
    one: "عام تقريب",
    two: "عامين تقريب",
    threeToTen: "{{count}} أعوام تقريب",
    other: "{{count}} عام تقريب"
  },
  xYears: {
    one: "عام",
    two: "عامين",
    threeToTen: "{{count}} أعوام",
    other: "{{count}} عام"
  },
  overXYears: {
    one: "أكثر من عام",
    two: "أكثر من عامين",
    threeToTen: "أكثر من {{count}} أعوام",
    other: "أكثر من {{count}} عام"
  },
  almostXYears: {
    one: "عام تقريب",
    two: "عامين تقريب",
    threeToTen: "{{count}} أعوام تقريب",
    other: "{{count}} عام تقريب"
  }
};
var formatDistance13 = function formatDistance14(token, count, options) {
  var usageGroup = formatDistanceLocale7[token];
  var result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace("{{count}}", String(count));
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "في " + result;
    } else {
      return "عندو " + result;
    }
  }
  return result;
};
var formatDistance_default8 = formatDistance13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/_lib/formatLong/index.js
var dateFormats7 = {
  full: "EEEE، do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats7 = {
  full: "HH:mm:ss",
  long: "HH:mm:ss",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats7 = {
  full: "{{date}} 'مع' {{time}}",
  long: "{{date}} 'مع' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong7 = {
  date: buildFormatLongFn({
    formats: dateFormats7,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats7,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats7,
    defaultWidth: "full"
  })
};
var formatLong_default7 = formatLong7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/_lib/formatRelative/index.js
var formatRelativeLocale7 = {
  lastWeek: "eeee 'إلي فات مع' p",
  yesterday: "'البارح مع' p",
  today: "'اليوم مع' p",
  tomorrow: "'غدوة مع' p",
  nextWeek: "eeee 'الجمعة الجاية مع' p 'نهار'",
  other: "P"
};
var formatRelative13 = function formatRelative14(token) {
  return formatRelativeLocale7[token];
};
var formatRelative_default8 = formatRelative13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/_lib/localize/index.js
var eraValues7 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل الميلاد", "بعد الميلاد"]
};
var quarterValues7 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ر1", "ر2", "ر3", "ر4"],
  wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
};
var monthValues7 = {
  narrow: ["د", "ن", "أ", "س", "أ", "ج", "ج", "م", "أ", "م", "ف", "ج"],
  abbreviated: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  wide: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var dayValues7 = {
  narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  abbreviated: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
};
var dayPeriodValues7 = {
  narrow: {
    am: "ص",
    pm: "ع",
    morning: "الصباح",
    noon: "القايلة",
    afternoon: "بعد القايلة",
    evening: "العشية",
    night: "الليل",
    midnight: "نص الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "ع",
    morning: "الصباح",
    noon: "القايلة",
    afternoon: "بعد القايلة",
    evening: "العشية",
    night: "الليل",
    midnight: "نص الليل"
  },
  wide: {
    am: "ص",
    pm: "ع",
    morning: "الصباح",
    noon: "القايلة",
    afternoon: "بعد القايلة",
    evening: "العشية",
    night: "الليل",
    midnight: "نص الليل"
  }
};
var formattingDayPeriodValues7 = {
  narrow: {
    am: "ص",
    pm: "ع",
    morning: "في الصباح",
    noon: "في القايلة",
    afternoon: "بعد القايلة",
    evening: "في العشية",
    night: "في الليل",
    midnight: "نص الليل"
  },
  abbreviated: {
    am: "ص",
    pm: "ع",
    morning: "في الصباح",
    noon: "في القايلة",
    afternoon: "بعد القايلة",
    evening: "في العشية",
    night: "في الليل",
    midnight: "نص الليل"
  },
  wide: {
    am: "ص",
    pm: "ع",
    morning: "في الصباح",
    noon: "في القايلة",
    afternoon: "بعد القايلة",
    evening: "في العشية",
    night: "في الليل",
    midnight: "نص الليل"
  }
};
var ordinalNumber13 = function ordinalNumber14(num) {
  return String(num);
};
var localize7 = {
  ordinalNumber: ordinalNumber13,
  era: buildLocalizeFn({
    values: eraValues7,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues7,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback7(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues7,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues7,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues7,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues7,
    defaultFormattingWidth: "wide"
  })
};
var localize_default8 = localize7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/_lib/match/index.js
var matchOrdinalNumberPattern7 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern7 = /\d+/i;
var matchEraPatterns7 = {
  narrow: /[قب]/,
  abbreviated: /[قب]\.م\./,
  wide: /(قبل|بعد) الميلاد/
};
var parseEraPatterns7 = {
  any: [/قبل/, /بعد/]
};
var matchQuarterPatterns7 = {
  narrow: /^[1234]/i,
  abbreviated: /ر[1234]/,
  wide: /الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns7 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns7 = {
  narrow: /^[جفمأسند]/,
  abbreviated: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns7 = {
  narrow: [/^ج/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ج/i, /^ج/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^جانفي/i, /^فيفري/i, /^مارس/i, /^أفريل/i, /^ماي/i, /^جوان/i, /^جويلية/i, /^أوت/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
};
var matchDayPatterns7 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns7 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns7 = {
  narrow: /^(ص|ع|ن ل|ل|(في|مع) (صباح|قايلة|عشية|ليل))/,
  any: /^([صع]|نص الليل|قايلة|(في|مع) (صباح|قايلة|عشية|ليل))/
};
var parseDayPeriodPatterns7 = {
  any: {
    am: /^ص/,
    pm: /^ع/,
    midnight: /نص الليل/,
    noon: /قايلة/,
    afternoon: /بعد القايلة/,
    morning: /صباح/,
    evening: /عشية/,
    night: /ليل/
  }
};
var match7 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern7,
    parsePattern: parseOrdinalNumberPattern7,
    valueCallback: function valueCallback13(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns7,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns7,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns7,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns7,
    defaultParseWidth: "any",
    valueCallback: function valueCallback14(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns7,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns7,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns7,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns7,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns7,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns7,
    defaultParseWidth: "any"
  })
};
var match_default8 = match7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ar-TN/index.js
var locale7 = {
  code: "ar-TN",
  formatDistance: formatDistance_default8,
  formatLong: formatLong_default7,
  formatRelative: formatRelative_default8,
  localize: localize_default8,
  match: match_default8,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ar_TN_default = locale7;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/_lib/formatDistance/index.js
var formatDistanceLocale8 = {
  lessThanXSeconds: {
    one: "bir saniyədən az",
    other: "{{count}} bir saniyədən az"
  },
  xSeconds: {
    one: "1 saniyə",
    other: "{{count}} saniyə"
  },
  halfAMinute: "yarım dəqiqə",
  lessThanXMinutes: {
    one: "bir dəqiqədən az",
    other: "{{count}} bir dəqiqədən az"
  },
  xMinutes: {
    one: "bir dəqiqə",
    other: "{{count}} dəqiqə"
  },
  aboutXHours: {
    one: "təxminən 1 saat",
    other: "təxminən {{count}} saat"
  },
  xHours: {
    one: "1 saat",
    other: "{{count}} saat"
  },
  xDays: {
    one: "1 gün",
    other: "{{count}} gün"
  },
  aboutXWeeks: {
    one: "təxminən 1 həftə",
    other: "təxminən {{count}} həftə"
  },
  xWeeks: {
    one: "1 həftə",
    other: "{{count}} həftə"
  },
  aboutXMonths: {
    one: "təxminən 1 ay",
    other: "təxminən {{count}} ay"
  },
  xMonths: {
    one: "1 ay",
    other: "{{count}} ay"
  },
  aboutXYears: {
    one: "təxminən 1 il",
    other: "təxminən {{count}} il"
  },
  xYears: {
    one: "1 il",
    other: "{{count}} il"
  },
  overXYears: {
    one: "1 ildən çox",
    other: "{{count}} ildən çox"
  },
  almostXYears: {
    one: "demək olar ki 1 il",
    other: "demək olar ki {{count}} il"
  }
};
var formatDistance15 = function formatDistance16(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale8[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " sonra";
    } else {
      return result + " əvvəl";
    }
  }
  return result;
};
var formatDistance_default9 = formatDistance15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/_lib/formatLong/index.js
var dateFormats8 = {
  full: "EEEE, do MMMM y 'il'",
  long: "do MMMM y 'il'",
  medium: "d MMM y 'il'",
  short: "dd.MM.yyyy"
};
var timeFormats8 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats8 = {
  full: "{{date}} {{time}} - 'də'",
  long: "{{date}} {{time}} - 'də'",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong8 = {
  date: buildFormatLongFn({
    formats: dateFormats8,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats8,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats8,
    defaultWidth: "full"
  })
};
var formatLong_default8 = formatLong8;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/_lib/formatRelative/index.js
var formatRelativeLocale8 = {
  lastWeek: "'sonuncu' eeee p -'də'",
  yesterday: "'dünən' p -'də'",
  today: "'bugün' p -'də'",
  tomorrow: "'sabah' p -'də'",
  nextWeek: "eeee p -'də'",
  other: "P"
};
var formatRelative15 = function formatRelative16(token, _date, _baseDate, _options) {
  return formatRelativeLocale8[token];
};
var formatRelative_default9 = formatRelative15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/_lib/localize/index.js
var eraValues8 = {
  narrow: ["e.ə", "b.e"],
  abbreviated: ["e.ə", "b.e"],
  wide: ["eramızdan əvvəl", "bizim era"]
};
var quarterValues8 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1ci kvartal", "2ci kvartal", "3cü kvartal", "4cü kvartal"]
};
var monthValues8 = {
  narrow: ["Y", "F", "M", "A", "M", "İ", "İ", "A", "S", "O", "N", "D"],
  abbreviated: ["Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek"],
  wide: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"]
};
var dayValues8 = {
  narrow: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
  short: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
  abbreviated: ["Baz", "Baz.e", "Çər.a", "Çər", "Cüm.a", "Cüm", "Şə"],
  wide: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
};
var dayPeriodValues8 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  }
};
var formattingDayPeriodValues8 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gecəyarı",
    noon: "gün",
    morning: "səhər",
    afternoon: "gündüz",
    evening: "axşam",
    night: "gecə"
  }
};
var suffixes = {
  1: "-inci",
  5: "-inci",
  8: "-inci",
  70: "-inci",
  80: "-inci",
  2: "-nci",
  7: "-nci",
  20: "-nci",
  50: "-nci",
  3: "-üncü",
  4: "-üncü",
  100: "-üncü",
  6: "-ncı",
  9: "-uncu",
  10: "-uncu",
  30: "-uncu",
  60: "-ıncı",
  90: "-ıncı"
};
var getSuffix = function getSuffix2(number) {
  if (number === 0) {
    return number + "-ıncı";
  }
  var a = number % 10;
  var b = number % 100 - a;
  var c = number >= 100 ? 100 : null;
  if (suffixes[a]) {
    return suffixes[a];
  } else if (suffixes[b]) {
    return suffixes[b];
  } else if (c !== null) {
    return suffixes[c];
  }
  return "";
};
var ordinalNumber15 = function ordinalNumber16(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var suffix = getSuffix(number);
  return number + suffix;
};
var localize8 = {
  ordinalNumber: ordinalNumber15,
  era: buildLocalizeFn({
    values: eraValues8,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues8,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback8(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues8,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues8,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues8,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues8,
    defaultFormattingWidth: "wide"
  })
};
var localize_default9 = localize8;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/_lib/match/index.js
var matchOrdinalNumberPattern8 = /^(\d+)(-?(ci|inci|nci|uncu|üncü|ncı))?/i;
var parseOrdinalNumberPattern8 = /\d+/i;
var matchEraPatterns8 = {
  narrow: /^(b|a)$/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)$/i,
  wide: /^(bizim eradan əvvəl|bizim era)$/i
};
var parseEraPatterns8 = {
  any: [/^b$/i, /^(a|c)$/i]
};
var matchQuarterPatterns8 = {
  narrow: /^[1234]$/i,
  abbreviated: /^K[1234]$/i,
  wide: /^[1234](ci)? kvartal$/i
};
var parseQuarterPatterns8 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns8 = {
  narrow: /^[(?-i)yfmaisond]$/i,
  abbreviated: /^(Yan|Fev|Mar|Apr|May|İyun|İyul|Avq|Sen|Okt|Noy|Dek)$/i,
  wide: /^(Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avgust|Sentyabr|Oktyabr|Noyabr|Dekabr)$/i
};
var parseMonthPatterns8 = {
  narrow: [/^[(?-i)y]$/i, /^[(?-i)f]$/i, /^[(?-i)m]$/i, /^[(?-i)a]$/i, /^[(?-i)m]$/i, /^[(?-i)i]$/i, /^[(?-i)i]$/i, /^[(?-i)a]$/i, /^[(?-i)s]$/i, /^[(?-i)o]$/i, /^[(?-i)n]$/i, /^[(?-i)d]$/i],
  abbreviated: [/^Yan$/i, /^Fev$/i, /^Mar$/i, /^Apr$/i, /^May$/i, /^İyun$/i, /^İyul$/i, /^Avg$/i, /^Sen$/i, /^Okt$/i, /^Noy$/i, /^Dek$/i],
  wide: [/^Yanvar$/i, /^Fevral$/i, /^Mart$/i, /^Aprel$/i, /^May$/i, /^İyun$/i, /^İyul$/i, /^Avgust$/i, /^Sentyabr$/i, /^Oktyabr$/i, /^Noyabr$/i, /^Dekabr$/i]
};
var matchDayPatterns8 = {
  narrow: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  short: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  abbreviated: /^(Baz\.e|Çər|Çər\.a|Cüm|Cüm\.a|Şə)$/i,
  wide: /^(Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə)$/i
};
var parseDayPatterns8 = {
  narrow: [/^B\.$/i, /^B\.e$/i, /^Ç\.a$/i, /^Ç\.$/i, /^C\.a$/i, /^C\.$/i, /^Ş\.$/i],
  abbreviated: [/^Baz$/i, /^Baz\.e$/i, /^Çər\.a$/i, /^Çər$/i, /^Cüm\.a$/i, /^Cüm$/i, /^Şə$/i],
  wide: [/^Bazar$/i, /^Bazar ertəsi$/i, /^Çərşənbə axşamı$/i, /^Çərşənbə$/i, /^Cümə axşamı$/i, /^Cümə$/i, /^Şənbə$/i],
  any: [/^B\.$/i, /^B\.e$/i, /^Ç\.a$/i, /^Ç\.$/i, /^C\.a$/i, /^C\.$/i, /^Ş\.$/i]
};
var matchDayPeriodPatterns8 = {
  narrow: /^(a|p|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i,
  any: /^(am|pm|a\.m\.|p\.m\.|AM|PM|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i
};
var parseDayPeriodPatterns8 = {
  any: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /^gecəyarı$/i,
    noon: /^gün$/i,
    morning: /səhər$/i,
    afternoon: /gündüz$/i,
    evening: /axşam$/i,
    night: /gecə$/i
  }
};
var match8 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern8,
    parsePattern: parseOrdinalNumberPattern8,
    valueCallback: function valueCallback15(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns8,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns8,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns8,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns8,
    defaultParseWidth: "any",
    valueCallback: function valueCallback16(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns8,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns8,
    defaultParseWidth: "narrow"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns8,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns8,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns8,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns8,
    defaultParseWidth: "any"
  })
};
var match_default9 = match8;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/az/index.js
var locale8 = {
  code: "az",
  formatDistance: formatDistance_default9,
  formatLong: formatLong_default8,
  formatRelative: formatRelative_default9,
  localize: localize_default9,
  match: match_default9,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var az_default = locale8;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/_lib/formatDistance/index.js
function declension(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  var rem10 = count % 10;
  var rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn(scheme) {
  return function(count, options) {
    if (options && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension(scheme.future, count);
        } else {
          return "праз " + declension(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension(scheme.past, count);
        } else {
          return declension(scheme.regular, count) + " таму";
        }
      }
    } else {
      return declension(scheme.regular, count);
    }
  };
}
var halfAMinute = function halfAMinute2(_, options) {
  if (options && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "праз паўхвіліны";
    } else {
      return "паўхвіліны таму";
    }
  }
  return "паўхвіліны";
};
var formatDistanceLocale9 = {
  lessThanXSeconds: buildLocalizeTokenFn({
    regular: {
      one: "менш за секунду",
      singularNominative: "менш за {{count}} секунду",
      singularGenitive: "менш за {{count}} секунды",
      pluralGenitive: "менш за {{count}} секунд"
    },
    future: {
      one: "менш, чым праз секунду",
      singularNominative: "менш, чым праз {{count}} секунду",
      singularGenitive: "менш, чым праз {{count}} секунды",
      pluralGenitive: "менш, чым праз {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду таму",
      singularGenitive: "{{count}} секунды таму",
      pluralGenitive: "{{count}} секунд таму"
    },
    future: {
      singularNominative: "праз {{count}} секунду",
      singularGenitive: "праз {{count}} секунды",
      pluralGenitive: "праз {{count}} секунд"
    }
  }),
  halfAMinute,
  lessThanXMinutes: buildLocalizeTokenFn({
    regular: {
      one: "менш за хвіліну",
      singularNominative: "менш за {{count}} хвіліну",
      singularGenitive: "менш за {{count}} хвіліны",
      pluralGenitive: "менш за {{count}} хвілін"
    },
    future: {
      one: "менш, чым праз хвіліну",
      singularNominative: "менш, чым праз {{count}} хвіліну",
      singularGenitive: "менш, чым праз {{count}} хвіліны",
      pluralGenitive: "менш, чым праз {{count}} хвілін"
    }
  }),
  xMinutes: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} хвіліна",
      singularGenitive: "{{count}} хвіліны",
      pluralGenitive: "{{count}} хвілін"
    },
    past: {
      singularNominative: "{{count}} хвіліну таму",
      singularGenitive: "{{count}} хвіліны таму",
      pluralGenitive: "{{count}} хвілін таму"
    },
    future: {
      singularNominative: "праз {{count}} хвіліну",
      singularGenitive: "праз {{count}} хвіліны",
      pluralGenitive: "праз {{count}} хвілін"
    }
  }),
  aboutXHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "каля {{count}} гадзіны",
      singularGenitive: "каля {{count}} гадзін",
      pluralGenitive: "каля {{count}} гадзін"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} гадзіну",
      singularGenitive: "прыблізна праз {{count}} гадзіны",
      pluralGenitive: "прыблізна праз {{count}} гадзін"
    }
  }),
  xHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} гадзіна",
      singularGenitive: "{{count}} гадзіны",
      pluralGenitive: "{{count}} гадзін"
    },
    past: {
      singularNominative: "{{count}} гадзіну таму",
      singularGenitive: "{{count}} гадзіны таму",
      pluralGenitive: "{{count}} гадзін таму"
    },
    future: {
      singularNominative: "праз {{count}} гадзіну",
      singularGenitive: "праз {{count}} гадзіны",
      pluralGenitive: "праз {{count}} гадзін"
    }
  }),
  xDays: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} дзень",
      singularGenitive: "{{count}} дні",
      pluralGenitive: "{{count}} дзён"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "каля {{count}} месяца",
      // TODO
      singularGenitive: "каля {{count}} месяцаў",
      // TODO
      pluralGenitive: "каля {{count}} месяцаў"
      // TODO
    },
    future: {
      singularNominative: "прыблізна праз {{count}} месяц",
      // TODO
      singularGenitive: "прыблізна праз {{count}} месяцы",
      // TODO
      pluralGenitive: "прыблізна праз {{count}} месяцаў"
      // TODO
    }
  }),
  xWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяцы",
      pluralGenitive: "{{count}} месяцаў"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "каля {{count}} месяца",
      singularGenitive: "каля {{count}} месяцаў",
      pluralGenitive: "каля {{count}} месяцаў"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} месяц",
      singularGenitive: "прыблізна праз {{count}} месяцы",
      pluralGenitive: "прыблізна праз {{count}} месяцаў"
    }
  }),
  xMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяцы",
      pluralGenitive: "{{count}} месяцаў"
    }
  }),
  aboutXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "каля {{count}} года",
      singularGenitive: "каля {{count}} гадоў",
      pluralGenitive: "каля {{count}} гадоў"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} год",
      singularGenitive: "прыблізна праз {{count}} гады",
      pluralGenitive: "прыблізна праз {{count}} гадоў"
    }
  }),
  xYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} гады",
      pluralGenitive: "{{count}} гадоў"
    }
  }),
  overXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "больш за {{count}} год",
      singularGenitive: "больш за {{count}} гады",
      pluralGenitive: "больш за {{count}} гадоў"
    },
    future: {
      singularNominative: "больш, чым праз {{count}} год",
      singularGenitive: "больш, чым праз {{count}} гады",
      pluralGenitive: "больш, чым праз {{count}} гадоў"
    }
  }),
  almostXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "амаль {{count}} год",
      singularGenitive: "амаль {{count}} гады",
      pluralGenitive: "амаль {{count}} гадоў"
    },
    future: {
      singularNominative: "амаль праз {{count}} год",
      singularGenitive: "амаль праз {{count}} гады",
      pluralGenitive: "амаль праз {{count}} гадоў"
    }
  })
};
var formatDistance17 = function formatDistance18(token, count, options) {
  options = options || {};
  return formatDistanceLocale9[token](count, options);
};
var formatDistance_default10 = formatDistance17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/_lib/formatLong/index.js
var dateFormats9 = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y"
};
var timeFormats9 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats9 = {
  any: "{{date}}, {{time}}"
};
var formatLong9 = {
  date: buildFormatLongFn({
    formats: dateFormats9,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats9,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats9,
    defaultWidth: "any"
  })
};
var formatLong_default9 = formatLong9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/_lib/isSameUTCWeek/index.js
function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfUTCWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfUTCWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/_lib/formatRelative/index.js
var accusativeWeekdays = ["нядзелю", "панядзелак", "аўторак", "сераду", "чацвер", "пятніцу", "суботу"];
function lastWeek(day) {
  var weekday = accusativeWeekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у мінулую " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у мінулы " + weekday + " а' p";
  }
}
function thisWeek(day) {
  var weekday = accusativeWeekdays[day];
  return "'у " + weekday + " а' p";
}
function nextWeek(day) {
  var weekday = accusativeWeekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступную " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у наступны " + weekday + " а' p";
  }
}
var lastWeekFormat = function lastWeekFormat2(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek(day);
  } else {
    return lastWeek(day);
  }
};
var nextWeekFormat = function nextWeekFormat2(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek(day);
  } else {
    return nextWeek(day);
  }
};
var formatRelativeLocale9 = {
  lastWeek: lastWeekFormat,
  yesterday: "'учора а' p",
  today: "'сёння а' p",
  tomorrow: "'заўтра а' p",
  nextWeek: nextWeekFormat,
  other: "P"
};
var formatRelative17 = function formatRelative18(token, date, baseDate, options) {
  var format = formatRelativeLocale9[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default10 = formatRelative17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/_lib/localize/index.js
var eraValues9 = {
  narrow: ["да н.э.", "н.э."],
  abbreviated: ["да н. э.", "н. э."],
  wide: ["да нашай эры", "нашай эры"]
};
var quarterValues9 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-ы кв.", "2-і кв.", "3-і кв.", "4-ы кв."],
  wide: ["1-ы квартал", "2-і квартал", "3-і квартал", "4-ы квартал"]
};
var monthValues9 = {
  narrow: ["С", "Л", "С", "К", "М", "Ч", "Л", "Ж", "В", "К", "Л", "С"],
  abbreviated: ["студз.", "лют.", "сак.", "крас.", "май", "чэрв.", "ліп.", "жн.", "вер.", "кастр.", "ліст.", "снеж."],
  wide: ["студзень", "люты", "сакавік", "красавік", "май", "чэрвень", "ліпень", "жнівень", "верасень", "кастрычнік", "лістапад", "снежань"]
};
var formattingMonthValues = {
  narrow: ["С", "Л", "С", "К", "М", "Ч", "Л", "Ж", "В", "К", "Л", "С"],
  abbreviated: ["студз.", "лют.", "сак.", "крас.", "мая", "чэрв.", "ліп.", "жн.", "вер.", "кастр.", "ліст.", "снеж."],
  wide: ["студзеня", "лютага", "сакавіка", "красавіка", "мая", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"]
};
var dayValues9 = {
  narrow: ["Н", "П", "А", "С", "Ч", "П", "С"],
  short: ["нд", "пн", "аў", "ср", "чц", "пт", "сб"],
  abbreviated: ["нядз", "пан", "аўт", "сер", "чац", "пят", "суб"],
  wide: ["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"]
};
var dayPeriodValues9 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дзень",
    evening: "веч.",
    night: "ноч"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дзень",
    evening: "веч.",
    night: "ноч"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўнач",
    noon: "поўдзень",
    morning: "раніца",
    afternoon: "дзень",
    evening: "вечар",
    night: "ноч"
  }
};
var formattingDayPeriodValues9 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дня",
    evening: "веч.",
    night: "ночы"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дня",
    evening: "веч.",
    night: "ночы"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўнач",
    noon: "поўдзень",
    morning: "раніцы",
    afternoon: "дня",
    evening: "вечара",
    night: "ночы"
  }
};
var ordinalNumber17 = function ordinalNumber18(dirtyNumber, options) {
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  var number = Number(dirtyNumber);
  var suffix;
  if (unit === "date") {
    suffix = "-га";
  } else if (unit === "hour" || unit === "minute" || unit === "second") {
    suffix = "-я";
  } else {
    suffix = (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? "-і" : "-ы";
  }
  return number + suffix;
};
var localize9 = {
  ordinalNumber: ordinalNumber17,
  era: buildLocalizeFn({
    values: eraValues9,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues9,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback9(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues9,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues9,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues9,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues9,
    defaultFormattingWidth: "wide"
  })
};
var localize_default10 = localize9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/_lib/match/index.js
var matchOrdinalNumberPattern9 = /^(\d+)(-?(е|я|га|і|ы|ае|ая|яя|шы|гі|ці|ты|мы))?/i;
var parseOrdinalNumberPattern9 = /\d+/i;
var matchEraPatterns9 = {
  narrow: /^((да )?н\.?\s?э\.?)/i,
  abbreviated: /^((да )?н\.?\s?э\.?)/i,
  wide: /^(да нашай эры|нашай эры|наша эра)/i
};
var parseEraPatterns9 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns9 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыі]?)? кв.?/i,
  wide: /^[1234](-?[ыі]?)? квартал/i
};
var parseQuarterPatterns9 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns9 = {
  narrow: /^[слкмчжв]/i,
  abbreviated: /^(студз|лют|сак|крас|ма[йя]|чэрв|ліп|жн|вер|кастр|ліст|снеж)\.?/i,
  wide: /^(студзен[ья]|лют(ы|ага)|сакавіка?|красавіка?|ма[йя]|чэрвен[ья]|ліпен[ья]|жні(вень|ўня)|верас(ень|ня)|кастрычніка?|лістапада?|снеж(ань|ня))/i
};
var parseMonthPatterns9 = {
  narrow: [/^с/i, /^л/i, /^с/i, /^к/i, /^м/i, /^ч/i, /^л/i, /^ж/i, /^в/i, /^к/i, /^л/i, /^с/i],
  any: [/^ст/i, /^лю/i, /^са/i, /^кр/i, /^ма/i, /^ч/i, /^ліп/i, /^ж/i, /^в/i, /^ка/i, /^ліс/i, /^сн/i]
};
var matchDayPatterns9 = {
  narrow: /^[нпасч]/i,
  short: /^(нд|ня|пн|па|аў|ат|ср|се|чц|ча|пт|пя|сб|су)\.?/i,
  abbreviated: /^(нядз?|ндз|пнд|пан|аўт|срд|сер|чцв|чац|птн|пят|суб).?/i,
  wide: /^(нядзел[яі]|панядзел(ак|ка)|аўтор(ак|ка)|серад[аы]|чацв(ер|ярга)|пятніц[аы]|субот[аы])/i
};
var parseDayPatterns9 = {
  narrow: [/^н/i, /^п/i, /^а/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[ан]/i, /^а/i, /^с[ер]/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns9 = {
  narrow: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  abbreviated: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  wide: /^([дп]п|поўнач|поўдзень|раніц[аы]|дзень|дня|вечара?|ночы?)/i
};
var parseDayPeriodPatterns9 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^поўн/i,
    noon: /^поўд/i,
    morning: /^р/i,
    afternoon: /^д[зн]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match9 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern9,
    parsePattern: parseOrdinalNumberPattern9,
    valueCallback: function valueCallback17(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns9,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns9,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns9,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns9,
    defaultParseWidth: "any",
    valueCallback: function valueCallback18(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns9,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns9,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns9,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns9,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns9,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns9,
    defaultParseWidth: "any"
  })
};
var match_default10 = match9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be/index.js
var locale9 = {
  code: "be",
  formatDistance: formatDistance_default10,
  formatLong: formatLong_default9,
  formatRelative: formatRelative_default10,
  localize: localize_default10,
  match: match_default10,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var be_default = locale9;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/_lib/formatDistance/index.js
function declension2(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  var rem10 = count % 10;
  var rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn2(scheme) {
  return function(count, options) {
    if (options && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension2(scheme.future, count);
        } else {
          return "праз " + declension2(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension2(scheme.past, count);
        } else {
          return declension2(scheme.regular, count) + " таму";
        }
      }
    } else {
      return declension2(scheme.regular, count);
    }
  };
}
var halfAMinute3 = function halfAMinute4(_, options) {
  if (options && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "праз паўхвіліны";
    } else {
      return "паўхвіліны таму";
    }
  }
  return "паўхвіліны";
};
var formatDistanceLocale10 = {
  lessThanXSeconds: buildLocalizeTokenFn2({
    regular: {
      one: "менш за секунду",
      singularNominative: "менш за {{count}} секунду",
      singularGenitive: "менш за {{count}} секунды",
      pluralGenitive: "менш за {{count}} секунд"
    },
    future: {
      one: "менш, чым праз секунду",
      singularNominative: "менш, чым праз {{count}} секунду",
      singularGenitive: "менш, чым праз {{count}} секунды",
      pluralGenitive: "менш, чым праз {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду таму",
      singularGenitive: "{{count}} секунды таму",
      pluralGenitive: "{{count}} секунд таму"
    },
    future: {
      singularNominative: "праз {{count}} секунду",
      singularGenitive: "праз {{count}} секунды",
      pluralGenitive: "праз {{count}} секунд"
    }
  }),
  halfAMinute: halfAMinute3,
  lessThanXMinutes: buildLocalizeTokenFn2({
    regular: {
      one: "менш за хвіліну",
      singularNominative: "менш за {{count}} хвіліну",
      singularGenitive: "менш за {{count}} хвіліны",
      pluralGenitive: "менш за {{count}} хвілін"
    },
    future: {
      one: "менш, чым праз хвіліну",
      singularNominative: "менш, чым праз {{count}} хвіліну",
      singularGenitive: "менш, чым праз {{count}} хвіліны",
      pluralGenitive: "менш, чым праз {{count}} хвілін"
    }
  }),
  xMinutes: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} хвіліна",
      singularGenitive: "{{count}} хвіліны",
      pluralGenitive: "{{count}} хвілін"
    },
    past: {
      singularNominative: "{{count}} хвіліну таму",
      singularGenitive: "{{count}} хвіліны таму",
      pluralGenitive: "{{count}} хвілін таму"
    },
    future: {
      singularNominative: "праз {{count}} хвіліну",
      singularGenitive: "праз {{count}} хвіліны",
      pluralGenitive: "праз {{count}} хвілін"
    }
  }),
  aboutXHours: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "каля {{count}} гадзіны",
      singularGenitive: "каля {{count}} гадзін",
      pluralGenitive: "каля {{count}} гадзін"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} гадзіну",
      singularGenitive: "прыблізна праз {{count}} гадзіны",
      pluralGenitive: "прыблізна праз {{count}} гадзін"
    }
  }),
  xHours: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} гадзіна",
      singularGenitive: "{{count}} гадзіны",
      pluralGenitive: "{{count}} гадзін"
    },
    past: {
      singularNominative: "{{count}} гадзіну таму",
      singularGenitive: "{{count}} гадзіны таму",
      pluralGenitive: "{{count}} гадзін таму"
    },
    future: {
      singularNominative: "праз {{count}} гадзіну",
      singularGenitive: "праз {{count}} гадзіны",
      pluralGenitive: "праз {{count}} гадзін"
    }
  }),
  xDays: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} дзень",
      singularGenitive: "{{count}} дні",
      pluralGenitive: "{{count}} дзён"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "каля {{count}} месяца",
      // TODO
      singularGenitive: "каля {{count}} месяцаў",
      // TODO
      pluralGenitive: "каля {{count}} месяцаў"
      // TODO
    },
    future: {
      singularNominative: "прыблізна праз {{count}} месяц",
      // TODO
      singularGenitive: "прыблізна праз {{count}} месяцы",
      // TODO
      pluralGenitive: "прыблізна праз {{count}} месяцаў"
      // TODO
    }
  }),
  xWeeks: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяцы",
      pluralGenitive: "{{count}} месяцаў"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "каля {{count}} месяца",
      singularGenitive: "каля {{count}} месяцаў",
      pluralGenitive: "каля {{count}} месяцаў"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} месяц",
      singularGenitive: "прыблізна праз {{count}} месяцы",
      pluralGenitive: "прыблізна праз {{count}} месяцаў"
    }
  }),
  xMonths: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяцы",
      pluralGenitive: "{{count}} месяцаў"
    }
  }),
  aboutXYears: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "каля {{count}} года",
      singularGenitive: "каля {{count}} гадоў",
      pluralGenitive: "каля {{count}} гадоў"
    },
    future: {
      singularNominative: "прыблізна праз {{count}} год",
      singularGenitive: "прыблізна праз {{count}} гады",
      pluralGenitive: "прыблізна праз {{count}} гадоў"
    }
  }),
  xYears: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} гады",
      pluralGenitive: "{{count}} гадоў"
    }
  }),
  overXYears: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "больш за {{count}} год",
      singularGenitive: "больш за {{count}} гады",
      pluralGenitive: "больш за {{count}} гадоў"
    },
    future: {
      singularNominative: "больш, чым праз {{count}} год",
      singularGenitive: "больш, чым праз {{count}} гады",
      pluralGenitive: "больш, чым праз {{count}} гадоў"
    }
  }),
  almostXYears: buildLocalizeTokenFn2({
    regular: {
      singularNominative: "амаль {{count}} год",
      singularGenitive: "амаль {{count}} гады",
      pluralGenitive: "амаль {{count}} гадоў"
    },
    future: {
      singularNominative: "амаль праз {{count}} год",
      singularGenitive: "амаль праз {{count}} гады",
      pluralGenitive: "амаль праз {{count}} гадоў"
    }
  })
};
var formatDistance19 = function formatDistance20(token, count, options) {
  options = options || {};
  return formatDistanceLocale10[token](count, options);
};
var formatDistance_default11 = formatDistance19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/_lib/formatLong/index.js
var dateFormats10 = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y"
};
var timeFormats10 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats10 = {
  any: "{{date}}, {{time}}"
};
var formatLong10 = {
  date: buildFormatLongFn({
    formats: dateFormats10,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats10,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats10,
    defaultWidth: "any"
  })
};
var formatLong_default10 = formatLong10;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/_lib/formatRelative/index.js
var accusativeWeekdays2 = ["нядзелю", "панядзелак", "аўторак", "сераду", "чацьвер", "пятніцу", "суботу"];
function lastWeek2(day) {
  var weekday = accusativeWeekdays2[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у мінулую " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у мінулы " + weekday + " а' p";
  }
}
function thisWeek2(day) {
  var weekday = accusativeWeekdays2[day];
  return "'у " + weekday + " а' p";
}
function nextWeek2(day) {
  var weekday = accusativeWeekdays2[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступную " + weekday + " а' p";
    case 1:
    case 2:
    case 4:
      return "'у наступны " + weekday + " а' p";
  }
}
var lastWeekFormat3 = function lastWeekFormat4(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek2(day);
  } else {
    return lastWeek2(day);
  }
};
var nextWeekFormat3 = function nextWeekFormat4(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek2(day);
  } else {
    return nextWeek2(day);
  }
};
var formatRelativeLocale10 = {
  lastWeek: lastWeekFormat3,
  yesterday: "'учора а' p",
  today: "'сёньня а' p",
  tomorrow: "'заўтра а' p",
  nextWeek: nextWeekFormat3,
  other: "P"
};
var formatRelative19 = function formatRelative20(token, date, baseDate, options) {
  var format = formatRelativeLocale10[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default11 = formatRelative19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/_lib/localize/index.js
var eraValues10 = {
  narrow: ["да н.э.", "н.э."],
  abbreviated: ["да н. э.", "н. э."],
  wide: ["да нашай эры", "нашай эры"]
};
var quarterValues10 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-ы кв.", "2-і кв.", "3-і кв.", "4-ы кв."],
  wide: ["1-ы квартал", "2-і квартал", "3-і квартал", "4-ы квартал"]
};
var monthValues10 = {
  narrow: ["С", "Л", "С", "К", "Т", "Ч", "Л", "Ж", "В", "К", "Л", "С"],
  abbreviated: ["студз.", "лют.", "сак.", "крас.", "трав.", "чэрв.", "ліп.", "жн.", "вер.", "кастр.", "ліст.", "сьнеж."],
  wide: ["студзень", "люты", "сакавік", "красавік", "травень", "чэрвень", "ліпень", "жнівень", "верасень", "кастрычнік", "лістапад", "сьнежань"]
};
var formattingMonthValues2 = {
  narrow: ["С", "Л", "С", "К", "Т", "Ч", "Л", "Ж", "В", "К", "Л", "С"],
  abbreviated: ["студз.", "лют.", "сак.", "крас.", "трав.", "чэрв.", "ліп.", "жн.", "вер.", "кастр.", "ліст.", "сьнеж."],
  wide: ["студзеня", "лютага", "сакавіка", "красавіка", "траўня", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "сьнежня"]
};
var dayValues10 = {
  narrow: ["Н", "П", "А", "С", "Ч", "П", "С"],
  short: ["нд", "пн", "аў", "ср", "чц", "пт", "сб"],
  abbreviated: ["нядз", "пан", "аўт", "сер", "чаць", "пят", "суб"],
  wide: ["нядзеля", "панядзелак", "аўторак", "серада", "чацьвер", "пятніца", "субота"]
};
var dayPeriodValues10 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дзень",
    evening: "веч.",
    night: "ноч"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дзень",
    evening: "веч.",
    night: "ноч"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўнач",
    noon: "поўдзень",
    morning: "раніца",
    afternoon: "дзень",
    evening: "вечар",
    night: "ноч"
  }
};
var formattingDayPeriodValues10 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дня",
    evening: "веч.",
    night: "ночы"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўн.",
    noon: "поўд.",
    morning: "ран.",
    afternoon: "дня",
    evening: "веч.",
    night: "ночы"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "поўнач",
    noon: "поўдзень",
    morning: "раніцы",
    afternoon: "дня",
    evening: "вечара",
    night: "ночы"
  }
};
var ordinalNumber19 = function ordinalNumber20(dirtyNumber, options) {
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  var number = Number(dirtyNumber);
  var suffix;
  if (unit === "date") {
    suffix = "-га";
  } else if (unit === "hour" || unit === "minute" || unit === "second") {
    suffix = "-я";
  } else {
    suffix = (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? "-і" : "-ы";
  }
  return number + suffix;
};
var localize10 = {
  ordinalNumber: ordinalNumber19,
  era: buildLocalizeFn({
    values: eraValues10,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues10,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback10(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues10,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues2,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues10,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues10,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues10,
    defaultFormattingWidth: "wide"
  })
};
var localize_default11 = localize10;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/_lib/match/index.js
var matchOrdinalNumberPattern10 = /^(\d+)(-?(е|я|га|і|ы|ае|ая|яя|шы|гі|ці|ты|мы))?/i;
var parseOrdinalNumberPattern10 = /\d+/i;
var matchEraPatterns10 = {
  narrow: /^((да )?н\.?\s?э\.?)/i,
  abbreviated: /^((да )?н\.?\s?э\.?)/i,
  wide: /^(да нашай эры|нашай эры|наша эра)/i
};
var parseEraPatterns10 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns10 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыі]?)? кв.?/i,
  wide: /^[1234](-?[ыі]?)? квартал/i
};
var parseQuarterPatterns10 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns10 = {
  narrow: /^[слкмчжв]/i,
  abbreviated: /^(студз|лют|сак|крас|тр(ав)?|чэрв|ліп|жн|вер|кастр|ліст|сьнеж)\.?/i,
  wide: /^(студзен[ья]|лют(ы|ага)|сакавіка?|красавіка?|тра(вень|ўня)|чэрвен[ья]|ліпен[ья]|жні(вень|ўня)|верас(ень|ня)|кастрычніка?|лістапада?|сьнеж(ань|ня))/i
};
var parseMonthPatterns10 = {
  narrow: [/^с/i, /^л/i, /^с/i, /^к/i, /^т/i, /^ч/i, /^л/i, /^ж/i, /^в/i, /^к/i, /^л/i, /^с/i],
  any: [/^ст/i, /^лю/i, /^са/i, /^кр/i, /^тр/i, /^ч/i, /^ліп/i, /^ж/i, /^в/i, /^ка/i, /^ліс/i, /^сн/i]
};
var matchDayPatterns10 = {
  narrow: /^[нпасч]/i,
  short: /^(нд|ня|пн|па|аў|ат|ср|се|чц|ча|пт|пя|сб|су)\.?/i,
  abbreviated: /^(нядз?|ндз|пнд|пан|аўт|срд|сер|чцьв|чаць|птн|пят|суб).?/i,
  wide: /^(нядзел[яі]|панядзел(ак|ка)|аўтор(ак|ка)|серад[аы]|чацьв(ер|ярга)|пятніц[аы]|субот[аы])/i
};
var parseDayPatterns10 = {
  narrow: [/^н/i, /^п/i, /^а/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[ан]/i, /^а/i, /^с[ер]/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns10 = {
  narrow: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  abbreviated: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  wide: /^([дп]п|поўнач|поўдзень|раніц[аы]|дзень|дня|вечара?|ночы?)/i
};
var parseDayPeriodPatterns10 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^поўн/i,
    noon: /^поўд/i,
    morning: /^р/i,
    afternoon: /^д[зн]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match10 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern10,
    parsePattern: parseOrdinalNumberPattern10,
    valueCallback: function valueCallback19(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns10,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns10,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns10,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns10,
    defaultParseWidth: "any",
    valueCallback: function valueCallback20(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns10,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns10,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns10,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns10,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns10,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns10,
    defaultParseWidth: "any"
  })
};
var match_default11 = match10;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/be-tarask/index.js
var locale10 = {
  code: "be-tarask",
  formatDistance: formatDistance_default11,
  formatLong: formatLong_default10,
  formatRelative: formatRelative_default11,
  localize: localize_default11,
  match: match_default11,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var be_tarask_default = locale10;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/_lib/formatDistance/index.js
var formatDistanceLocale11 = {
  lessThanXSeconds: {
    one: "по-малко от секунда",
    other: "по-малко от {{count}} секунди"
  },
  xSeconds: {
    one: "1 секунда",
    other: "{{count}} секунди"
  },
  halfAMinute: "половин минута",
  lessThanXMinutes: {
    one: "по-малко от минута",
    other: "по-малко от {{count}} минути"
  },
  xMinutes: {
    one: "1 минута",
    other: "{{count}} минути"
  },
  aboutXHours: {
    one: "около час",
    other: "около {{count}} часа"
  },
  xHours: {
    one: "1 час",
    other: "{{count}} часа"
  },
  xDays: {
    one: "1 ден",
    other: "{{count}} дни"
  },
  aboutXWeeks: {
    one: "около седмица",
    other: "около {{count}} седмици"
  },
  xWeeks: {
    one: "1 седмица",
    other: "{{count}} седмици"
  },
  aboutXMonths: {
    one: "около месец",
    other: "около {{count}} месеца"
  },
  xMonths: {
    one: "1 месец",
    other: "{{count}} месеца"
  },
  aboutXYears: {
    one: "около година",
    other: "около {{count}} години"
  },
  xYears: {
    one: "1 година",
    other: "{{count}} години"
  },
  overXYears: {
    one: "над година",
    other: "над {{count}} години"
  },
  almostXYears: {
    one: "почти година",
    other: "почти {{count}} години"
  }
};
var formatDistance21 = function formatDistance22(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale11[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "след " + result;
    } else {
      return "преди " + result;
    }
  }
  return result;
};
var formatDistance_default12 = formatDistance21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/_lib/formatLong/index.js
var dateFormats11 = {
  full: "EEEE, dd MMMM yyyy",
  long: "dd MMMM yyyy",
  medium: "dd MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats11 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "H:mm"
};
var dateTimeFormats11 = {
  any: "{{date}} {{time}}"
};
var formatLong11 = {
  date: buildFormatLongFn({
    formats: dateFormats11,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats11,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats11,
    defaultWidth: "any"
  })
};
var formatLong_default11 = formatLong11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/_lib/formatRelative/index.js
var weekdays = ["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"];
function lastWeek3(day) {
  var weekday = weekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'миналата " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
    case 5:
      return "'миналия " + weekday + " в' p";
  }
}
function thisWeek3(day) {
  var weekday = weekdays[day];
  if (day === 2) {
    return "'във " + weekday + " в' p";
  } else {
    return "'в " + weekday + " в' p";
  }
}
function nextWeek3(day) {
  var weekday = weekdays[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'следващата " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
    case 5:
      return "'следващия " + weekday + " в' p";
  }
}
var lastWeekFormatToken = function lastWeekFormatToken2(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek3(day);
  } else {
    return lastWeek3(day);
  }
};
var nextWeekFormatToken = function nextWeekFormatToken2(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek3(day);
  } else {
    return nextWeek3(day);
  }
};
var formatRelativeLocale11 = {
  lastWeek: lastWeekFormatToken,
  yesterday: "'вчера в' p",
  today: "'днес в' p",
  tomorrow: "'утре в' p",
  nextWeek: nextWeekFormatToken,
  other: "P"
};
var formatRelative21 = function formatRelative22(token, date, baseDate, options) {
  var format = formatRelativeLocale11[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default12 = formatRelative21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/_lib/localize/index.js
var eraValues11 = {
  narrow: ["пр.н.е.", "н.е."],
  abbreviated: ["преди н. е.", "н. е."],
  wide: ["преди новата ера", "новата ера"]
};
var quarterValues11 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-во тримес.", "2-ро тримес.", "3-то тримес.", "4-то тримес."],
  wide: ["1-во тримесечие", "2-ро тримесечие", "3-то тримесечие", "4-то тримесечие"]
};
var monthValues11 = {
  abbreviated: ["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"],
  wide: ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"]
};
var dayValues11 = {
  narrow: ["Н", "П", "В", "С", "Ч", "П", "С"],
  short: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["нед", "пон", "вто", "сря", "чет", "пет", "съб"],
  wide: ["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"]
};
var dayPeriodValues11 = {
  wide: {
    am: "преди обяд",
    pm: "след обяд",
    midnight: "в полунощ",
    noon: "на обяд",
    morning: "сутринта",
    afternoon: "следобед",
    evening: "вечерта",
    night: "през нощта"
  }
};
function isFeminine(unit) {
  return unit === "year" || unit === "week" || unit === "minute" || unit === "second";
}
function isNeuter(unit) {
  return unit === "quarter";
}
function numberWithSuffix(number, unit, masculine, feminine, neuter) {
  var suffix = isNeuter(unit) ? neuter : isFeminine(unit) ? feminine : masculine;
  return number + "-" + suffix;
}
var ordinalNumber21 = function ordinalNumber22(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (number === 0) {
    return numberWithSuffix(0, unit, "ев", "ева", "ево");
  } else if (number % 1e3 === 0) {
    return numberWithSuffix(number, unit, "ен", "на", "но");
  } else if (number % 100 === 0) {
    return numberWithSuffix(number, unit, "тен", "тна", "тно");
  }
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return numberWithSuffix(number, unit, "ви", "ва", "во");
      case 2:
        return numberWithSuffix(number, unit, "ри", "ра", "ро");
      case 7:
      case 8:
        return numberWithSuffix(number, unit, "ми", "ма", "мо");
    }
  }
  return numberWithSuffix(number, unit, "ти", "та", "то");
};
var localize11 = {
  ordinalNumber: ordinalNumber21,
  era: buildLocalizeFn({
    values: eraValues11,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues11,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback11(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues11,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues11,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues11,
    defaultWidth: "wide"
  })
};
var localize_default12 = localize11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/_lib/match/index.js
var matchOrdinalNumberPattern11 = /^(\d+)(-?[врмт][аи]|-?т?(ен|на)|-?(ев|ева))?/i;
var parseOrdinalNumberPattern11 = /\d+/i;
var matchEraPatterns11 = {
  narrow: /^((пр)?н\.?\s?е\.?)/i,
  abbreviated: /^((пр)?н\.?\s?е\.?)/i,
  wide: /^(преди новата ера|новата ера|нова ера)/i
};
var parseEraPatterns11 = {
  any: [/^п/i, /^н/i]
};
var matchQuarterPatterns11 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[врт]?o?)? тримес.?/i,
  wide: /^[1234](-?[врт]?о?)? тримесечие/i
};
var parseQuarterPatterns11 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchDayPatterns11 = {
  narrow: /^[нпвсч]/i,
  short: /^(нд|пн|вт|ср|чт|пт|сб)/i,
  abbreviated: /^(нед|пон|вто|сря|чет|пет|съб)/i,
  wide: /^(неделя|понеделник|вторник|сряда|четвъртък|петък|събота)/i
};
var parseDayPatterns11 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н[ед]/i, /^п[он]/i, /^вт/i, /^ср/i, /^ч[ет]/i, /^п[ет]/i, /^с[ъб]/i]
};
var matchMonthPatterns11 = {
  abbreviated: /^(яну|фев|мар|апр|май|юни|юли|авг|сеп|окт|ное|дек)/i,
  wide: /^(януари|февруари|март|април|май|юни|юли|август|септември|октомври|ноември|декември)/i
};
var parseMonthPatterns11 = {
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^май/i, /^юн/i, /^юл/i, /^ав/i, /^се/i, /^окт/i, /^но/i, /^де/i]
};
var matchDayPeriodPatterns11 = {
  any: /^(преди о|след о|в по|на о|през|веч|сут|следо)/i
};
var parseDayPeriodPatterns11 = {
  any: {
    am: /^преди о/i,
    pm: /^след о/i,
    midnight: /^в пол/i,
    noon: /^на об/i,
    morning: /^сут/i,
    afternoon: /^следо/i,
    evening: /^веч/i,
    night: /^през н/i
  }
};
var match11 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern11,
    parsePattern: parseOrdinalNumberPattern11,
    valueCallback: function valueCallback21(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns11,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns11,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns11,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns11,
    defaultParseWidth: "any",
    valueCallback: function valueCallback22(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns11,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns11,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns11,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns11,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns11,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns11,
    defaultParseWidth: "any"
  })
};
var match_default12 = match11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bg/index.js
var locale11 = {
  code: "bg",
  formatDistance: formatDistance_default12,
  formatLong: formatLong_default11,
  formatRelative: formatRelative_default12,
  localize: localize_default12,
  match: match_default12,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var bg_default = locale11;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/_lib/localize/index.js
var numberValues = {
  locale: {
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    "0": "০"
  },
  number: {
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
    "০": "0"
  }
};
var eraValues12 = {
  narrow: ["খ্রিঃপূঃ", "খ্রিঃ"],
  abbreviated: ["খ্রিঃপূর্ব", "খ্রিঃ"],
  wide: ["খ্রিস্টপূর্ব", "খ্রিস্টাব্দ"]
};
var quarterValues12 = {
  narrow: ["১", "২", "৩", "৪"],
  abbreviated: ["১ত্রৈ", "২ত্রৈ", "৩ত্রৈ", "৪ত্রৈ"],
  wide: ["১ম ত্রৈমাসিক", "২য় ত্রৈমাসিক", "৩য় ত্রৈমাসিক", "৪র্থ ত্রৈমাসিক"]
};
var monthValues12 = {
  narrow: ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্ট", "অক্টো", "নভে", "ডিসে"],
  abbreviated: ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্ট", "অক্টো", "নভে", "ডিসে"],
  wide: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"]
};
var dayValues12 = {
  narrow: ["র", "সো", "ম", "বু", "বৃ", "শু", "শ"],
  short: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"],
  abbreviated: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"],
  wide: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার ", "শুক্রবার", "শনিবার"]
};
var dayPeriodValues12 = {
  narrow: {
    am: "পূ",
    pm: "অপ",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  },
  abbreviated: {
    am: "পূর্বাহ্ন",
    pm: "অপরাহ্ন",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  },
  wide: {
    am: "পূর্বাহ্ন",
    pm: "অপরাহ্ন",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  }
};
var formattingDayPeriodValues11 = {
  narrow: {
    am: "পূ",
    pm: "অপ",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  },
  abbreviated: {
    am: "পূর্বাহ্ন",
    pm: "অপরাহ্ন",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  },
  wide: {
    am: "পূর্বাহ্ন",
    pm: "অপরাহ্ন",
    midnight: "মধ্যরাত",
    noon: "মধ্যাহ্ন",
    morning: "সকাল",
    afternoon: "বিকাল",
    evening: "সন্ধ্যা",
    night: "রাত"
  }
};
function dateOrdinalNumber(number, localeNumber) {
  if (number > 18 && number <= 31) {
    return localeNumber + "শে";
  } else {
    switch (number) {
      case 1:
        return localeNumber + "লা";
      case 2:
      case 3:
        return localeNumber + "রা";
      case 4:
        return localeNumber + "ঠা";
      default:
        return localeNumber + "ই";
    }
  }
}
var ordinalNumber23 = function ordinalNumber24(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var localeNumber = numberToLocale(number);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (unit === "date") {
    return dateOrdinalNumber(number, localeNumber);
  }
  if (number > 10 || number === 0)
    return localeNumber + "তম";
  var rem10 = number % 10;
  switch (rem10) {
    case 2:
    case 3:
      return localeNumber + "য়";
    case 4:
      return localeNumber + "র্থ";
    case 6:
      return localeNumber + "ষ্ঠ";
    default:
      return localeNumber + "ম";
  }
};
function numberToLocale(enNumber) {
  return enNumber.toString().replace(/\d/g, function(match82) {
    return numberValues.locale[match82];
  });
}
var localize12 = {
  ordinalNumber: ordinalNumber23,
  era: buildLocalizeFn({
    values: eraValues12,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues12,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback12(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues12,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues12,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues12,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues11,
    defaultFormattingWidth: "wide"
  })
};
var localize_default13 = localize12;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/_lib/formatDistance/index.js
var formatDistanceLocale12 = {
  lessThanXSeconds: {
    one: "প্রায় ১ সেকেন্ড",
    other: "প্রায় {{count}} সেকেন্ড"
  },
  xSeconds: {
    one: "১ সেকেন্ড",
    other: "{{count}} সেকেন্ড"
  },
  halfAMinute: "আধ মিনিট",
  lessThanXMinutes: {
    one: "প্রায় ১ মিনিট",
    other: "প্রায় {{count}} মিনিট"
  },
  xMinutes: {
    one: "১ মিনিট",
    other: "{{count}} মিনিট"
  },
  aboutXHours: {
    one: "প্রায় ১ ঘন্টা",
    other: "প্রায় {{count}} ঘন্টা"
  },
  xHours: {
    one: "১ ঘন্টা",
    other: "{{count}} ঘন্টা"
  },
  xDays: {
    one: "১ দিন",
    other: "{{count}} দিন"
  },
  aboutXWeeks: {
    one: "প্রায় ১ সপ্তাহ",
    other: "প্রায় {{count}} সপ্তাহ"
  },
  xWeeks: {
    one: "১ সপ্তাহ",
    other: "{{count}} সপ্তাহ"
  },
  aboutXMonths: {
    one: "প্রায় ১ মাস",
    other: "প্রায় {{count}} মাস"
  },
  xMonths: {
    one: "১ মাস",
    other: "{{count}} মাস"
  },
  aboutXYears: {
    one: "প্রায় ১ বছর",
    other: "প্রায় {{count}} বছর"
  },
  xYears: {
    one: "১ বছর",
    other: "{{count}} বছর"
  },
  overXYears: {
    one: "১ বছরের বেশি",
    other: "{{count}} বছরের বেশি"
  },
  almostXYears: {
    one: "প্রায় ১ বছর",
    other: "প্রায় {{count}} বছর"
  }
};
var formatDistance23 = function formatDistance24(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale12[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", numberToLocale(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " এর মধ্যে";
    } else {
      return result + " আগে";
    }
  }
  return result;
};
var formatDistance_default13 = formatDistance23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/_lib/formatLong/index.js
var dateFormats12 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats12 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats12 = {
  full: "{{date}} {{time}} 'সময়'",
  long: "{{date}} {{time}} 'সময়'",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong12 = {
  date: buildFormatLongFn({
    formats: dateFormats12,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats12,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats12,
    defaultWidth: "full"
  })
};
var formatLong_default12 = formatLong12;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/_lib/formatRelative/index.js
var formatRelativeLocale12 = {
  lastWeek: "'গত' eeee 'সময়' p",
  yesterday: "'গতকাল' 'সময়' p",
  today: "'আজ' 'সময়' p",
  tomorrow: "'আগামীকাল' 'সময়' p",
  nextWeek: "eeee 'সময়' p",
  other: "P"
};
var formatRelative23 = function formatRelative24(token, _date, _baseDate, _options) {
  return formatRelativeLocale12[token];
};
var formatRelative_default13 = formatRelative23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/_lib/match/index.js
var matchOrdinalNumberPattern12 = /^(\d+)(ম|য়|র্থ|ষ্ঠ|শে|ই|তম)?/i;
var parseOrdinalNumberPattern12 = /\d+/i;
var matchEraPatterns12 = {
  narrow: /^(খ্রিঃপূঃ|খ্রিঃ)/i,
  abbreviated: /^(খ্রিঃপূর্ব|খ্রিঃ)/i,
  wide: /^(খ্রিস্টপূর্ব|খ্রিস্টাব্দ)/i
};
var parseEraPatterns12 = {
  narrow: [/^খ্রিঃপূঃ/i, /^খ্রিঃ/i],
  abbreviated: [/^খ্রিঃপূর্ব/i, /^খ্রিঃ/i],
  wide: [/^খ্রিস্টপূর্ব/i, /^খ্রিস্টাব্দ/i]
};
var matchQuarterPatterns12 = {
  narrow: /^[১২৩৪]/i,
  abbreviated: /^[১২৩৪]ত্রৈ/i,
  wide: /^[১২৩৪](ম|য়|র্থ)? ত্রৈমাসিক/i
};
var parseQuarterPatterns12 = {
  any: [/১/i, /২/i, /৩/i, /৪/i]
};
var matchMonthPatterns12 = {
  narrow: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
  abbreviated: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
  wide: /^(জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)/i
};
var parseMonthPatterns12 = {
  any: [/^জানু/i, /^ফেব্রু/i, /^মার্চ/i, /^এপ্রিল/i, /^মে/i, /^জুন/i, /^জুলাই/i, /^আগস্ট/i, /^সেপ্ট/i, /^অক্টো/i, /^নভে/i, /^ডিসে/i]
};
var matchDayPatterns12 = {
  narrow: /^(র|সো|ম|বু|বৃ|শু|শ)+/i,
  short: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
  abbreviated: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
  wide: /^(রবিবার|সোমবার|মঙ্গলবার|বুধবার|বৃহস্পতিবার |শুক্রবার|শনিবার)+/i
};
var parseDayPatterns12 = {
  narrow: [/^র/i, /^সো/i, /^ম/i, /^বু/i, /^বৃ/i, /^শু/i, /^শ/i],
  short: [/^রবি/i, /^সোম/i, /^মঙ্গল/i, /^বুধ/i, /^বৃহ/i, /^শুক্র/i, /^শনি/i],
  abbreviated: [/^রবি/i, /^সোম/i, /^মঙ্গল/i, /^বুধ/i, /^বৃহ/i, /^শুক্র/i, /^শনি/i],
  wide: [/^রবিবার/i, /^সোমবার/i, /^মঙ্গলবার/i, /^বুধবার/i, /^বৃহস্পতিবার /i, /^শুক্রবার/i, /^শনিবার/i]
};
var matchDayPeriodPatterns12 = {
  narrow: /^(পূ|অপ|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
  abbreviated: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
  wide: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i
};
var parseDayPeriodPatterns12 = {
  any: {
    am: /^পূ/i,
    pm: /^অপ/i,
    midnight: /^মধ্যরাত/i,
    noon: /^মধ্যাহ্ন/i,
    morning: /সকাল/i,
    afternoon: /বিকাল/i,
    evening: /সন্ধ্যা/i,
    night: /রাত/i
  }
};
var match12 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern12,
    parsePattern: parseOrdinalNumberPattern12,
    valueCallback: function valueCallback23(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns12,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns12,
    defaultParseWidth: "wide"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns12,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns12,
    defaultParseWidth: "any",
    valueCallback: function valueCallback24(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns12,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns12,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns12,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns12,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns12,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns12,
    defaultParseWidth: "any"
  })
};
var match_default13 = match12;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bn/index.js
var locale12 = {
  code: "bn",
  formatDistance: formatDistance_default13,
  formatLong: formatLong_default12,
  formatRelative: formatRelative_default13,
  localize: localize_default13,
  match: match_default13,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var bn_default = locale12;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/_lib/formatDistance/index.js
var formatDistanceLocale13 = {
  lessThanXSeconds: {
    one: {
      standalone: "manje od 1 sekunde",
      withPrepositionAgo: "manje od 1 sekunde",
      withPrepositionIn: "manje od 1 sekundu"
    },
    dual: "manje od {{count}} sekunde",
    other: "manje od {{count}} sekundi"
  },
  xSeconds: {
    one: {
      standalone: "1 sekunda",
      withPrepositionAgo: "1 sekunde",
      withPrepositionIn: "1 sekundu"
    },
    dual: "{{count}} sekunde",
    other: "{{count}} sekundi"
  },
  halfAMinute: "pola minute",
  lessThanXMinutes: {
    one: {
      standalone: "manje od 1 minute",
      withPrepositionAgo: "manje od 1 minute",
      withPrepositionIn: "manje od 1 minutu"
    },
    dual: "manje od {{count}} minute",
    other: "manje od {{count}} minuta"
  },
  xMinutes: {
    one: {
      standalone: "1 minuta",
      withPrepositionAgo: "1 minute",
      withPrepositionIn: "1 minutu"
    },
    dual: "{{count}} minute",
    other: "{{count}} minuta"
  },
  aboutXHours: {
    one: {
      standalone: "oko 1 sat",
      withPrepositionAgo: "oko 1 sat",
      withPrepositionIn: "oko 1 sat"
    },
    dual: "oko {{count}} sata",
    other: "oko {{count}} sati"
  },
  xHours: {
    one: {
      standalone: "1 sat",
      withPrepositionAgo: "1 sat",
      withPrepositionIn: "1 sat"
    },
    dual: "{{count}} sata",
    other: "{{count}} sati"
  },
  xDays: {
    one: {
      standalone: "1 dan",
      withPrepositionAgo: "1 dan",
      withPrepositionIn: "1 dan"
    },
    dual: "{{count}} dana",
    other: "{{count}} dana"
  },
  aboutXWeeks: {
    one: {
      standalone: "oko 1 sedmicu",
      withPrepositionAgo: "oko 1 sedmicu",
      withPrepositionIn: "oko 1 sedmicu"
    },
    dual: "oko {{count}} sedmice",
    other: "oko {{count}} sedmice"
  },
  xWeeks: {
    one: {
      standalone: "1 sedmicu",
      withPrepositionAgo: "1 sedmicu",
      withPrepositionIn: "1 sedmicu"
    },
    dual: "{{count}} sedmice",
    other: "{{count}} sedmice"
  },
  aboutXMonths: {
    one: {
      standalone: "oko 1 mjesec",
      withPrepositionAgo: "oko 1 mjesec",
      withPrepositionIn: "oko 1 mjesec"
    },
    dual: "oko {{count}} mjeseca",
    other: "oko {{count}} mjeseci"
  },
  xMonths: {
    one: {
      standalone: "1 mjesec",
      withPrepositionAgo: "1 mjesec",
      withPrepositionIn: "1 mjesec"
    },
    dual: "{{count}} mjeseca",
    other: "{{count}} mjeseci"
  },
  aboutXYears: {
    one: {
      standalone: "oko 1 godinu",
      withPrepositionAgo: "oko 1 godinu",
      withPrepositionIn: "oko 1 godinu"
    },
    dual: "oko {{count}} godine",
    other: "oko {{count}} godina"
  },
  xYears: {
    one: {
      standalone: "1 godina",
      withPrepositionAgo: "1 godine",
      withPrepositionIn: "1 godinu"
    },
    dual: "{{count}} godine",
    other: "{{count}} godina"
  },
  overXYears: {
    one: {
      standalone: "preko 1 godinu",
      withPrepositionAgo: "preko 1 godinu",
      withPrepositionIn: "preko 1 godinu"
    },
    dual: "preko {{count}} godine",
    other: "preko {{count}} godina"
  },
  almostXYears: {
    one: {
      standalone: "gotovo 1 godinu",
      withPrepositionAgo: "gotovo 1 godinu",
      withPrepositionIn: "gotovo 1 godinu"
    },
    dual: "gotovo {{count}} godine",
    other: "gotovo {{count}} godina"
  }
};
var formatDistance25 = function formatDistance26(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale13[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        result = tokenValue.one.withPrepositionIn;
      } else {
        result = tokenValue.one.withPrepositionAgo;
      }
    } else {
      result = tokenValue.one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== "1") {
    result = tokenValue.dual.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "za " + result;
    } else {
      return "prije " + result;
    }
  }
  return result;
};
var formatDistance_default14 = formatDistance25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/_lib/formatLong/index.js
var dateFormats13 = {
  full: "EEEE, d. MMMM yyyy.",
  long: "d. MMMM yyyy.",
  medium: "d. MMM yy.",
  short: "dd. MM. yy."
};
var timeFormats13 = {
  full: "HH:mm:ss (zzzz)",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats13 = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong13 = {
  date: buildFormatLongFn({
    formats: dateFormats13,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats13,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats13,
    defaultWidth: "full"
  })
};
var formatLong_default13 = formatLong13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/_lib/formatRelative/index.js
var formatRelativeLocale13 = {
  lastWeek: function lastWeek4(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'prošle nedjelje u' p";
      case 3:
        return "'prošle srijede u' p";
      case 6:
        return "'prošle subote u' p";
      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'juče u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function nextWeek4(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'sljedeće nedjelje u' p";
      case 3:
        return "'sljedeću srijedu u' p";
      case 6:
        return "'sljedeću subotu u' p";
      default:
        return "'sljedeći' EEEE 'u' p";
    }
  },
  other: "P"
};
var formatRelative25 = function formatRelative26(token, date, _baseDate, _options) {
  var format = formatRelativeLocale13[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default14 = formatRelative25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/_lib/localize/index.js
var eraValues13 = {
  narrow: ["pr.n.e.", "AD"],
  abbreviated: ["pr. Hr.", "po. Hr."],
  wide: ["Prije Hrista", "Poslije Hrista"]
};
var quarterValues13 = {
  narrow: ["1.", "2.", "3.", "4."],
  abbreviated: ["1. kv.", "2. kv.", "3. kv.", "4. kv."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues13 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
  wide: ["januar", "februar", "mart", "april", "maj", "juni", "juli", "avgust", "septembar", "oktobar", "novembar", "decembar"]
};
var formattingMonthValues3 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
  wide: ["januar", "februar", "mart", "april", "maj", "juni", "juli", "avgust", "septembar", "oktobar", "novembar", "decembar"]
};
var dayValues13 = {
  narrow: ["N", "P", "U", "S", "Č", "P", "S"],
  short: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
  abbreviated: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
  wide: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"]
};
var dayPeriodValues13 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "poslije podne",
    evening: "uveče",
    night: "noću"
  }
};
var formattingDayPeriodValues12 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "poslije podne",
    evening: "uveče",
    night: "noću"
  }
};
var ordinalNumber25 = function ordinalNumber26(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return String(number) + ".";
};
var localize13 = {
  ordinalNumber: ordinalNumber25,
  era: buildLocalizeFn({
    values: eraValues13,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues13,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback13(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues13,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues3,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues13,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues13,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues12,
    defaultFormattingWidth: "wide"
  })
};
var localize_default14 = localize13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/_lib/match/index.js
var matchOrdinalNumberPattern13 = /^(\d+)\./i;
var parseOrdinalNumberPattern13 = /\d+/i;
var matchEraPatterns13 = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Hr\.|po\.\s?Hr\.)/i,
  wide: /^(Prije Hrista|prije nove ere|Poslije Hrista|nova era)/i
};
var parseEraPatterns13 = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns13 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns13 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns13 = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|avg|sep|okt|nov|dec)/i,
  wide: /^((januar|januara)|(februar|februara)|(mart|marta)|(april|aprila)|(maj|maja)|(juni|juna)|(juli|jula)|(avgust|avgusta)|(septembar|septembra)|(oktobar|oktobra)|(novembar|novembra)|(decembar|decembra))/i
};
var parseMonthPatterns13 = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^avg/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns13 = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns13 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns13 = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|uvece|uveče|noću|poslije podne|ujutru)/i
};
var parseDayPeriodPatterns13 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(poslije\s|po)+podne/i,
    evening: /(uvece|uveče)/i,
    night: /(nocu|noću)/i
  }
};
var match13 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern13,
    parsePattern: parseOrdinalNumberPattern13,
    valueCallback: function valueCallback25(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns13,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns13,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns13,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns13,
    defaultParseWidth: "any",
    valueCallback: function valueCallback26(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns13,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns13,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns13,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns13,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns13,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns13,
    defaultParseWidth: "any"
  })
};
var match_default14 = match13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/bs/index.js
var locale13 = {
  code: "bs",
  formatDistance: formatDistance_default14,
  formatLong: formatLong_default13,
  formatRelative: formatRelative_default14,
  localize: localize_default14,
  match: match_default14,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var bs_default = locale13;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/_lib/formatDistance/index.js
var formatDistanceLocale14 = {
  lessThanXSeconds: {
    one: "menys d'un segon",
    eleven: "menys d'onze segons",
    other: "menys de {{count}} segons"
  },
  xSeconds: {
    one: "1 segon",
    other: "{{count}} segons"
  },
  halfAMinute: "mig minut",
  lessThanXMinutes: {
    one: "menys d'un minut",
    eleven: "menys d'onze minuts",
    other: "menys de {{count}} minuts"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minuts"
  },
  aboutXHours: {
    one: "aproximadament una hora",
    other: "aproximadament {{count}} hores"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} hores"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dies"
  },
  aboutXWeeks: {
    one: "aproximadament una setmana",
    other: "aproximadament {{count}} setmanes"
  },
  xWeeks: {
    one: "1 setmana",
    other: "{{count}} setmanes"
  },
  aboutXMonths: {
    one: "aproximadament un mes",
    other: "aproximadament {{count}} mesos"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} mesos"
  },
  aboutXYears: {
    one: "aproximadament un any",
    other: "aproximadament {{count}} anys"
  },
  xYears: {
    one: "1 any",
    other: "{{count}} anys"
  },
  overXYears: {
    one: "més d'un any",
    eleven: "més d'onze anys",
    other: "més de {{count}} anys"
  },
  almostXYears: {
    one: "gairebé un any",
    other: "gairebé {{count}} anys"
  }
};
var formatDistance27 = function formatDistance28(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale14[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 11 && tokenValue.eleven) {
    result = tokenValue.eleven;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "fa " + result;
    }
  }
  return result;
};
var formatDistance_default15 = formatDistance27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/_lib/formatLong/index.js
var dateFormats14 = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats14 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats14 = {
  full: "{{date}} 'a les' {{time}}",
  long: "{{date}} 'a les' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong14 = {
  date: buildFormatLongFn({
    formats: dateFormats14,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats14,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats14,
    defaultWidth: "full"
  })
};
var formatLong_default14 = formatLong14;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/_lib/formatRelative/index.js
var formatRelativeLocale14 = {
  lastWeek: "'el' eeee 'passat a la' LT",
  yesterday: "'ahir a la' p",
  today: "'avui a la' p",
  tomorrow: "'demà a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
};
var formatRelativeLocalePlural = {
  lastWeek: "'el' eeee 'passat a les' p",
  yesterday: "'ahir a les' p",
  today: "'avui a les' p",
  tomorrow: "'demà a les' p",
  nextWeek: "eeee 'a les' p",
  other: "P"
};
var formatRelative27 = function formatRelative28(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural[token];
  }
  return formatRelativeLocale14[token];
};
var formatRelative_default15 = formatRelative27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/_lib/localize/index.js
var eraValues14 = {
  narrow: ["aC", "dC"],
  abbreviated: ["a. de C.", "d. de C."],
  wide: ["abans de Crist", "després de Crist"]
};
var quarterValues14 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1r trimestre", "2n trimestre", "3r trimestre", "4t trimestre"]
};
var monthValues14 = {
  narrow: ["GN", "FB", "MÇ", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS"],
  /**
   * Les abreviatures dels mesos de l'any es formen seguint una de les normes generals de formació d'abreviatures.
   * S'escriu la primera síl·laba i les consonants de la síl·laba següent anteriors a la primera vocal.
   * Els mesos de març, maig i juny no s'abreugen perquè són paraules d'una sola síl·laba.
   */
  abbreviated: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."],
  wide: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"]
};
var dayValues14 = {
  narrow: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  short: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  abbreviated: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  wide: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"]
};
var dayPeriodValues14 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  }
};
var formattingDayPeriodValues13 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  }
};
var ordinalNumber27 = function ordinalNumber28(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "r";
      case 2:
        return number + "n";
      case 3:
        return number + "r";
      case 4:
        return number + "t";
    }
  }
  return number + "è";
};
var localize14 = {
  ordinalNumber: ordinalNumber27,
  era: buildLocalizeFn({
    values: eraValues14,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues14,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback14(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues14,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues14,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues14,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues13,
    defaultFormattingWidth: "wide"
  })
};
var localize_default15 = localize14;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/_lib/match/index.js
var matchOrdinalNumberPattern14 = /^(\d+)(è|r|n|r|t)?/i;
var parseOrdinalNumberPattern14 = /\d+/i;
var matchEraPatterns14 = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a. de C.|d. de C.)/i,
  wide: /^(abans de Crist|despr[eé]s de Crist)/i
};
var parseEraPatterns14 = {
  narrow: [/^aC/i, /^dC/i],
  abbreviated: [/^(a. de C.)/i, /^(d. de C.)/i],
  wide: [/^(abans de Crist)/i, /^(despr[eé]s de Crist)/i]
};
var matchQuarterPatterns14 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](è|r|n|r|t)? trimestre/i
};
var parseQuarterPatterns14 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns14 = {
  narrow: /^(GN|FB|MÇ|AB|MG|JN|JL|AG|ST|OC|NV|DS)/i,
  abbreviated: /^(gen.|febr.|març|abr.|maig|juny|jul.|ag.|set.|oct.|nov.|des.)/i,
  wide: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i
};
var parseMonthPatterns14 = {
  narrow: [/^GN/i, /^FB/i, /^MÇ/i, /^AB/i, /^MG/i, /^JN/i, /^JL/i, /^AG/i, /^ST/i, /^OC/i, /^NV/i, /^DS/i],
  abbreviated: [/^gen./i, /^febr./i, /^març/i, /^abr./i, /^maig/i, /^juny/i, /^jul./i, /^ag./i, /^set./i, /^oct./i, /^nov./i, /^des./i],
  wide: [/^gener/i, /^febrer/i, /^març/i, /^abril/i, /^maig/i, /^juny/i, /^juliol/i, /^agost/i, /^setembre/i, /^octubre/i, /^novembre/i, /^desembre/i]
};
var matchDayPatterns14 = {
  narrow: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  short: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  abbreviated: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  wide: /^(diumenge|dilluns|dimarts|dimecres|dijous|divendres|dissabte)/i
};
var parseDayPatterns14 = {
  narrow: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  abbreviated: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  wide: [/^diumenge/i, /^dilluns/i, /^dimarts/i, /^dimecres/i, /^dijous/i, /^divendres/i, /^disssabte/i]
};
var matchDayPeriodPatterns14 = {
  narrow: /^(a|p|mn|md|(del|de la) (matí|tarda|vespre|nit))/i,
  abbreviated: /^([ap]\.?\s?m\.?|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i,
  wide: /^(ante meridiem|post meridiem|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i
};
var parseDayPeriodPatterns14 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mitjanit/i,
    noon: /^migdia/i,
    morning: /matí/i,
    afternoon: /tarda/i,
    evening: /vespre/i,
    night: /nit/i
  }
};
var match14 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern14,
    parsePattern: parseOrdinalNumberPattern14,
    valueCallback: function valueCallback27(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns14,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns14,
    defaultParseWidth: "wide"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns14,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns14,
    defaultParseWidth: "any",
    valueCallback: function valueCallback28(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns14,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns14,
    defaultParseWidth: "wide"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns14,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns14,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns14,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns14,
    defaultParseWidth: "any"
  })
};
var match_default15 = match14;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ca/index.js
var locale14 = {
  code: "ca",
  formatDistance: formatDistance_default15,
  formatLong: formatLong_default14,
  formatRelative: formatRelative_default15,
  localize: localize_default15,
  match: match_default15,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var ca_default = locale14;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/_lib/formatDistance/index.js
var formatDistanceLocale15 = {
  lessThanXSeconds: {
    one: {
      regular: "méně než sekunda",
      past: "před méně než sekundou",
      future: "za méně než sekundu"
    },
    few: {
      regular: "méně než {{count}} sekundy",
      past: "před méně než {{count}} sekundami",
      future: "za méně než {{count}} sekundy"
    },
    many: {
      regular: "méně než {{count}} sekund",
      past: "před méně než {{count}} sekundami",
      future: "za méně než {{count}} sekund"
    }
  },
  xSeconds: {
    one: {
      regular: "sekunda",
      past: "před sekundou",
      future: "za sekundu"
    },
    few: {
      regular: "{{count}} sekundy",
      past: "před {{count}} sekundami",
      future: "za {{count}} sekundy"
    },
    many: {
      regular: "{{count}} sekund",
      past: "před {{count}} sekundami",
      future: "za {{count}} sekund"
    }
  },
  halfAMinute: {
    type: "other",
    other: {
      regular: "půl minuty",
      past: "před půl minutou",
      future: "za půl minuty"
    }
  },
  lessThanXMinutes: {
    one: {
      regular: "méně než minuta",
      past: "před méně než minutou",
      future: "za méně než minutu"
    },
    few: {
      regular: "méně než {{count}} minuty",
      past: "před méně než {{count}} minutami",
      future: "za méně než {{count}} minuty"
    },
    many: {
      regular: "méně než {{count}} minut",
      past: "před méně než {{count}} minutami",
      future: "za méně než {{count}} minut"
    }
  },
  xMinutes: {
    one: {
      regular: "minuta",
      past: "před minutou",
      future: "za minutu"
    },
    few: {
      regular: "{{count}} minuty",
      past: "před {{count}} minutami",
      future: "za {{count}} minuty"
    },
    many: {
      regular: "{{count}} minut",
      past: "před {{count}} minutami",
      future: "za {{count}} minut"
    }
  },
  aboutXHours: {
    one: {
      regular: "přibližně hodina",
      past: "přibližně před hodinou",
      future: "přibližně za hodinu"
    },
    few: {
      regular: "přibližně {{count}} hodiny",
      past: "přibližně před {{count}} hodinami",
      future: "přibližně za {{count}} hodiny"
    },
    many: {
      regular: "přibližně {{count}} hodin",
      past: "přibližně před {{count}} hodinami",
      future: "přibližně za {{count}} hodin"
    }
  },
  xHours: {
    one: {
      regular: "hodina",
      past: "před hodinou",
      future: "za hodinu"
    },
    few: {
      regular: "{{count}} hodiny",
      past: "před {{count}} hodinami",
      future: "za {{count}} hodiny"
    },
    many: {
      regular: "{{count}} hodin",
      past: "před {{count}} hodinami",
      future: "za {{count}} hodin"
    }
  },
  xDays: {
    one: {
      regular: "den",
      past: "před dnem",
      future: "za den"
    },
    few: {
      regular: "{{count}} dny",
      past: "před {{count}} dny",
      future: "za {{count}} dny"
    },
    many: {
      regular: "{{count}} dní",
      past: "před {{count}} dny",
      future: "za {{count}} dní"
    }
  },
  aboutXWeeks: {
    one: {
      regular: "přibližně týden",
      past: "přibližně před týdnem",
      future: "přibližně za týden"
    },
    few: {
      regular: "přibližně {{count}} týdny",
      past: "přibližně před {{count}} týdny",
      future: "přibližně za {{count}} týdny"
    },
    many: {
      regular: "přibližně {{count}} týdnů",
      past: "přibližně před {{count}} týdny",
      future: "přibližně za {{count}} týdnů"
    }
  },
  xWeeks: {
    one: {
      regular: "týden",
      past: "před týdnem",
      future: "za týden"
    },
    few: {
      regular: "{{count}} týdny",
      past: "před {{count}} týdny",
      future: "za {{count}} týdny"
    },
    many: {
      regular: "{{count}} týdnů",
      past: "před {{count}} týdny",
      future: "za {{count}} týdnů"
    }
  },
  aboutXMonths: {
    one: {
      regular: "přibližně měsíc",
      past: "přibližně před měsícem",
      future: "přibližně za měsíc"
    },
    few: {
      regular: "přibližně {{count}} měsíce",
      past: "přibližně před {{count}} měsíci",
      future: "přibližně za {{count}} měsíce"
    },
    many: {
      regular: "přibližně {{count}} měsíců",
      past: "přibližně před {{count}} měsíci",
      future: "přibližně za {{count}} měsíců"
    }
  },
  xMonths: {
    one: {
      regular: "měsíc",
      past: "před měsícem",
      future: "za měsíc"
    },
    few: {
      regular: "{{count}} měsíce",
      past: "před {{count}} měsíci",
      future: "za {{count}} měsíce"
    },
    many: {
      regular: "{{count}} měsíců",
      past: "před {{count}} měsíci",
      future: "za {{count}} měsíců"
    }
  },
  aboutXYears: {
    one: {
      regular: "přibližně rok",
      past: "přibližně před rokem",
      future: "přibližně za rok"
    },
    few: {
      regular: "přibližně {{count}} roky",
      past: "přibližně před {{count}} roky",
      future: "přibližně za {{count}} roky"
    },
    many: {
      regular: "přibližně {{count}} roků",
      past: "přibližně před {{count}} roky",
      future: "přibližně za {{count}} roků"
    }
  },
  xYears: {
    one: {
      regular: "rok",
      past: "před rokem",
      future: "za rok"
    },
    few: {
      regular: "{{count}} roky",
      past: "před {{count}} roky",
      future: "za {{count}} roky"
    },
    many: {
      regular: "{{count}} roků",
      past: "před {{count}} roky",
      future: "za {{count}} roků"
    }
  },
  overXYears: {
    one: {
      regular: "více než rok",
      past: "před více než rokem",
      future: "za více než rok"
    },
    few: {
      regular: "více než {{count}} roky",
      past: "před více než {{count}} roky",
      future: "za více než {{count}} roky"
    },
    many: {
      regular: "více než {{count}} roků",
      past: "před více než {{count}} roky",
      future: "za více než {{count}} roků"
    }
  },
  almostXYears: {
    one: {
      regular: "skoro rok",
      past: "skoro před rokem",
      future: "skoro za rok"
    },
    few: {
      regular: "skoro {{count}} roky",
      past: "skoro před {{count}} roky",
      future: "skoro za {{count}} roky"
    },
    many: {
      regular: "skoro {{count}} roků",
      past: "skoro před {{count}} roky",
      future: "skoro za {{count}} roků"
    }
  }
};
var formatDistance29 = function formatDistance30(token, count, options) {
  var pluralResult;
  var tokenValue = formatDistanceLocale15[token];
  if (tokenValue.type === "other") {
    pluralResult = tokenValue.other;
  } else if (count === 1) {
    pluralResult = tokenValue.one;
  } else if (count > 1 && count < 5) {
    pluralResult = tokenValue.few;
  } else {
    pluralResult = tokenValue.many;
  }
  var suffixExist = (options === null || options === void 0 ? void 0 : options.addSuffix) === true;
  var comparison = options === null || options === void 0 ? void 0 : options.comparison;
  var timeResult;
  if (suffixExist && comparison === -1) {
    timeResult = pluralResult.past;
  } else if (suffixExist && comparison === 1) {
    timeResult = pluralResult.future;
  } else {
    timeResult = pluralResult.regular;
  }
  return timeResult.replace("{{count}}", String(count));
};
var formatDistance_default16 = formatDistance29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/_lib/formatLong/index.js
var dateFormats15 = {
  full: "EEEE, d. MMMM yyyy",
  long: "d. MMMM yyyy",
  medium: "d. M. yyyy",
  short: "dd.MM.yyyy"
};
var timeFormats15 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats15 = {
  full: "{{date}} 'v' {{time}}",
  long: "{{date}} 'v' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong15 = {
  date: buildFormatLongFn({
    formats: dateFormats15,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats15,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats15,
    defaultWidth: "full"
  })
};
var formatLong_default15 = formatLong15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/_lib/formatRelative/index.js
var accusativeWeekdays3 = ["neděli", "pondělí", "úterý", "středu", "čtvrtek", "pátek", "sobotu"];
var formatRelativeLocale15 = {
  lastWeek: "'poslední' eeee 've' p",
  yesterday: "'včera v' p",
  today: "'dnes v' p",
  tomorrow: "'zítra v' p",
  nextWeek: function nextWeek5(date) {
    var day = date.getUTCDay();
    return "'v " + accusativeWeekdays3[day] + " o' p";
  },
  other: "P"
};
var formatRelative29 = function formatRelative30(token, date) {
  var format = formatRelativeLocale15[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default16 = formatRelative29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/_lib/localize/index.js
var eraValues15 = {
  narrow: ["př. n. l.", "n. l."],
  abbreviated: ["př. n. l.", "n. l."],
  wide: ["před naším letopočtem", "našeho letopočtu"]
};
var quarterValues15 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"],
  wide: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"]
};
var monthValues15 = {
  narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
  abbreviated: ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"],
  wide: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
};
var formattingMonthValues4 = {
  narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
  abbreviated: ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"],
  wide: ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
};
var dayValues15 = {
  narrow: ["ne", "po", "út", "st", "čt", "pá", "so"],
  short: ["ne", "po", "út", "st", "čt", "pá", "so"],
  abbreviated: ["ned", "pon", "úte", "stř", "čtv", "pát", "sob"],
  wide: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"]
};
var dayPeriodValues15 = {
  narrow: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  abbreviated: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "dopoledne",
    pm: "odpoledne",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  }
};
var formattingDayPeriodValues14 = {
  narrow: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  abbreviated: {
    am: "dop.",
    pm: "odp.",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "dopoledne",
    pm: "odpoledne",
    midnight: "půlnoc",
    noon: "poledne",
    morning: "ráno",
    afternoon: "odpoledne",
    evening: "večer",
    night: "noc"
  }
};
var ordinalNumber29 = function ordinalNumber30(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize15 = {
  ordinalNumber: ordinalNumber29,
  era: buildLocalizeFn({
    values: eraValues15,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues15,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback15(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues15,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues4,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues15,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues15,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues14,
    defaultFormattingWidth: "wide"
  })
};
var localize_default16 = localize15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/_lib/match/index.js
var matchOrdinalNumberPattern15 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern15 = /\d+/i;
var matchEraPatterns15 = {
  narrow: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(p[řr](\.|ed) Kristem|p[řr](\.|ed) na[šs][íi]m letopo[čc]tem|po Kristu|na[šs]eho letopo[čc]tu)/i
};
var parseEraPatterns15 = {
  any: [/^p[řr]/i, /^(po|n)/i]
};
var matchQuarterPatterns15 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\. [čc]tvrtlet[íi]/i,
  wide: /^[1234]\. [čc]tvrtlet[íi]/i
};
var parseQuarterPatterns15 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns15 = {
  narrow: /^[lúubdkčcszřrlp]/i,
  abbreviated: /^(led|[úu]no|b[řr]e|dub|kv[ěe]|[čc]vn|[čc]vc|srp|z[áa][řr]|[řr][íi]j|lis|pro)/i,
  wide: /^(leden|ledna|[úu]nora?|b[řr]ezen|b[řr]ezna|duben|dubna|kv[ěe]ten|kv[ěe]tna|[čc]erven(ec|ce)?|[čc]ervna|srpen|srpna|z[áa][řr][íi]|[řr][íi]jen|[řr][íi]jna|listopad(a|u)?|prosinec|prosince)/i
};
var parseMonthPatterns15 = {
  narrow: [/^l/i, /^[úu]/i, /^b/i, /^d/i, /^k/i, /^[čc]/i, /^[čc]/i, /^s/i, /^z/i, /^[řr]/i, /^l/i, /^p/i],
  any: [/^led/i, /^[úu]n/i, /^b[řr]e/i, /^dub/i, /^kv[ěe]/i, /^[čc]vn|[čc]erven(?!\w)|[čc]ervna/i, /^[čc]vc|[čc]erven(ec|ce)/i, /^srp/i, /^z[áa][řr]/i, /^[řr][íi]j/i, /^lis/i, /^pro/i]
};
var matchDayPatterns15 = {
  narrow: /^[npuúsčps]/i,
  short: /^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,
  abbreviated: /^(ned|pon|[úu]te|st[rř]|[čc]tv|p[áa]t|sob)/i,
  wide: /^(ned[ěe]le|pond[ěe]l[íi]|[úu]ter[ýy]|st[řr]eda|[čc]tvrtek|p[áa]tek|sobota)/i
};
var parseDayPatterns15 = {
  narrow: [/^n/i, /^p/i, /^[úu]/i, /^s/i, /^[čc]/i, /^p/i, /^s/i],
  any: [/^ne/i, /^po/i, /^[úu]t/i, /^st/i, /^[čc]t/i, /^p[áa]/i, /^so/i]
};
var matchDayPeriodPatterns15 = {
  any: /^dopoledne|dop\.?|odpoledne|odp\.?|p[ůu]lnoc|poledne|r[áa]no|odpoledne|ve[čc]er|(v )?noci?/i
};
var parseDayPeriodPatterns15 = {
  any: {
    am: /^dop/i,
    pm: /^odp/i,
    midnight: /^p[ůu]lnoc/i,
    noon: /^poledne/i,
    morning: /r[áa]no/i,
    afternoon: /odpoledne/i,
    evening: /ve[čc]er/i,
    night: /noc/i
  }
};
var match15 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern15,
    parsePattern: parseOrdinalNumberPattern15,
    valueCallback: function valueCallback29(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns15,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns15,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns15,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns15,
    defaultParseWidth: "any",
    valueCallback: function valueCallback30(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns15,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns15,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns15,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns15,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns15,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns15,
    defaultParseWidth: "any"
  })
};
var match_default16 = match15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cs/index.js
var locale15 = {
  code: "cs",
  formatDistance: formatDistance_default16,
  formatLong: formatLong_default15,
  formatRelative: formatRelative_default16,
  localize: localize_default16,
  match: match_default16,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var cs_default = locale15;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/_lib/formatDistance/index.js
var formatDistanceLocale16 = {
  lessThanXSeconds: {
    one: "llai na eiliad",
    other: "llai na {{count}} eiliad"
  },
  xSeconds: {
    one: "1 eiliad",
    other: "{{count}} eiliad"
  },
  halfAMinute: "hanner munud",
  lessThanXMinutes: {
    one: "llai na munud",
    two: "llai na 2 funud",
    other: "llai na {{count}} munud"
  },
  xMinutes: {
    one: "1 munud",
    two: "2 funud",
    other: "{{count}} munud"
  },
  aboutXHours: {
    one: "tua 1 awr",
    other: "tua {{count}} awr"
  },
  xHours: {
    one: "1 awr",
    other: "{{count}} awr"
  },
  xDays: {
    one: "1 diwrnod",
    two: "2 ddiwrnod",
    other: "{{count}} diwrnod"
  },
  aboutXWeeks: {
    one: "tua 1 wythnos",
    two: "tua pythefnos",
    other: "tua {{count}} wythnos"
  },
  xWeeks: {
    one: "1 wythnos",
    two: "pythefnos",
    other: "{{count}} wythnos"
  },
  aboutXMonths: {
    one: "tua 1 mis",
    two: "tua 2 fis",
    other: "tua {{count}} mis"
  },
  xMonths: {
    one: "1 mis",
    two: "2 fis",
    other: "{{count}} mis"
  },
  aboutXYears: {
    one: "tua 1 flwyddyn",
    two: "tua 2 flynedd",
    other: "tua {{count}} mlynedd"
  },
  xYears: {
    one: "1 flwyddyn",
    two: "2 flynedd",
    other: "{{count}} mlynedd"
  },
  overXYears: {
    one: "dros 1 flwyddyn",
    two: "dros 2 flynedd",
    other: "dros {{count}} mlynedd"
  },
  almostXYears: {
    one: "bron 1 flwyddyn",
    two: "bron 2 flynedd",
    other: "bron {{count}} mlynedd"
  }
};
var formatDistance31 = function formatDistance32(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale16[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2 && !!tokenValue.two) {
    result = tokenValue.two;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "mewn " + result;
    } else {
      return result + " yn ôl";
    }
  }
  return result;
};
var formatDistance_default17 = formatDistance31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/_lib/formatLong/index.js
var dateFormats16 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats16 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats16 = {
  full: "{{date}} 'am' {{time}}",
  long: "{{date}} 'am' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong16 = {
  date: buildFormatLongFn({
    formats: dateFormats16,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats16,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats16,
    defaultWidth: "full"
  })
};
var formatLong_default16 = formatLong16;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/_lib/formatRelative/index.js
var formatRelativeLocale16 = {
  lastWeek: "eeee 'diwethaf am' p",
  yesterday: "'ddoe am' p",
  today: "'heddiw am' p",
  tomorrow: "'yfory am' p",
  nextWeek: "eeee 'am' p",
  other: "P"
};
var formatRelative31 = function formatRelative32(token, _date, _baseDate, _options) {
  return formatRelativeLocale16[token];
};
var formatRelative_default17 = formatRelative31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/_lib/localize/index.js
var eraValues16 = {
  narrow: ["C", "O"],
  abbreviated: ["CC", "OC"],
  wide: ["Cyn Crist", "Ar ôl Crist"]
};
var quarterValues16 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Ch1", "Ch2", "Ch3", "Ch4"],
  wide: ["Chwarter 1af", "2ail chwarter", "3ydd chwarter", "4ydd chwarter"]
};
var monthValues16 = {
  narrow: ["I", "Ch", "Ma", "E", "Mi", "Me", "G", "A", "Md", "H", "T", "Rh"],
  abbreviated: ["Ion", "Chwe", "Maw", "Ebr", "Mai", "Meh", "Gor", "Aws", "Med", "Hyd", "Tach", "Rhag"],
  wide: ["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"]
};
var dayValues16 = {
  narrow: ["S", "Ll", "M", "M", "I", "G", "S"],
  short: ["Su", "Ll", "Ma", "Me", "Ia", "Gw", "Sa"],
  abbreviated: ["Sul", "Llun", "Maw", "Mer", "Iau", "Gwe", "Sad"],
  wide: ["dydd Sul", "dydd Llun", "dydd Mawrth", "dydd Mercher", "dydd Iau", "dydd Gwener", "dydd Sadwrn"]
};
var dayPeriodValues16 = {
  narrow: {
    am: "b",
    pm: "h",
    midnight: "hn",
    noon: "hd",
    morning: "bore",
    afternoon: "prynhawn",
    evening: "gyda'r nos",
    night: "nos"
  },
  abbreviated: {
    am: "yb",
    pm: "yh",
    midnight: "hanner nos",
    noon: "hanner dydd",
    morning: "bore",
    afternoon: "prynhawn",
    evening: "gyda'r nos",
    night: "nos"
  },
  wide: {
    am: "y.b.",
    pm: "y.h.",
    midnight: "hanner nos",
    noon: "hanner dydd",
    morning: "bore",
    afternoon: "prynhawn",
    evening: "gyda'r nos",
    night: "nos"
  }
};
var formattingDayPeriodValues15 = {
  narrow: {
    am: "b",
    pm: "h",
    midnight: "hn",
    noon: "hd",
    morning: "yn y bore",
    afternoon: "yn y prynhawn",
    evening: "gyda'r nos",
    night: "yn y nos"
  },
  abbreviated: {
    am: "yb",
    pm: "yh",
    midnight: "hanner nos",
    noon: "hanner dydd",
    morning: "yn y bore",
    afternoon: "yn y prynhawn",
    evening: "gyda'r nos",
    night: "yn y nos"
  },
  wide: {
    am: "y.b.",
    pm: "y.h.",
    midnight: "hanner nos",
    noon: "hanner dydd",
    morning: "yn y bore",
    afternoon: "yn y prynhawn",
    evening: "gyda'r nos",
    night: "yn y nos"
  }
};
var ordinalNumber31 = function ordinalNumber32(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  if (number < 20) {
    switch (number) {
      case 0:
        return number + "fed";
      case 1:
        return number + "af";
      case 2:
        return number + "ail";
      case 3:
      case 4:
        return number + "ydd";
      case 5:
      case 6:
        return number + "ed";
      case 7:
      case 8:
      case 9:
      case 10:
      case 12:
      case 15:
      case 18:
        return number + "fed";
      case 11:
      case 13:
      case 14:
      case 16:
      case 17:
      case 19:
        return number + "eg";
    }
  } else if (number >= 50 && number <= 60 || number === 80 || number >= 100) {
    return number + "fed";
  }
  return number + "ain";
};
var localize16 = {
  ordinalNumber: ordinalNumber31,
  era: buildLocalizeFn({
    values: eraValues16,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues16,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback16(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues16,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues16,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues16,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues15,
    defaultFormattingWidth: "wide"
  })
};
var localize_default17 = localize16;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/_lib/match/index.js
var matchOrdinalNumberPattern16 = /^(\d+)(af|ail|ydd|ed|fed|eg|ain)?/i;
var parseOrdinalNumberPattern16 = /\d+/i;
var matchEraPatterns16 = {
  narrow: /^(c|o)/i,
  abbreviated: /^(c\.?\s?c\.?|o\.?\s?c\.?)/i,
  wide: /^(cyn christ|ar ôl crist|ar ol crist)/i
};
var parseEraPatterns16 = {
  wide: [/^c/i, /^(ar ôl crist|ar ol crist)/i],
  any: [/^c/i, /^o/i]
};
var matchQuarterPatterns16 = {
  narrow: /^[1234]/i,
  abbreviated: /^ch[1234]/i,
  wide: /^(chwarter 1af)|([234](ail|ydd)? chwarter)/i
};
var parseQuarterPatterns16 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns16 = {
  narrow: /^(i|ch|m|e|g|a|h|t|rh)/i,
  abbreviated: /^(ion|chwe|maw|ebr|mai|meh|gor|aws|med|hyd|tach|rhag)/i,
  wide: /^(ionawr|chwefror|mawrth|ebrill|mai|mehefin|gorffennaf|awst|medi|hydref|tachwedd|rhagfyr)/i
};
var parseMonthPatterns16 = {
  narrow: [/^i/i, /^ch/i, /^m/i, /^e/i, /^m/i, /^m/i, /^g/i, /^a/i, /^m/i, /^h/i, /^t/i, /^rh/i],
  any: [/^io/i, /^ch/i, /^maw/i, /^e/i, /^mai/i, /^meh/i, /^g/i, /^a/i, /^med/i, /^h/i, /^t/i, /^rh/i]
};
var matchDayPatterns16 = {
  narrow: /^(s|ll|m|i|g)/i,
  short: /^(su|ll|ma|me|ia|gw|sa)/i,
  abbreviated: /^(sul|llun|maw|mer|iau|gwe|sad)/i,
  wide: /^dydd (sul|llun|mawrth|mercher|iau|gwener|sadwrn)/i
};
var parseDayPatterns16 = {
  narrow: [/^s/i, /^ll/i, /^m/i, /^m/i, /^i/i, /^g/i, /^s/i],
  wide: [/^dydd su/i, /^dydd ll/i, /^dydd ma/i, /^dydd me/i, /^dydd i/i, /^dydd g/i, /^dydd sa/i],
  any: [/^su/i, /^ll/i, /^ma/i, /^me/i, /^i/i, /^g/i, /^sa/i]
};
var matchDayPeriodPatterns16 = {
  narrow: /^(b|h|hn|hd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i,
  any: /^(y\.?\s?[bh]\.?|hanner nos|hanner dydd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i
};
var parseDayPeriodPatterns16 = {
  any: {
    am: /^b|(y\.?\s?b\.?)/i,
    pm: /^h|(y\.?\s?h\.?)|(yr hwyr)/i,
    midnight: /^hn|hanner nos/i,
    noon: /^hd|hanner dydd/i,
    morning: /bore/i,
    afternoon: /prynhawn/i,
    evening: /^gyda'r nos$/i,
    night: /blah/i
  }
};
var match16 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern16,
    parsePattern: parseOrdinalNumberPattern16,
    valueCallback: function valueCallback31(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns16,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns16,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns16,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns16,
    defaultParseWidth: "any",
    valueCallback: function valueCallback32(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns16,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns16,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns16,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns16,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns16,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns16,
    defaultParseWidth: "any"
  })
};
var match_default17 = match16;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/cy/index.js
var locale16 = {
  code: "cy",
  formatDistance: formatDistance_default17,
  formatLong: formatLong_default16,
  formatRelative: formatRelative_default17,
  localize: localize_default17,
  match: match_default17,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var cy_default = locale16;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/_lib/formatDistance/index.js
var formatDistanceLocale17 = {
  lessThanXSeconds: {
    one: "mindre end ét sekund",
    other: "mindre end {{count}} sekunder"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "ét halvt minut",
  lessThanXMinutes: {
    one: "mindre end ét minut",
    other: "mindre end {{count}} minutter"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minutter"
  },
  aboutXHours: {
    one: "cirka 1 time",
    other: "cirka {{count}} timer"
  },
  xHours: {
    one: "1 time",
    other: "{{count}} timer"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dage"
  },
  aboutXWeeks: {
    one: "cirka 1 uge",
    other: "cirka {{count}} uger"
  },
  xWeeks: {
    one: "1 uge",
    other: "{{count}} uger"
  },
  aboutXMonths: {
    one: "cirka 1 måned",
    other: "cirka {{count}} måneder"
  },
  xMonths: {
    one: "1 måned",
    other: "{{count}} måneder"
  },
  aboutXYears: {
    one: "cirka 1 år",
    other: "cirka {{count}} år"
  },
  xYears: {
    one: "1 år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over 1 år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "næsten 1 år",
    other: "næsten {{count}} år"
  }
};
var formatDistance33 = function formatDistance34(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale17[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " siden";
    }
  }
  return result;
};
var formatDistance_default18 = formatDistance33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/_lib/formatLong/index.js
var dateFormats17 = {
  full: "EEEE 'den' d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd/MM/y"
};
var timeFormats17 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats17 = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong17 = {
  date: buildFormatLongFn({
    formats: dateFormats17,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats17,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats17,
    defaultWidth: "full"
  })
};
var formatLong_default17 = formatLong17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/_lib/formatRelative/index.js
var formatRelativeLocale17 = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'på' eeee 'kl.' p",
  other: "P"
};
var formatRelative33 = function formatRelative34(token, _date, _baseDate, _options) {
  return formatRelativeLocale17[token];
};
var formatRelative_default18 = formatRelative33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/_lib/localize/index.js
var eraValues17 = {
  narrow: ["fvt", "vt"],
  abbreviated: ["f.v.t.", "v.t."],
  wide: ["før vesterlandsk tidsregning", "vesterlandsk tidsregning"]
};
var quarterValues17 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues17 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
};
var dayValues17 = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
  abbreviated: ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."],
  wide: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
};
var dayPeriodValues17 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  }
};
var formattingDayPeriodValues16 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  }
};
var ordinalNumber33 = function ordinalNumber34(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize17 = {
  ordinalNumber: ordinalNumber33,
  era: buildLocalizeFn({
    values: eraValues17,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues17,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback17(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues17,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues17,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues17,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues16,
    defaultFormattingWidth: "wide"
  })
};
var localize_default18 = localize17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/_lib/match/index.js
var matchOrdinalNumberPattern17 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern17 = /\d+/i;
var matchEraPatterns17 = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
};
var parseEraPatterns17 = {
  any: [/^f/i, /^(v|e)/i]
};
var matchQuarterPatterns17 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
};
var parseQuarterPatterns17 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns17 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
};
var parseMonthPatterns17 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns17 = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
var parseDayPatterns17 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns17 = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
};
var parseDayPeriodPatterns17 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /midnat/i,
    noon: /middag/i,
    morning: /morgen/i,
    afternoon: /eftermiddag/i,
    evening: /aften/i,
    night: /nat/i
  }
};
var match17 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern17,
    parsePattern: parseOrdinalNumberPattern17,
    valueCallback: function valueCallback33(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns17,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns17,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns17,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns17,
    defaultParseWidth: "any",
    valueCallback: function valueCallback34(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns17,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns17,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns17,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns17,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns17,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns17,
    defaultParseWidth: "any"
  })
};
var match_default18 = match17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/da/index.js
var locale17 = {
  code: "da",
  formatDistance: formatDistance_default18,
  formatLong: formatLong_default17,
  formatRelative: formatRelative_default18,
  localize: localize_default18,
  match: match_default18,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var da_default = locale17;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/_lib/formatDistance/index.js
var formatDistanceLocale18 = {
  lessThanXSeconds: {
    standalone: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    },
    withPreposition: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    }
  },
  xSeconds: {
    standalone: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    },
    withPreposition: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    }
  },
  halfAMinute: {
    standalone: "halbe Minute",
    withPreposition: "halben Minute"
  },
  lessThanXMinutes: {
    standalone: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    },
    withPreposition: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    }
  },
  xMinutes: {
    standalone: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    },
    withPreposition: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    }
  },
  aboutXHours: {
    standalone: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    },
    withPreposition: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    }
  },
  xHours: {
    standalone: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    },
    withPreposition: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    }
  },
  xDays: {
    standalone: {
      one: "1 Tag",
      other: "{{count}} Tage"
    },
    withPreposition: {
      one: "1 Tag",
      other: "{{count}} Tagen"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    },
    withPreposition: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    }
  },
  xWeeks: {
    standalone: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    },
    withPreposition: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monate"
    },
    withPreposition: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monaten"
    }
  },
  xMonths: {
    standalone: {
      one: "1 Monat",
      other: "{{count}} Monate"
    },
    withPreposition: {
      one: "1 Monat",
      other: "{{count}} Monaten"
    }
  },
  aboutXYears: {
    standalone: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahre"
    },
    withPreposition: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahren"
    }
  },
  xYears: {
    standalone: {
      one: "1 Jahr",
      other: "{{count}} Jahre"
    },
    withPreposition: {
      one: "1 Jahr",
      other: "{{count}} Jahren"
    }
  },
  overXYears: {
    standalone: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahre"
    },
    withPreposition: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahren"
    }
  },
  almostXYears: {
    standalone: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahre"
    },
    withPreposition: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahren"
    }
  }
};
var formatDistance35 = function formatDistance36(token, count, options) {
  var result;
  var tokenValue = options !== null && options !== void 0 && options.addSuffix ? formatDistanceLocale18[token].withPreposition : formatDistanceLocale18[token].standalone;
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return "vor " + result;
    }
  }
  return result;
};
var formatDistance_default19 = formatDistance35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/_lib/formatLong/index.js
var dateFormats18 = {
  full: "EEEE, do MMMM y",
  // Montag, 7. Januar 2018
  long: "do MMMM y",
  // 7. Januar 2018
  medium: "do MMM y",
  // 7. Jan. 2018
  short: "dd.MM.y"
  // 07.01.2018
};
var timeFormats18 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats18 = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong18 = {
  date: buildFormatLongFn({
    formats: dateFormats18,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats18,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats18,
    defaultWidth: "full"
  })
};
var formatLong_default18 = formatLong18;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/_lib/formatRelative/index.js
var formatRelativeLocale18 = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
};
var formatRelative35 = function formatRelative36(token, _date, _baseDate, _options) {
  return formatRelativeLocale18[token];
};
var formatRelative_default19 = formatRelative35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/_lib/localize/index.js
var eraValues18 = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
};
var quarterValues18 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
};
var monthValues18 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  wide: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
};
var formattingMonthValues5 = {
  narrow: monthValues18.narrow,
  abbreviated: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
  wide: monthValues18.wide
};
var dayValues18 = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
};
var dayPeriodValues18 = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachm.",
    evening: "Abend",
    night: "Nacht"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  }
};
var formattingDayPeriodValues17 = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachm.",
    evening: "abends",
    night: "nachts"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  }
};
var ordinalNumber35 = function ordinalNumber36(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize18 = {
  ordinalNumber: ordinalNumber35,
  era: buildLocalizeFn({
    values: eraValues18,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues18,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback18(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues18,
    formattingValues: formattingMonthValues5,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues18,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues18,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues17,
    defaultFormattingWidth: "wide"
  })
};
var localize_default19 = localize18;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/_lib/match/index.js
var matchOrdinalNumberPattern18 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern18 = /\d+/i;
var matchEraPatterns18 = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
};
var parseEraPatterns18 = {
  any: [/^v/i, /^n/i]
};
var matchQuarterPatterns18 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
var parseQuarterPatterns18 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns18 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns18 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns18 = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
};
var parseDayPatterns18 = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns18 = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
};
var parseDayPeriodPatterns18 = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /abends/i,
    night: /nachts/i
    // will never be matched. Night is matched by `pm`
  }
};
var match18 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern18,
    parsePattern: parseOrdinalNumberPattern18,
    valueCallback: function valueCallback35(value) {
      return parseInt(value);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns18,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns18,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns18,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns18,
    defaultParseWidth: "any",
    valueCallback: function valueCallback36(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns18,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns18,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns18,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns18,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns18,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns18,
    defaultParseWidth: "any"
  })
};
var match_default19 = match18;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de/index.js
var locale18 = {
  code: "de",
  formatDistance: formatDistance_default19,
  formatLong: formatLong_default18,
  formatRelative: formatRelative_default19,
  localize: localize_default19,
  match: match_default19,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var de_default = locale18;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de-AT/_lib/localize/index.js
var eraValues19 = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
};
var quarterValues19 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
};
var monthValues19 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  wide: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
};
var formattingMonthValues6 = {
  narrow: monthValues19.narrow,
  abbreviated: ["Jän.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
  wide: monthValues19.wide
};
var dayValues19 = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
};
var dayPeriodValues19 = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachm.",
    evening: "Abend",
    night: "Nacht"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  }
};
var formattingDayPeriodValues18 = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachm.",
    evening: "abends",
    night: "nachts"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  }
};
var ordinalNumber37 = function ordinalNumber38(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize19 = {
  ordinalNumber: ordinalNumber37,
  era: buildLocalizeFn({
    values: eraValues19,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues19,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback19(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues19,
    formattingValues: formattingMonthValues6,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues19,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues19,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues18,
    defaultFormattingWidth: "wide"
  })
};
var localize_default20 = localize19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/de-AT/index.js
var locale19 = {
  code: "de-AT",
  formatDistance: formatDistance_default19,
  formatLong: formatLong_default18,
  formatRelative: formatRelative_default19,
  localize: localize_default20,
  match: match_default19,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var de_AT_default = locale19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/_lib/formatDistance/index.js
var formatDistanceLocale19 = {
  lessThanXSeconds: {
    one: "λιγότερο από ένα δευτερόλεπτο",
    other: "λιγότερο από {{count}} δευτερόλεπτα"
  },
  xSeconds: {
    one: "1 δευτερόλεπτο",
    other: "{{count}} δευτερόλεπτα"
  },
  halfAMinute: "μισό λεπτό",
  lessThanXMinutes: {
    one: "λιγότερο από ένα λεπτό",
    other: "λιγότερο από {{count}} λεπτά"
  },
  xMinutes: {
    one: "1 λεπτό",
    other: "{{count}} λεπτά"
  },
  aboutXHours: {
    one: "περίπου 1 ώρα",
    other: "περίπου {{count}} ώρες"
  },
  xHours: {
    one: "1 ώρα",
    other: "{{count}} ώρες"
  },
  xDays: {
    one: "1 ημέρα",
    other: "{{count}} ημέρες"
  },
  aboutXWeeks: {
    one: "περίπου 1 εβδομάδα",
    other: "περίπου {{count}} εβδομάδες"
  },
  xWeeks: {
    one: "1 εβδομάδα",
    other: "{{count}} εβδομάδες"
  },
  aboutXMonths: {
    one: "περίπου 1 μήνας",
    other: "περίπου {{count}} μήνες"
  },
  xMonths: {
    one: "1 μήνας",
    other: "{{count}} μήνες"
  },
  aboutXYears: {
    one: "περίπου 1 χρόνο",
    other: "περίπου {{count}} χρόνια"
  },
  xYears: {
    one: "1 χρόνο",
    other: "{{count}} χρόνια"
  },
  overXYears: {
    one: "πάνω από 1 χρόνο",
    other: "πάνω από {{count}} χρόνια"
  },
  almostXYears: {
    one: "περίπου 1 χρόνο",
    other: "περίπου {{count}} χρόνια"
  }
};
var formatDistance37 = function formatDistance38(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale19[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "σε " + result;
    } else {
      return result + " πριν";
    }
  }
  return result;
};
var formatDistance_default20 = formatDistance37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/_lib/formatLong/index.js
var dateFormats19 = {
  full: "EEEE, d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "d/M/yy"
};
var timeFormats19 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats19 = {
  full: "{{date}} - {{time}}",
  long: "{{date}} - {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong19 = {
  date: buildFormatLongFn({
    formats: dateFormats19,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats19,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats19,
    defaultWidth: "full"
  })
};
var formatLong_default19 = formatLong19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/_lib/formatRelative/index.js
var formatRelativeLocale19 = {
  lastWeek: function lastWeek5(date) {
    switch (date.getUTCDay()) {
      case 6:
        return "'το προηγούμενο' eeee 'στις' p";
      default:
        return "'την προηγούμενη' eeee 'στις' p";
    }
  },
  yesterday: "'χθες στις' p",
  today: "'σήμερα στις' p",
  tomorrow: "'αύριο στις' p",
  nextWeek: "eeee 'στις' p",
  other: "P"
};
var formatRelative37 = function formatRelative38(token, date) {
  var format = formatRelativeLocale19[token];
  if (typeof format === "function")
    return format(date);
  return format;
};
var formatRelative_default20 = formatRelative37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/_lib/localize/index.js
var eraValues20 = {
  narrow: ["πΧ", "μΧ"],
  abbreviated: ["π.Χ.", "μ.Χ."],
  wide: ["προ Χριστού", "μετά Χριστόν"]
};
var quarterValues20 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Τ1", "Τ2", "Τ3", "Τ4"],
  wide: ["1ο τρίμηνο", "2ο τρίμηνο", "3ο τρίμηνο", "4ο τρίμηνο"]
};
var monthValues20 = {
  narrow: ["Ι", "Φ", "Μ", "Α", "Μ", "Ι", "Ι", "Α", "Σ", "Ο", "Ν", "Δ"],
  abbreviated: ["Ιαν", "Φεβ", "Μάρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ", "Νοέ", "Δεκ"],
  wide: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"]
};
var formattingMonthValues7 = {
  narrow: ["Ι", "Φ", "Μ", "Α", "Μ", "Ι", "Ι", "Α", "Σ", "Ο", "Ν", "Δ"],
  abbreviated: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαΐ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
  wide: ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"]
};
var dayValues20 = {
  narrow: ["Κ", "Δ", "T", "Τ", "Π", "Π", "Σ"],
  short: ["Κυ", "Δε", "Τρ", "Τε", "Πέ", "Πα", "Σά"],
  abbreviated: ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"],
  wide: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
};
var dayPeriodValues20 = {
  narrow: {
    am: "πμ",
    pm: "μμ",
    midnight: "μεσάνυχτα",
    noon: "μεσημέρι",
    morning: "πρωί",
    afternoon: "απόγευμα",
    evening: "βράδυ",
    night: "νύχτα"
  },
  abbreviated: {
    am: "π.μ.",
    pm: "μ.μ.",
    midnight: "μεσάνυχτα",
    noon: "μεσημέρι",
    morning: "πρωί",
    afternoon: "απόγευμα",
    evening: "βράδυ",
    night: "νύχτα"
  },
  wide: {
    am: "π.μ.",
    pm: "μ.μ.",
    midnight: "μεσάνυχτα",
    noon: "μεσημέρι",
    morning: "πρωί",
    afternoon: "απόγευμα",
    evening: "βράδυ",
    night: "νύχτα"
  }
};
var ordinalNumber39 = function ordinalNumber40(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  var suffix;
  if (unit === "year" || unit === "month") {
    suffix = "ος";
  } else if (unit === "week" || unit === "dayOfYear" || unit === "day" || unit === "hour" || unit === "date") {
    suffix = "η";
  } else {
    suffix = "ο";
  }
  return number + suffix;
};
var localize20 = {
  ordinalNumber: ordinalNumber39,
  era: buildLocalizeFn({
    values: eraValues20,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues20,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback20(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues20,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues7,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues20,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues20,
    defaultWidth: "wide"
  })
};
var localize_default21 = localize20;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/_lib/match/index.js
var matchOrdinalNumberPattern19 = /^(\d+)(ος|η|ο)?/i;
var parseOrdinalNumberPattern19 = /\d+/i;
var matchEraPatterns19 = {
  narrow: /^(πΧ|μΧ)/i,
  abbreviated: /^(π\.?\s?χ\.?|π\.?\s?κ\.?\s?χ\.?|μ\.?\s?χ\.?|κ\.?\s?χ\.?)/i,
  wide: /^(προ Χριστο(ύ|υ)|πριν απ(ό|ο) την Κοιν(ή|η) Χρονολογ(ί|ι)α|μετ(ά|α) Χριστ(ό|ο)ν|Κοιν(ή|η) Χρονολογ(ί|ι)α)/i
};
var parseEraPatterns19 = {
  any: [/^π/i, /^(μ|κ)/i]
};
var matchQuarterPatterns19 = {
  narrow: /^[1234]/i,
  abbreviated: /^τ[1234]/i,
  wide: /^[1234]ο? τρ(ί|ι)μηνο/i
};
var parseQuarterPatterns19 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns19 = {
  narrow: /^[ιφμαμιιασονδ]/i,
  abbreviated: /^(ιαν|φεβ|μ[άα]ρ|απρ|μ[άα][ιΐ]|ιο[ύυ]ν|ιο[ύυ]λ|α[ύυ]γ|σεπ|οκτ|νο[έε]|δεκ)/i,
  wide: /^(μ[άα][ιΐ]|α[ύυ]γο[υύ]στ)(ος|ου)|(ιανου[άα]ρ|φεβρου[άα]ρ|μ[άα]ρτ|απρ[ίι]λ|ιο[ύυ]ν|ιο[ύυ]λ|σεπτ[έε]μβρ|οκτ[ώω]βρ|νο[έε]μβρ|δεκ[έε]μβρ)(ιος|ίου)/i
};
var parseMonthPatterns19 = {
  narrow: [/^ι/i, /^φ/i, /^μ/i, /^α/i, /^μ/i, /^ι/i, /^ι/i, /^α/i, /^σ/i, /^ο/i, /^ν/i, /^δ/i],
  any: [/^ια/i, /^φ/i, /^μ[άα]ρ/i, /^απ/i, /^μ[άα][ιΐ]/i, /^ιο[ύυ]ν/i, /^ιο[ύυ]λ/i, /^α[ύυ]/i, /^σ/i, /^ο/i, /^ν/i, /^δ/i]
};
var matchDayPatterns19 = {
  narrow: /^[κδτπσ]/i,
  short: /^(κυ|δε|τρ|τε|π[εέ]|π[αά]|σ[αά])/i,
  abbreviated: /^(κυρ|δευ|τρι|τετ|πεμ|παρ|σαβ)/i,
  wide: /^(κυριακ(ή|η)|δευτ(έ|ε)ρα|τρ(ί|ι)τη|τετ(ά|α)ρτη|π(έ|ε)μπτη|παρασκευ(ή|η)|σ(ά|α)ββατο)/i
};
var parseDayPatterns19 = {
  narrow: [/^κ/i, /^δ/i, /^τ/i, /^τ/i, /^π/i, /^π/i, /^σ/i],
  any: [/^κ/i, /^δ/i, /^τρ/i, /^τε/i, /^π[εέ]/i, /^π[αά]/i, /^σ/i]
};
var matchDayPeriodPatterns19 = {
  narrow: /^(πμ|μμ|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|πρω(ί|ι)|απ(ό|ο)γευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα)/i,
  any: /^([πμ]\.?\s?μ\.?|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|πρω(ί|ι)|απ(ό|ο)γευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα)/i
};
var parseDayPeriodPatterns19 = {
  any: {
    am: /^πμ|π\.\s?μ\./i,
    pm: /^μμ|μ\.\s?μ\./i,
    midnight: /^μεσάν/i,
    noon: /^μεσημ(έ|ε)/i,
    morning: /πρω(ί|ι)/i,
    afternoon: /απ(ό|ο)γευμα/i,
    evening: /βρ(ά|α)δυ/i,
    night: /ν(ύ|υ)χτα/i
  }
};
var match19 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern19,
    parsePattern: parseOrdinalNumberPattern19,
    valueCallback: function valueCallback37(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns19,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns19,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns19,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns19,
    defaultParseWidth: "any",
    valueCallback: function valueCallback38(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns19,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns19,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns19,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns19,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns19,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns19,
    defaultParseWidth: "any"
  })
};
var match_default20 = match19;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/el/index.js
var locale20 = {
  code: "el",
  formatDistance: formatDistance_default20,
  formatLong: formatLong_default19,
  formatRelative: formatRelative_default20,
  localize: localize_default21,
  match: match_default20,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var el_default = locale20;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-AU/_lib/formatLong/index.js
var dateFormats20 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats20 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats20 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong20 = {
  date: buildFormatLongFn({
    formats: dateFormats20,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats20,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats20,
    defaultWidth: "full"
  })
};
var formatLong_default20 = formatLong20;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-AU/index.js
var locale21 = {
  code: "en-AU",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default20,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var en_AU_default = locale21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-CA/_lib/formatDistance/index.js
var formatDistanceLocale20 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "a second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "a minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about an hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "an hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "a day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about a week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "a week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about a month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "a month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about a year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "a year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over a year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost a year",
    other: "almost {{count}} years"
  }
};
var formatDistance39 = function formatDistance40(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale20[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance_default21 = formatDistance39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-CA/_lib/formatLong/index.js
var dateFormats21 = {
  full: "EEEE, MMMM do, yyyy",
  long: "MMMM do, yyyy",
  medium: "MMM d, yyyy",
  short: "yyyy-MM-dd"
};
var timeFormats21 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats21 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong21 = {
  date: buildFormatLongFn({
    formats: dateFormats21,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats21,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats21,
    defaultWidth: "full"
  })
};
var formatLong_default21 = formatLong21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-CA/index.js
var locale22 = {
  code: "en-CA",
  formatDistance: formatDistance_default21,
  formatLong: formatLong_default21,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var en_CA_default = locale22;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-GB/_lib/formatLong/index.js
var dateFormats22 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats22 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats22 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong22 = {
  date: buildFormatLongFn({
    formats: dateFormats22,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats22,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats22,
    defaultWidth: "full"
  })
};
var formatLong_default22 = formatLong22;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-GB/index.js
var locale23 = {
  code: "en-GB",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default22,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var en_GB_default = locale23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-IE/index.js
var locale24 = {
  code: "en-IE",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default22,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var en_IE_default = locale24;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-IN/_lib/formatLong/index.js
var dateFormats23 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM, yyyy",
  medium: "d MMM, yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats23 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats23 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong23 = {
  date: buildFormatLongFn({
    formats: dateFormats23,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats23,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats23,
    defaultWidth: "full"
  })
};
var formatLong_default23 = formatLong23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-IN/index.js
var locale25 = {
  code: "en-IN",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default23,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 1,
    // Monday is the first day of the week.
    firstWeekContainsDate: 4
    // The week that contains Jan 4th is the first week of the year.
  }
};
var en_IN_default = locale25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-NZ/_lib/formatLong/index.js
var dateFormats24 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats24 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats24 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong24 = {
  date: buildFormatLongFn({
    formats: dateFormats24,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats24,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats24,
    defaultWidth: "full"
  })
};
var formatLong_default24 = formatLong24;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-NZ/index.js
var locale26 = {
  code: "en-NZ",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default24,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var en_NZ_default = locale26;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-ZA/_lib/formatLong/index.js
var dateFormats25 = {
  full: "EEEE, dd MMMM yyyy",
  long: "dd MMMM yyyy",
  medium: "dd MMM yyyy",
  short: "yyyy/MM/dd"
};
var timeFormats25 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats25 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong25 = {
  date: buildFormatLongFn({
    formats: dateFormats25,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats25,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats25,
    defaultWidth: "full"
  })
};
var formatLong_default25 = formatLong25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/en-ZA/index.js
var locale27 = {
  code: "en-ZA",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default25,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    // Sunday is the first day of the week.
    firstWeekContainsDate: 1
    // The week that contains Jan 1st is the first week of the year.
  }
};
var en_ZA_default = locale27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/_lib/formatDistance/index.js
var formatDistanceLocale21 = {
  lessThanXSeconds: {
    one: "malpli ol sekundo",
    other: "malpli ol {{count}} sekundoj"
  },
  xSeconds: {
    one: "1 sekundo",
    other: "{{count}} sekundoj"
  },
  halfAMinute: "duonminuto",
  lessThanXMinutes: {
    one: "malpli ol minuto",
    other: "malpli ol {{count}} minutoj"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutoj"
  },
  aboutXHours: {
    one: "proksimume 1 horo",
    other: "proksimume {{count}} horoj"
  },
  xHours: {
    one: "1 horo",
    other: "{{count}} horoj"
  },
  xDays: {
    one: "1 tago",
    other: "{{count}} tagoj"
  },
  aboutXMonths: {
    one: "proksimume 1 monato",
    other: "proksimume {{count}} monatoj"
  },
  xWeeks: {
    one: "1 semajno",
    other: "{{count}} semajnoj"
  },
  aboutXWeeks: {
    one: "proksimume 1 semajno",
    other: "proksimume {{count}} semajnoj"
  },
  xMonths: {
    one: "1 monato",
    other: "{{count}} monatoj"
  },
  aboutXYears: {
    one: "proksimume 1 jaro",
    other: "proksimume {{count}} jaroj"
  },
  xYears: {
    one: "1 jaro",
    other: "{{count}} jaroj"
  },
  overXYears: {
    one: "pli ol 1 jaro",
    other: "pli ol {{count}} jaroj"
  },
  almostXYears: {
    one: "preskaŭ 1 jaro",
    other: "preskaŭ {{count}} jaroj"
  }
};
var formatDistance41 = function formatDistance42(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale21[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options !== null && options !== void 0 && options.comparison && options.comparison > 0) {
      return "post " + result;
    } else {
      return "antaŭ " + result;
    }
  }
  return result;
};
var formatDistance_default22 = formatDistance41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/_lib/formatLong/index.js
var dateFormats26 = {
  full: "EEEE, do 'de' MMMM y",
  long: "y-MMMM-dd",
  medium: "y-MMM-dd",
  short: "yyyy-MM-dd"
};
var timeFormats26 = {
  full: "Ho 'horo kaj' m:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats26 = {
  any: "{{date}} {{time}}"
};
var formatLong26 = {
  date: buildFormatLongFn({
    formats: dateFormats26,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats26,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats26,
    defaultWidth: "any"
  })
};
var formatLong_default26 = formatLong26;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/_lib/formatRelative/index.js
var formatRelativeLocale20 = {
  lastWeek: "'pasinta' eeee 'je' p",
  yesterday: "'hieraŭ je' p",
  today: "'hodiaŭ je' p",
  tomorrow: "'morgaŭ je' p",
  nextWeek: "eeee 'je' p",
  other: "P"
};
var formatRelative39 = function formatRelative40(token, _date, _baseDate, _options) {
  return formatRelativeLocale20[token];
};
var formatRelative_default21 = formatRelative39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/_lib/localize/index.js
var eraValues21 = {
  narrow: ["aK", "pK"],
  abbreviated: ["a.K.E.", "p.K.E."],
  wide: ["antaŭ Komuna Erao", "Komuna Erao"]
};
var quarterValues21 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1-a kvaronjaro", "2-a kvaronjaro", "3-a kvaronjaro", "4-a kvaronjaro"]
};
var monthValues21 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aŭg", "sep", "okt", "nov", "dec"],
  wide: ["januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro"]
};
var dayValues21 = {
  narrow: ["D", "L", "M", "M", "Ĵ", "V", "S"],
  short: ["di", "lu", "ma", "me", "ĵa", "ve", "sa"],
  abbreviated: ["dim", "lun", "mar", "mer", "ĵaŭ", "ven", "sab"],
  wide: ["dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato"]
};
var dayPeriodValues21 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  },
  abbreviated: {
    am: "a.t.m.",
    pm: "p.t.m.",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  },
  wide: {
    am: "antaŭtagmeze",
    pm: "posttagmeze",
    midnight: "noktomezo",
    noon: "tagmezo",
    morning: "matene",
    afternoon: "posttagmeze",
    evening: "vespere",
    night: "nokte"
  }
};
var ordinalNumber41 = function ordinalNumber42(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + "-a";
};
var localize21 = {
  ordinalNumber: ordinalNumber41,
  era: buildLocalizeFn({
    values: eraValues21,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues21,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback21(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues21,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues21,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues21,
    defaultWidth: "wide"
  })
};
var localize_default22 = localize21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/_lib/match/index.js
var matchOrdinalNumberPattern20 = /^(\d+)(-?a)?/i;
var parseOrdinalNumberPattern20 = /\d+/i;
var matchEraPatterns20 = {
  narrow: /^([ap]k)/i,
  abbreviated: /^([ap]\.?\s?k\.?\s?e\.?)/i,
  wide: /^((antaǔ |post )?komuna erao)/i
};
var parseEraPatterns20 = {
  any: [/^a/i, /^[kp]/i]
};
var matchQuarterPatterns20 = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](-?a)? kvaronjaro/i
};
var parseQuarterPatterns20 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns20 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|a(ŭ|ux|uh|u)g|sep|okt|nov|dec)/i,
  wide: /^(januaro|februaro|marto|aprilo|majo|junio|julio|a(ŭ|ux|uh|u)gusto|septembro|oktobro|novembro|decembro)/i
};
var parseMonthPatterns20 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^a(u|ŭ)/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns20 = {
  narrow: /^[dlmĵjvs]/i,
  short: /^(di|lu|ma|me|(ĵ|jx|jh|j)a|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)|ven|sab)/i,
  wide: /^(diman(ĉ|cx|ch|c)o|lundo|mardo|merkredo|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)do|vendredo|sabato)/i
};
var parseDayPatterns20 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^(j|ĵ)/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^(j|ĵ)/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns20 = {
  narrow: /^([ap]|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  abbreviated: /^([ap][.\s]?t[.\s]?m[.\s]?|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  wide: /^(anta(ŭ|ux)tagmez|posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo]/i
};
var parseDayPeriodPatterns20 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^noktom/i,
    noon: /^t/i,
    morning: /^m/i,
    afternoon: /^posttagmeze/i,
    evening: /^v/i,
    night: /^n/i
  }
};
var match20 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern20,
    parsePattern: parseOrdinalNumberPattern20,
    valueCallback: function valueCallback39(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns20,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns20,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns20,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns20,
    defaultParseWidth: "any",
    valueCallback: function valueCallback40(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns20,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns20,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns20,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns20,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns20,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns20,
    defaultParseWidth: "any"
  })
};
var match_default21 = match20;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eo/index.js
var locale28 = {
  code: "eo",
  formatDistance: formatDistance_default22,
  formatLong: formatLong_default26,
  formatRelative: formatRelative_default21,
  localize: localize_default22,
  match: match_default21,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var eo_default = locale28;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/_lib/formatDistance/index.js
var formatDistanceLocale22 = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
};
var formatDistance43 = function formatDistance44(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale22[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "hace " + result;
    }
  }
  return result;
};
var formatDistance_default23 = formatDistance43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/_lib/formatLong/index.js
var dateFormats27 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats27 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats27 = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong27 = {
  date: buildFormatLongFn({
    formats: dateFormats27,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats27,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats27,
    defaultWidth: "full"
  })
};
var formatLong_default27 = formatLong27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/_lib/formatRelative/index.js
var formatRelativeLocale21 = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
};
var formatRelativeLocalePlural2 = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
};
var formatRelative41 = function formatRelative42(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural2[token];
  } else {
    return formatRelativeLocale21[token];
  }
};
var formatRelative_default22 = formatRelative41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/_lib/localize/index.js
var eraValues22 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
};
var quarterValues22 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues22 = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  wide: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
};
var dayValues22 = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
};
var dayPeriodValues22 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
};
var formattingDayPeriodValues19 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
};
var ordinalNumber43 = function ordinalNumber44(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "º";
};
var localize22 = {
  ordinalNumber: ordinalNumber43,
  era: buildLocalizeFn({
    values: eraValues22,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues22,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback22(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues22,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues22,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues22,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues19,
    defaultFormattingWidth: "wide"
  })
};
var localize_default23 = localize22;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/_lib/match/index.js
var matchOrdinalNumberPattern21 = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern21 = /\d+/i;
var matchEraPatterns21 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
};
var parseEraPatterns21 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
};
var matchQuarterPatterns21 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns21 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns21 = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
};
var parseMonthPatterns21 = {
  narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
};
var matchDayPatterns21 = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
};
var parseDayPatterns21 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
};
var matchDayPeriodPatterns21 = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
};
var parseDayPeriodPatterns21 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
};
var match21 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern21,
    parsePattern: parseOrdinalNumberPattern21,
    valueCallback: function valueCallback41(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns21,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns21,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns21,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns21,
    defaultParseWidth: "any",
    valueCallback: function valueCallback42(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns21,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns21,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns21,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns21,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns21,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns21,
    defaultParseWidth: "any"
  })
};
var match_default22 = match21;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/es/index.js
var locale29 = {
  code: "es",
  formatDistance: formatDistance_default23,
  formatLong: formatLong_default27,
  formatRelative: formatRelative_default22,
  localize: localize_default23,
  match: match_default22,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var es_default = locale29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/_lib/formatDistance/index.js
var formatDistanceLocale23 = {
  lessThanXSeconds: {
    standalone: {
      one: "vähem kui üks sekund",
      other: "vähem kui {{count}} sekundit"
    },
    withPreposition: {
      one: "vähem kui ühe sekundi",
      other: "vähem kui {{count}} sekundi"
    }
  },
  xSeconds: {
    standalone: {
      one: "üks sekund",
      other: "{{count}} sekundit"
    },
    withPreposition: {
      one: "ühe sekundi",
      other: "{{count}} sekundi"
    }
  },
  halfAMinute: {
    standalone: "pool minutit",
    withPreposition: "poole minuti"
  },
  lessThanXMinutes: {
    standalone: {
      one: "vähem kui üks minut",
      other: "vähem kui {{count}} minutit"
    },
    withPreposition: {
      one: "vähem kui ühe minuti",
      other: "vähem kui {{count}} minuti"
    }
  },
  xMinutes: {
    standalone: {
      one: "üks minut",
      other: "{{count}} minutit"
    },
    withPreposition: {
      one: "ühe minuti",
      other: "{{count}} minuti"
    }
  },
  aboutXHours: {
    standalone: {
      one: "umbes üks tund",
      other: "umbes {{count}} tundi"
    },
    withPreposition: {
      one: "umbes ühe tunni",
      other: "umbes {{count}} tunni"
    }
  },
  xHours: {
    standalone: {
      one: "üks tund",
      other: "{{count}} tundi"
    },
    withPreposition: {
      one: "ühe tunni",
      other: "{{count}} tunni"
    }
  },
  xDays: {
    standalone: {
      one: "üks päev",
      other: "{{count}} päeva"
    },
    withPreposition: {
      one: "ühe päeva",
      other: "{{count}} päeva"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "umbes üks nädal",
      other: "umbes {{count}} nädalat"
    },
    withPreposition: {
      one: "umbes ühe nädala",
      other: "umbes {{count}} nädala"
    }
  },
  xWeeks: {
    standalone: {
      one: "üks nädal",
      other: "{{count}} nädalat"
    },
    withPreposition: {
      one: "ühe nädala",
      other: "{{count}} nädala"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "umbes üks kuu",
      other: "umbes {{count}} kuud"
    },
    withPreposition: {
      one: "umbes ühe kuu",
      other: "umbes {{count}} kuu"
    }
  },
  xMonths: {
    standalone: {
      one: "üks kuu",
      other: "{{count}} kuud"
    },
    withPreposition: {
      one: "ühe kuu",
      other: "{{count}} kuu"
    }
  },
  aboutXYears: {
    standalone: {
      one: "umbes üks aasta",
      other: "umbes {{count}} aastat"
    },
    withPreposition: {
      one: "umbes ühe aasta",
      other: "umbes {{count}} aasta"
    }
  },
  xYears: {
    standalone: {
      one: "üks aasta",
      other: "{{count}} aastat"
    },
    withPreposition: {
      one: "ühe aasta",
      other: "{{count}} aasta"
    }
  },
  overXYears: {
    standalone: {
      one: "rohkem kui üks aasta",
      other: "rohkem kui {{count}} aastat"
    },
    withPreposition: {
      one: "rohkem kui ühe aasta",
      other: "rohkem kui {{count}} aasta"
    }
  },
  almostXYears: {
    standalone: {
      one: "peaaegu üks aasta",
      other: "peaaegu {{count}} aastat"
    },
    withPreposition: {
      one: "peaaegu ühe aasta",
      other: "peaaegu {{count}} aasta"
    }
  }
};
var formatDistance45 = function formatDistance46(token, count, options) {
  var usageGroup = options !== null && options !== void 0 && options.addSuffix ? formatDistanceLocale23[token].withPreposition : formatDistanceLocale23[token].standalone;
  var result;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " pärast";
    } else {
      return result + " eest";
    }
  }
  return result;
};
var formatDistance_default24 = formatDistance45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/_lib/formatLong/index.js
var dateFormats28 = {
  full: "EEEE, d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd.MM.y"
};
var timeFormats28 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats28 = {
  full: "{{date}} 'kell' {{time}}",
  long: "{{date}} 'kell' {{time}}",
  medium: "{{date}}. {{time}}",
  short: "{{date}}. {{time}}"
};
var formatLong28 = {
  date: buildFormatLongFn({
    formats: dateFormats28,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats28,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats28,
    defaultWidth: "full"
  })
};
var formatLong_default28 = formatLong28;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/_lib/formatRelative/index.js
var formatRelativeLocale22 = {
  lastWeek: "'eelmine' eeee 'kell' p",
  yesterday: "'eile kell' p",
  today: "'täna kell' p",
  tomorrow: "'homme kell' p",
  nextWeek: "'järgmine' eeee 'kell' p",
  other: "P"
};
var formatRelative43 = function formatRelative44(token, _date, _baseDate, _options) {
  return formatRelativeLocale22[token];
};
var formatRelative_default23 = formatRelative43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/_lib/localize/index.js
var eraValues23 = {
  narrow: ["e.m.a", "m.a.j"],
  abbreviated: ["e.m.a", "m.a.j"],
  wide: ["enne meie ajaarvamist", "meie ajaarvamise järgi"]
};
var quarterValues23 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues23 = {
  narrow: ["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"],
  wide: ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]
};
var dayValues23 = {
  narrow: ["P", "E", "T", "K", "N", "R", "L"],
  short: ["P", "E", "T", "K", "N", "R", "L"],
  abbreviated: ["pühap.", "esmasp.", "teisip.", "kolmap.", "neljap.", "reede.", "laup."],
  wide: ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"]
};
var dayPeriodValues23 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "kesköö",
    noon: "keskpäev",
    morning: "hommik",
    afternoon: "pärastlõuna",
    evening: "õhtu",
    night: "öö"
  }
};
var formattingDayPeriodValues20 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "keskööl",
    noon: "keskpäeval",
    morning: "hommikul",
    afternoon: "pärastlõunal",
    evening: "õhtul",
    night: "öösel"
  }
};
var ordinalNumber45 = function ordinalNumber46(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize23 = {
  ordinalNumber: ordinalNumber45,
  era: buildLocalizeFn({
    values: eraValues23,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues23,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback23(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues23,
    defaultWidth: "wide",
    formattingValues: monthValues23,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues23,
    defaultWidth: "wide",
    formattingValues: dayValues23,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues23,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues20,
    defaultFormattingWidth: "wide"
  })
};
var localize_default24 = localize23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/_lib/match/index.js
var matchOrdinalNumberPattern22 = /^\d+\./i;
var parseOrdinalNumberPattern22 = /\d+/i;
var matchEraPatterns22 = {
  narrow: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  abbreviated: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  wide: /^(enne meie ajaarvamist|meie ajaarvamise järgi|enne Kristust|pärast Kristust)/i
};
var parseEraPatterns22 = {
  any: [/^e/i, /^(m|p)/i]
};
var matchQuarterPatterns22 = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns22 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns22 = {
  narrow: /^[jvmasond]/i,
  abbreviated: /^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets)/i,
  wide: /^(jaanuar|veebruar|märts|aprill|mai|juuni|juuli|august|september|oktoober|november|detsember)/i
};
var parseMonthPatterns22 = {
  narrow: [/^j/i, /^v/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^v/i, /^mär/i, /^ap/i, /^mai/i, /^juun/i, /^juul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns22 = {
  narrow: /^[petknrl]/i,
  short: /^[petknrl]/i,
  abbreviated: /^(püh?|esm?|tei?|kolm?|nel?|ree?|laup?)\.?/i,
  wide: /^(pühapäev|esmaspäev|teisipäev|kolmapäev|neljapäev|reede|laupäev)/i
};
var parseDayPatterns22 = {
  any: [/^p/i, /^e/i, /^t/i, /^k/i, /^n/i, /^r/i, /^l/i]
};
var matchDayPeriodPatterns22 = {
  any: /^(am|pm|keskööl?|keskpäev(al)?|hommik(ul)?|pärastlõunal?|õhtul?|öö(sel)?)/i
};
var parseDayPeriodPatterns22 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^keskö/i,
    noon: /^keskp/i,
    morning: /hommik/i,
    afternoon: /pärastlõuna/i,
    evening: /õhtu/i,
    night: /öö/i
  }
};
var match22 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern22,
    parsePattern: parseOrdinalNumberPattern22,
    valueCallback: function valueCallback43(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns22,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns22,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns22,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns22,
    defaultParseWidth: "any",
    valueCallback: function valueCallback44(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns22,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns22,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns22,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns22,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns22,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns22,
    defaultParseWidth: "any"
  })
};
var match_default23 = match22;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/et/index.js
var locale30 = {
  code: "et",
  formatDistance: formatDistance_default24,
  formatLong: formatLong_default28,
  formatRelative: formatRelative_default23,
  localize: localize_default24,
  match: match_default23,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var et_default = locale30;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/_lib/formatDistance/index.js
var formatDistanceLocale24 = {
  lessThanXSeconds: {
    one: "segundo bat baino gutxiago",
    other: "{{count}} segundo baino gutxiago"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundo"
  },
  halfAMinute: "minutu erdi",
  lessThanXMinutes: {
    one: "minutu bat baino gutxiago",
    other: "{{count}} minutu baino gutxiago"
  },
  xMinutes: {
    one: "1 minutu",
    other: "{{count}} minutu"
  },
  aboutXHours: {
    one: "1 ordu gutxi gorabehera",
    other: "{{count}} ordu gutxi gorabehera"
  },
  xHours: {
    one: "1 ordu",
    other: "{{count}} ordu"
  },
  xDays: {
    one: "1 egun",
    other: "{{count}} egun"
  },
  aboutXWeeks: {
    one: "aste 1 inguru",
    other: "{{count}} aste inguru"
  },
  xWeeks: {
    one: "1 aste",
    other: "{{count}} astean"
  },
  aboutXMonths: {
    one: "1 hilabete gutxi gorabehera",
    other: "{{count}} hilabete gutxi gorabehera"
  },
  xMonths: {
    one: "1 hilabete",
    other: "{{count}} hilabete"
  },
  aboutXYears: {
    one: "1 urte gutxi gorabehera",
    other: "{{count}} urte gutxi gorabehera"
  },
  xYears: {
    one: "1 urte",
    other: "{{count}} urte"
  },
  overXYears: {
    one: "1 urte baino gehiago",
    other: "{{count}} urte baino gehiago"
  },
  almostXYears: {
    one: "ia 1 urte",
    other: "ia {{count}} urte"
  }
};
var formatDistance47 = function formatDistance48(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale24[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "duela " + result;
    }
  }
  return result;
};
var formatDistance_default25 = formatDistance47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/_lib/formatLong/index.js
var dateFormats29 = {
  full: "EEEE, y'ko' MMMM'ren' d'a' y'ren'",
  long: "y'ko' MMMM'ren' d'a'",
  medium: "y MMM d",
  short: "yy/MM/dd"
};
var timeFormats29 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats29 = {
  full: "{{date}} 'tan' {{time}}",
  long: "{{date}} 'tan' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong29 = {
  date: buildFormatLongFn({
    formats: dateFormats29,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats29,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats29,
    defaultWidth: "full"
  })
};
var formatLong_default29 = formatLong29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/_lib/formatRelative/index.js
var formatRelativeLocale23 = {
  lastWeek: "'joan den' eeee, LT",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: "eeee, p",
  other: "P"
};
var formatRelativeLocalePlural3 = {
  lastWeek: "'joan den' eeee, p",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: "eeee, p",
  other: "P"
};
var formatRelative45 = function formatRelative46(token, date) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural3[token];
  }
  return formatRelativeLocale23[token];
};
var formatRelative_default24 = formatRelative45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/_lib/localize/index.js
var eraValues24 = {
  narrow: ["k.a.", "k.o."],
  abbreviated: ["k.a.", "k.o."],
  wide: ["kristo aurretik", "kristo ondoren"]
};
var quarterValues24 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1H", "2H", "3H", "4H"],
  wide: ["1. hiruhilekoa", "2. hiruhilekoa", "3. hiruhilekoa", "4. hiruhilekoa"]
};
var monthValues24 = {
  narrow: ["u", "o", "m", "a", "m", "e", "u", "a", "i", "u", "a", "a"],
  abbreviated: ["urt", "ots", "mar", "api", "mai", "eka", "uzt", "abu", "ira", "urr", "aza", "abe"],
  wide: ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua"]
};
var dayValues24 = {
  narrow: ["i", "a", "a", "a", "o", "o", "l"],
  short: ["ig", "al", "as", "az", "og", "or", "lr"],
  abbreviated: ["iga", "ast", "ast", "ast", "ost", "ost", "lar"],
  wide: ["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"]
};
var dayPeriodValues24 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "ge",
    noon: "eg",
    morning: "goiza",
    afternoon: "arratsaldea",
    evening: "arratsaldea",
    night: "gaua"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gauerdia",
    noon: "eguerdia",
    morning: "goiza",
    afternoon: "arratsaldea",
    evening: "arratsaldea",
    night: "gaua"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gauerdia",
    noon: "eguerdia",
    morning: "goiza",
    afternoon: "arratsaldea",
    evening: "arratsaldea",
    night: "gaua"
  }
};
var formattingDayPeriodValues21 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "ge",
    noon: "eg",
    morning: "goizean",
    afternoon: "arratsaldean",
    evening: "arratsaldean",
    night: "gauean"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "gauerdia",
    noon: "eguerdia",
    morning: "goizean",
    afternoon: "arratsaldean",
    evening: "arratsaldean",
    night: "gauean"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "gauerdia",
    noon: "eguerdia",
    morning: "goizean",
    afternoon: "arratsaldean",
    evening: "arratsaldean",
    night: "gauean"
  }
};
var ordinalNumber47 = function ordinalNumber48(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize24 = {
  ordinalNumber: ordinalNumber47,
  era: buildLocalizeFn({
    values: eraValues24,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues24,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback24(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues24,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues24,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues24,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues21,
    defaultFormattingWidth: "wide"
  })
};
var localize_default25 = localize24;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/_lib/match/index.js
var matchOrdinalNumberPattern23 = /^(\d+)(.)?/i;
var parseOrdinalNumberPattern23 = /\d+/i;
var matchEraPatterns23 = {
  narrow: /^(k.a.|k.o.)/i,
  abbreviated: /^(k.a.|k.o.)/i,
  wide: /^(kristo aurretik|kristo ondoren)/i
};
var parseEraPatterns23 = {
  narrow: [/^k.a./i, /^k.o./i],
  abbreviated: [/^(k.a.)/i, /^(k.o.)/i],
  wide: [/^(kristo aurretik)/i, /^(kristo ondoren)/i]
};
var matchQuarterPatterns23 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]H/i,
  wide: /^[1234](.)? hiruhilekoa/i
};
var parseQuarterPatterns23 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns23 = {
  narrow: /^[uomaei]/i,
  abbreviated: /^(urt|ots|mar|api|mai|eka|uzt|abu|ira|urr|aza|abe)/i,
  wide: /^(urtarrila|otsaila|martxoa|apirila|maiatza|ekaina|uztaila|abuztua|iraila|urria|azaroa|abendua)/i
};
var parseMonthPatterns23 = {
  narrow: [/^u/i, /^o/i, /^m/i, /^a/i, /^m/i, /^e/i, /^u/i, /^a/i, /^i/i, /^u/i, /^a/i, /^a/i],
  any: [/^urt/i, /^ots/i, /^mar/i, /^api/i, /^mai/i, /^eka/i, /^uzt/i, /^abu/i, /^ira/i, /^urr/i, /^aza/i, /^abe/i]
};
var matchDayPatterns23 = {
  narrow: /^[iaol]/i,
  short: /^(ig|al|as|az|og|or|lr)/i,
  abbreviated: /^(iga|ast|ast|ast|ost|ost|lar)/i,
  wide: /^(igandea|astelehena|asteartea|asteazkena|osteguna|ostirala|larunbata)/i
};
var parseDayPatterns23 = {
  narrow: [/^i/i, /^a/i, /^a/i, /^a/i, /^o/i, /^o/i, /^l/i],
  short: [/^ig/i, /^al/i, /^as/i, /^az/i, /^og/i, /^or/i, /^lr/i],
  abbreviated: [/^iga/i, /^ast/i, /^ast/i, /^ast/i, /^ost/i, /^ost/i, /^lar/i],
  wide: [/^igandea/i, /^astelehena/i, /^asteartea/i, /^asteazkena/i, /^osteguna/i, /^ostirala/i, /^larunbata/i]
};
var matchDayPeriodPatterns23 = {
  narrow: /^(a|p|ge|eg|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i,
  any: /^([ap]\.?\s?m\.?|gauerdia|eguerdia|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i
};
var parseDayPeriodPatterns23 = {
  narrow: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^ge/i,
    noon: /^eg/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  },
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^gauerdia/i,
    noon: /^eguerdia/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  }
};
var match23 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern23,
    parsePattern: parseOrdinalNumberPattern23,
    valueCallback: function valueCallback45(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns23,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns23,
    defaultParseWidth: "wide"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns23,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns23,
    defaultParseWidth: "any",
    valueCallback: function valueCallback46(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns23,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns23,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns23,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns23,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns23,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns23,
    defaultParseWidth: "any"
  })
};
var match_default24 = match23;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/eu/index.js
var locale31 = {
  code: "eu",
  formatDistance: formatDistance_default25,
  formatLong: formatLong_default29,
  formatRelative: formatRelative_default24,
  localize: localize_default25,
  match: match_default24,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var eu_default = locale31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/_lib/formatDistance/index.js
var formatDistanceLocale25 = {
  lessThanXSeconds: {
    one: "کمتر از یک ثانیه",
    other: "کمتر از {{count}} ثانیه"
  },
  xSeconds: {
    one: "1 ثانیه",
    other: "{{count}} ثانیه"
  },
  halfAMinute: "نیم دقیقه",
  lessThanXMinutes: {
    one: "کمتر از یک دقیقه",
    other: "کمتر از {{count}} دقیقه"
  },
  xMinutes: {
    one: "1 دقیقه",
    other: "{{count}} دقیقه"
  },
  aboutXHours: {
    one: "حدود 1 ساعت",
    other: "حدود {{count}} ساعت"
  },
  xHours: {
    one: "1 ساعت",
    other: "{{count}} ساعت"
  },
  xDays: {
    one: "1 روز",
    other: "{{count}} روز"
  },
  aboutXWeeks: {
    one: "حدود 1 هفته",
    other: "حدود {{count}} هفته"
  },
  xWeeks: {
    one: "1 هفته",
    other: "{{count}} هفته"
  },
  aboutXMonths: {
    one: "حدود 1 ماه",
    other: "حدود {{count}} ماه"
  },
  xMonths: {
    one: "1 ماه",
    other: "{{count}} ماه"
  },
  aboutXYears: {
    one: "حدود 1 سال",
    other: "حدود {{count}} سال"
  },
  xYears: {
    one: "1 سال",
    other: "{{count}} سال"
  },
  overXYears: {
    one: "بیشتر از 1 سال",
    other: "بیشتر از {{count}} سال"
  },
  almostXYears: {
    one: "نزدیک 1 سال",
    other: "نزدیک {{count}} سال"
  }
};
var formatDistance49 = function formatDistance50(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale25[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "در " + result;
    } else {
      return result + " قبل";
    }
  }
  return result;
};
var formatDistance_default26 = formatDistance49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/_lib/formatLong/index.js
var dateFormats30 = {
  full: "EEEE do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "yyyy/MM/dd"
};
var timeFormats30 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats30 = {
  full: "{{date}} 'در' {{time}}",
  long: "{{date}} 'در' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong30 = {
  date: buildFormatLongFn({
    formats: dateFormats30,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats30,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats30,
    defaultWidth: "full"
  })
};
var formatLong_default30 = formatLong30;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/_lib/formatRelative/index.js
var formatRelativeLocale24 = {
  lastWeek: "eeee 'گذشته در' p",
  yesterday: "'دیروز در' p",
  today: "'امروز در' p",
  tomorrow: "'فردا در' p",
  nextWeek: "eeee 'در' p",
  other: "P"
};
var formatRelative47 = function formatRelative48(token, _date, _baseDate, _options) {
  return formatRelativeLocale24[token];
};
var formatRelative_default25 = formatRelative47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/_lib/localize/index.js
var eraValues25 = {
  narrow: ["ق", "ب"],
  abbreviated: ["ق.م.", "ب.م."],
  wide: ["قبل از میلاد", "بعد از میلاد"]
};
var quarterValues25 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["س‌م1", "س‌م2", "س‌م3", "س‌م4"],
  wide: ["سه‌ماهه 1", "سه‌ماهه 2", "سه‌ماهه 3", "سه‌ماهه 4"]
};
var monthValues25 = {
  narrow: ["ژ", "ف", "م", "آ", "م", "ج", "ج", "آ", "س", "ا", "ن", "د"],
  abbreviated: ["ژانـ", "فور", "مارس", "آپر", "می", "جون", "جولـ", "آگو", "سپتـ", "اکتـ", "نوامـ", "دسامـ"],
  wide: ["ژانویه", "فوریه", "مارس", "آپریل", "می", "جون", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"]
};
var dayValues25 = {
  narrow: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
  short: ["1ش", "2ش", "3ش", "4ش", "5ش", "ج", "ش"],
  abbreviated: ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
  wide: ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"]
};
var dayPeriodValues25 = {
  narrow: {
    am: "ق",
    pm: "ب",
    midnight: "ن",
    noon: "ظ",
    morning: "ص",
    afternoon: "ب.ظ.",
    evening: "ع",
    night: "ش"
  },
  abbreviated: {
    am: "ق.ظ.",
    pm: "ب.ظ.",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  },
  wide: {
    am: "قبل‌ازظهر",
    pm: "بعدازظهر",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  }
};
var formattingDayPeriodValues22 = {
  narrow: {
    am: "ق",
    pm: "ب",
    midnight: "ن",
    noon: "ظ",
    morning: "ص",
    afternoon: "ب.ظ.",
    evening: "ع",
    night: "ش"
  },
  abbreviated: {
    am: "ق.ظ.",
    pm: "ب.ظ.",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  },
  wide: {
    am: "قبل‌ازظهر",
    pm: "بعدازظهر",
    midnight: "نیمه‌شب",
    noon: "ظهر",
    morning: "صبح",
    afternoon: "بعدازظهر",
    evening: "عصر",
    night: "شب"
  }
};
var ordinalNumber49 = function ordinalNumber50(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize25 = {
  ordinalNumber: ordinalNumber49,
  era: buildLocalizeFn({
    values: eraValues25,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues25,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback25(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues25,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues25,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues25,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues22,
    defaultFormattingWidth: "wide"
  })
};
var localize_default26 = localize25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/_lib/match/index.js
var matchOrdinalNumberPattern24 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern24 = /\d+/i;
var matchEraPatterns24 = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?د\.?\s?م\.?|م\.?\s?|د\.?\s?م\.?)/i,
  wide: /^(قبل از میلاد|قبل از دوران مشترک|میلادی|دوران مشترک|بعد از میلاد)/i
};
var parseEraPatterns24 = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns24 = {
  narrow: /^[1234]/i,
  abbreviated: /^س‌م[1234]/i,
  wide: /^سه‌ماهه [1234]/i
};
var parseQuarterPatterns24 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns24 = {
  narrow: /^[جژفمآاماسند]/i,
  abbreviated: /^(جنو|ژانـ|ژانویه|فوریه|فور|مارس|آوریل|آپر|مه|می|ژوئن|جون|جول|جولـ|ژوئیه|اوت|آگو|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نوامـ|دسامبر|دسامـ|دسم)/i,
  wide: /^(ژانویه|جنوری|فبروری|فوریه|مارچ|مارس|آپریل|اپریل|ایپریل|آوریل|مه|می|ژوئن|جون|جولای|ژوئیه|آگست|اگست|آگوست|اوت|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نومبر|دسامبر|دسمبر)/i
};
var parseMonthPatterns24 = {
  narrow: [/^(ژ|ج)/i, /^ف/i, /^م/i, /^(آ|ا)/i, /^م/i, /^(ژ|ج)/i, /^(ج|ژ)/i, /^(آ|ا)/i, /^س/i, /^ا/i, /^ن/i, /^د/i],
  any: [/^ژا/i, /^ف/i, /^ما/i, /^آپ/i, /^(می|مه)/i, /^(ژوئن|جون)/i, /^(ژوئی|جول)/i, /^(اوت|آگ)/i, /^س/i, /^(اوک|اک)/i, /^ن/i, /^د/i]
};
var matchDayPatterns24 = {
  narrow: /^[شیدسچپج]/i,
  short: /^(ش|ج|1ش|2ش|3ش|4ش|5ش)/i,
  abbreviated: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i,
  wide: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i
};
var parseDayPatterns24 = {
  narrow: [/^ی/i, /^دو/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [/^(ی|1ش|یکشنبه)/i, /^(د|2ش|دوشنبه)/i, /^(س|3ش|سه‌شنبه)/i, /^(چ|4ش|چهارشنبه)/i, /^(پ|5ش|پنجشنبه)/i, /^(ج|جمعه)/i, /^(ش|شنبه)/i]
};
var matchDayPeriodPatterns24 = {
  narrow: /^(ب|ق|ن|ظ|ص|ب.ظ.|ع|ش)/i,
  abbreviated: /^(ق.ظ.|ب.ظ.|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i,
  wide: /^(قبل‌ازظهر|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i
};
var parseDayPeriodPatterns24 = {
  any: {
    am: /^(ق|ق.ظ.|قبل‌ازظهر)/i,
    pm: /^(ب|ب.ظ.|بعدازظهر)/i,
    midnight: /^(‌نیمه‌شب|ن)/i,
    noon: /^(ظ|ظهر)/i,
    morning: /(ص|صبح)/i,
    afternoon: /(ب|ب.ظ.|بعدازظهر)/i,
    evening: /(ع|عصر)/i,
    night: /(ش|شب)/i
  }
};
var match24 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern24,
    parsePattern: parseOrdinalNumberPattern24,
    valueCallback: function valueCallback47(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns24,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns24,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns24,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns24,
    defaultParseWidth: "any",
    valueCallback: function valueCallback48(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns24,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns24,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns24,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns24,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns24,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns24,
    defaultParseWidth: "any"
  })
};
var match_default25 = match24;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fa-IR/index.js
var locale32 = {
  code: "fa-IR",
  formatDistance: formatDistance_default26,
  formatLong: formatLong_default30,
  formatRelative: formatRelative_default25,
  localize: localize_default26,
  match: match_default25,
  options: {
    weekStartsOn: 6,
    firstWeekContainsDate: 1
  }
};
var fa_IR_default = locale32;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/_lib/formatDistance/index.js
function futureSeconds(text) {
  return text.replace(/sekuntia?/, "sekunnin");
}
function futureMinutes(text) {
  return text.replace(/minuuttia?/, "minuutin");
}
function futureHours(text) {
  return text.replace(/tuntia?/, "tunnin");
}
function futureDays(text) {
  return text.replace(/päivää?/, "päivän");
}
function futureWeeks(text) {
  return text.replace(/(viikko|viikkoa)/, "viikon");
}
function futureMonths(text) {
  return text.replace(/(kuukausi|kuukautta)/, "kuukauden");
}
function futureYears(text) {
  return text.replace(/(vuosi|vuotta)/, "vuoden");
}
var formatDistanceLocale26 = {
  lessThanXSeconds: {
    one: "alle sekunti",
    other: "alle {{count}} sekuntia",
    futureTense: futureSeconds
  },
  xSeconds: {
    one: "sekunti",
    other: "{{count}} sekuntia",
    futureTense: futureSeconds
  },
  halfAMinute: {
    one: "puoli minuuttia",
    other: "puoli minuuttia",
    futureTense: function futureTense(_text) {
      return "puolen minuutin";
    }
  },
  lessThanXMinutes: {
    one: "alle minuutti",
    other: "alle {{count}} minuuttia",
    futureTense: futureMinutes
  },
  xMinutes: {
    one: "minuutti",
    other: "{{count}} minuuttia",
    futureTense: futureMinutes
  },
  aboutXHours: {
    one: "noin tunti",
    other: "noin {{count}} tuntia",
    futureTense: futureHours
  },
  xHours: {
    one: "tunti",
    other: "{{count}} tuntia",
    futureTense: futureHours
  },
  xDays: {
    one: "päivä",
    other: "{{count}} päivää",
    futureTense: futureDays
  },
  aboutXWeeks: {
    one: "noin viikko",
    other: "noin {{count}} viikkoa",
    futureTense: futureWeeks
  },
  xWeeks: {
    one: "viikko",
    other: "{{count}} viikkoa",
    futureTense: futureWeeks
  },
  aboutXMonths: {
    one: "noin kuukausi",
    other: "noin {{count}} kuukautta",
    futureTense: futureMonths
  },
  xMonths: {
    one: "kuukausi",
    other: "{{count}} kuukautta",
    futureTense: futureMonths
  },
  aboutXYears: {
    one: "noin vuosi",
    other: "noin {{count}} vuotta",
    futureTense: futureYears
  },
  xYears: {
    one: "vuosi",
    other: "{{count}} vuotta",
    futureTense: futureYears
  },
  overXYears: {
    one: "yli vuosi",
    other: "yli {{count}} vuotta",
    futureTense: futureYears
  },
  almostXYears: {
    one: "lähes vuosi",
    other: "lähes {{count}} vuotta",
    futureTense: futureYears
  }
};
var formatDistance51 = function formatDistance52(token, count, options) {
  var tokenValue = formatDistanceLocale26[token];
  var result = count === 1 ? tokenValue.one : tokenValue.other.replace("{{count}}", String(count));
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return tokenValue.futureTense(result) + " kuluttua";
    } else {
      return result + " sitten";
    }
  }
  return result;
};
var formatDistance_default27 = formatDistance51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/_lib/formatLong/index.js
var dateFormats31 = {
  full: "eeee d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "d.M.y"
};
var timeFormats31 = {
  full: "HH.mm.ss zzzz",
  long: "HH.mm.ss z",
  medium: "HH.mm.ss",
  short: "HH.mm"
};
var dateTimeFormats31 = {
  full: "{{date}} 'klo' {{time}}",
  long: "{{date}} 'klo' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong31 = {
  date: buildFormatLongFn({
    formats: dateFormats31,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats31,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats31,
    defaultWidth: "full"
  })
};
var formatLong_default31 = formatLong31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/_lib/formatRelative/index.js
var formatRelativeLocale25 = {
  lastWeek: "'viime' eeee 'klo' p",
  yesterday: "'eilen klo' p",
  today: "'tänään klo' p",
  tomorrow: "'huomenna klo' p",
  nextWeek: "'ensi' eeee 'klo' p",
  other: "P"
};
var formatRelative49 = function formatRelative50(token, _date, _baseDate, _options) {
  return formatRelativeLocale25[token];
};
var formatRelative_default26 = formatRelative49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/_lib/localize/index.js
var eraValues26 = {
  narrow: ["eaa.", "jaa."],
  abbreviated: ["eaa.", "jaa."],
  wide: ["ennen ajanlaskun alkua", "jälkeen ajanlaskun alun"]
};
var quarterValues26 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. kvartaali", "2. kvartaali", "3. kvartaali", "4. kvartaali"]
};
var monthValues26 = {
  narrow: ["T", "H", "M", "H", "T", "K", "H", "E", "S", "L", "M", "J"],
  abbreviated: ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"],
  wide: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"]
};
var formattingMonthValues8 = {
  narrow: monthValues26.narrow,
  abbreviated: monthValues26.abbreviated,
  wide: ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"]
};
var dayValues26 = {
  narrow: ["S", "M", "T", "K", "T", "P", "L"],
  short: ["su", "ma", "ti", "ke", "to", "pe", "la"],
  abbreviated: ["sunn.", "maan.", "tiis.", "kesk.", "torst.", "perj.", "la"],
  wide: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
};
var formattingDayValues = {
  narrow: dayValues26.narrow,
  short: dayValues26.short,
  abbreviated: dayValues26.abbreviated,
  wide: ["sunnuntaina", "maanantaina", "tiistaina", "keskiviikkona", "torstaina", "perjantaina", "lauantaina"]
};
var dayPeriodValues26 = {
  narrow: {
    am: "ap",
    pm: "ip",
    midnight: "keskiyö",
    noon: "keskipäivä",
    morning: "ap",
    afternoon: "ip",
    evening: "illalla",
    night: "yöllä"
  },
  abbreviated: {
    am: "ap",
    pm: "ip",
    midnight: "keskiyö",
    noon: "keskipäivä",
    morning: "ap",
    afternoon: "ip",
    evening: "illalla",
    night: "yöllä"
  },
  wide: {
    am: "ap",
    pm: "ip",
    midnight: "keskiyöllä",
    noon: "keskipäivällä",
    morning: "aamupäivällä",
    afternoon: "iltapäivällä",
    evening: "illalla",
    night: "yöllä"
  }
};
var ordinalNumber51 = function ordinalNumber52(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize26 = {
  ordinalNumber: ordinalNumber51,
  era: buildLocalizeFn({
    values: eraValues26,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues26,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback26(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues26,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues8,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues26,
    defaultWidth: "wide",
    formattingValues: formattingDayValues,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues26,
    defaultWidth: "wide"
  })
};
var localize_default27 = localize26;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/_lib/match/index.js
var matchOrdinalNumberPattern25 = /^(\d+)(\.)/i;
var parseOrdinalNumberPattern25 = /\d+/i;
var matchEraPatterns25 = {
  narrow: /^(e|j)/i,
  abbreviated: /^(eaa.|jaa.)/i,
  wide: /^(ennen ajanlaskun alkua|jälkeen ajanlaskun alun)/i
};
var parseEraPatterns25 = {
  any: [/^e/i, /^j/i]
};
var matchQuarterPatterns25 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]\.? kvartaali/i
};
var parseQuarterPatterns25 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns25 = {
  narrow: /^[thmkeslj]/i,
  abbreviated: /^(tammi|helmi|maalis|huhti|touko|kesä|heinä|elo|syys|loka|marras|joulu)/i,
  wide: /^(tammikuu|helmikuu|maaliskuu|huhtikuu|toukokuu|kesäkuu|heinäkuu|elokuu|syyskuu|lokakuu|marraskuu|joulukuu)(ta)?/i
};
var parseMonthPatterns25 = {
  narrow: [/^t/i, /^h/i, /^m/i, /^h/i, /^t/i, /^k/i, /^h/i, /^e/i, /^s/i, /^l/i, /^m/i, /^j/i],
  any: [/^ta/i, /^hel/i, /^maa/i, /^hu/i, /^to/i, /^k/i, /^hei/i, /^e/i, /^s/i, /^l/i, /^mar/i, /^j/i]
};
var matchDayPatterns25 = {
  narrow: /^[smtkpl]/i,
  short: /^(su|ma|ti|ke|to|pe|la)/i,
  abbreviated: /^(sunn.|maan.|tiis.|kesk.|torst.|perj.|la)/i,
  wide: /^(sunnuntai|maanantai|tiistai|keskiviikko|torstai|perjantai|lauantai)(na)?/i
};
var parseDayPatterns25 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^k/i, /^t/i, /^p/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^k/i, /^to/i, /^p/i, /^l/i]
};
var matchDayPeriodPatterns25 = {
  narrow: /^(ap|ip|keskiyö|keskipäivä|aamupäivällä|iltapäivällä|illalla|yöllä)/i,
  any: /^(ap|ip|keskiyöllä|keskipäivällä|aamupäivällä|iltapäivällä|illalla|yöllä)/i
};
var parseDayPeriodPatterns25 = {
  any: {
    am: /^ap/i,
    pm: /^ip/i,
    midnight: /^keskiyö/i,
    noon: /^keskipäivä/i,
    morning: /aamupäivällä/i,
    afternoon: /iltapäivällä/i,
    evening: /illalla/i,
    night: /yöllä/i
  }
};
var match25 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern25,
    parsePattern: parseOrdinalNumberPattern25,
    valueCallback: function valueCallback49(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns25,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns25,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns25,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns25,
    defaultParseWidth: "any",
    valueCallback: function valueCallback50(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns25,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns25,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns25,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns25,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns25,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns25,
    defaultParseWidth: "any"
  })
};
var match_default26 = match25;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fi/index.js
var locale33 = {
  code: "fi",
  formatDistance: formatDistance_default27,
  formatLong: formatLong_default31,
  formatRelative: formatRelative_default26,
  localize: localize_default27,
  match: match_default26,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var fi_default = locale33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/_lib/formatDistance/index.js
var formatDistanceLocale27 = {
  lessThanXSeconds: {
    one: "moins d’une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d’une minute",
    other: "moins de {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "environ 1 heure",
    other: "environ {{count}} heures"
  },
  xHours: {
    one: "1 heure",
    other: "{{count}} heures"
  },
  xDays: {
    one: "1 jour",
    other: "{{count}} jours"
  },
  aboutXWeeks: {
    one: "environ 1 semaine",
    other: "environ {{count}} semaines"
  },
  xWeeks: {
    one: "1 semaine",
    other: "{{count}} semaines"
  },
  aboutXMonths: {
    one: "environ 1 mois",
    other: "environ {{count}} mois"
  },
  xMonths: {
    one: "1 mois",
    other: "{{count}} mois"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "plus d’un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu’un an",
    other: "presque {{count}} ans"
  }
};
var formatDistance53 = function formatDistance54(token, count, options) {
  var result;
  var form = formatDistanceLocale27[token];
  if (typeof form === "string") {
    result = form;
  } else if (count === 1) {
    result = form.one;
  } else {
    result = form.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dans " + result;
    } else {
      return "il y a " + result;
    }
  }
  return result;
};
var formatDistance_default28 = formatDistance53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/_lib/formatLong/index.js
var dateFormats32 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats32 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats32 = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong32 = {
  date: buildFormatLongFn({
    formats: dateFormats32,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats32,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats32,
    defaultWidth: "full"
  })
};
var formatLong_default32 = formatLong32;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/_lib/formatRelative/index.js
var formatRelativeLocale26 = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: "P"
};
var formatRelative51 = function formatRelative52(token, _date, _baseDate, _options) {
  return formatRelativeLocale26[token];
};
var formatRelative_default27 = formatRelative51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/_lib/localize/index.js
var eraValues27 = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant Jésus-Christ", "après Jésus-Christ"]
};
var quarterValues27 = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
  wide: ["1er trimestre", "2ème trimestre", "3ème trimestre", "4ème trimestre"]
};
var monthValues27 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  wide: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
};
var dayValues27 = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
};
var dayPeriodValues27 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "soir",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "matin",
    afternoon: "après-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l’après-midi",
    evening: "du soir",
    night: "du matin"
  }
};
var ordinalNumber53 = function ordinalNumber54(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (number === 0)
    return "0";
  var feminineUnits = ["year", "week", "hour", "minute", "second"];
  var suffix;
  if (number === 1) {
    suffix = unit && feminineUnits.includes(unit) ? "ère" : "er";
  } else {
    suffix = "ème";
  }
  return number + suffix;
};
var localize27 = {
  ordinalNumber: ordinalNumber53,
  era: buildLocalizeFn({
    values: eraValues27,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues27,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback27(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues27,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues27,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues27,
    defaultWidth: "wide"
  })
};
var localize_default28 = localize27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/_lib/match/index.js
var matchOrdinalNumberPattern26 = /^(\d+)(ième|ère|ème|er|e)?/i;
var parseOrdinalNumberPattern26 = /\d+/i;
var matchEraPatterns26 = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
};
var parseEraPatterns26 = {
  any: [/^av/i, /^ap/i]
};
var matchQuarterPatterns26 = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
};
var parseQuarterPatterns26 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns26 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
};
var parseMonthPatterns26 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^ma/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns26 = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
};
var parseDayPatterns26 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
};
var matchDayPeriodPatterns26 = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
};
var parseDayPeriodPatterns26 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
};
var match26 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern26,
    parsePattern: parseOrdinalNumberPattern26,
    valueCallback: function valueCallback51(value) {
      return parseInt(value);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns26,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns26,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns26,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns26,
    defaultParseWidth: "any",
    valueCallback: function valueCallback52(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns26,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns26,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns26,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns26,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns26,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns26,
    defaultParseWidth: "any"
  })
};
var match_default27 = match26;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr/index.js
var locale34 = {
  code: "fr",
  formatDistance: formatDistance_default28,
  formatLong: formatLong_default32,
  formatRelative: formatRelative_default27,
  localize: localize_default28,
  match: match_default27,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var fr_default = locale34;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr-CA/_lib/formatLong/index.js
var dateFormats33 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "yy-MM-dd"
};
var timeFormats33 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats33 = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong33 = {
  date: buildFormatLongFn({
    formats: dateFormats33,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats33,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats33,
    defaultWidth: "full"
  })
};
var formatLong_default33 = formatLong33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr-CA/index.js
var locale35 = {
  code: "fr-CA",
  formatDistance: formatDistance_default28,
  formatLong: formatLong_default33,
  formatRelative: formatRelative_default27,
  localize: localize_default28,
  match: match_default27,
  // Unique for fr-CA
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var fr_CA_default = locale35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr-CH/_lib/formatLong/index.js
var dateFormats34 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd.MM.y"
};
var timeFormats34 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats34 = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong34 = {
  date: buildFormatLongFn({
    formats: dateFormats34,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats34,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats34,
    defaultWidth: "full"
  })
};
var formatLong_default34 = formatLong34;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr-CH/_lib/formatRelative/index.js
var formatRelativeLocale27 = {
  lastWeek: "eeee 'la semaine dernière à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'la semaine prochaine à' p",
  other: "P"
};
var formatRelative53 = function formatRelative54(token, _date, _baseDate, _options) {
  return formatRelativeLocale27[token];
};
var formatRelative_default28 = formatRelative53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fr-CH/index.js
var locale36 = {
  code: "fr-CH",
  formatDistance: formatDistance_default28,
  formatLong: formatLong_default34,
  formatRelative: formatRelative_default28,
  localize: localize_default28,
  match: match_default27,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var fr_CH_default = locale36;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/_lib/formatDistance/index.js
var formatDistanceLocale28 = {
  lessThanXSeconds: {
    one: "minder as 1 sekonde",
    other: "minder as {{count}} sekonden"
  },
  xSeconds: {
    one: "1 sekonde",
    other: "{{count}} sekonden"
  },
  halfAMinute: "oardel minút",
  lessThanXMinutes: {
    one: "minder as 1 minút",
    other: "minder as {{count}} minuten"
  },
  xMinutes: {
    one: "1 minút",
    other: "{{count}} minuten"
  },
  aboutXHours: {
    one: "sawat 1 oere",
    other: "sawat {{count}} oere"
  },
  xHours: {
    one: "1 oere",
    other: "{{count}} oere"
  },
  xDays: {
    one: "1 dei",
    other: "{{count}} dagen"
  },
  aboutXWeeks: {
    one: "sawat 1 wike",
    other: "sawat {{count}} wiken"
  },
  xWeeks: {
    one: "1 wike",
    other: "{{count}} wiken"
  },
  aboutXMonths: {
    one: "sawat 1 moanne",
    other: "sawat {{count}} moannen"
  },
  xMonths: {
    one: "1 moanne",
    other: "{{count}} moannen"
  },
  aboutXYears: {
    one: "sawat 1 jier",
    other: "sawat {{count}} jier"
  },
  xYears: {
    one: "1 jier",
    other: "{{count}} jier"
  },
  overXYears: {
    one: "mear as 1 jier",
    other: "mear as {{count}}s jier"
  },
  almostXYears: {
    one: "hast 1 jier",
    other: "hast {{count}} jier"
  }
};
var formatDistance55 = function formatDistance56(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale28[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "oer " + result;
    } else {
      return result + " lyn";
    }
  }
  return result;
};
var formatDistance_default29 = formatDistance55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/_lib/formatLong/index.js
var dateFormats35 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd-MM-y"
};
var timeFormats35 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats35 = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong35 = {
  date: buildFormatLongFn({
    formats: dateFormats35,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats35,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats35,
    defaultWidth: "full"
  })
};
var formatLong_default35 = formatLong35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/_lib/formatRelative/index.js
var formatRelativeLocale28 = {
  lastWeek: "'ôfrûne' eeee 'om' p",
  yesterday: "'juster om' p",
  today: "'hjoed om' p",
  tomorrow: "'moarn om' p",
  nextWeek: "eeee 'om' p",
  other: "P"
};
var formatRelative55 = function formatRelative56(token, _date, _baseDate, _options) {
  return formatRelativeLocale28[token];
};
var formatRelative_default29 = formatRelative55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/_lib/localize/index.js
var eraValues28 = {
  narrow: ["f.K.", "n.K."],
  abbreviated: ["f.Kr.", "n.Kr."],
  wide: ["foar Kristus", "nei Kristus"]
};
var quarterValues28 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1e fearnsjier", "2e fearnsjier", "3e fearnsjier", "4e fearnsjier"]
};
var monthValues28 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan.", "feb.", "mrt.", "apr.", "mai.", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des."],
  wide: ["jannewaris", "febrewaris", "maart", "april", "maaie", "juny", "july", "augustus", "septimber", "oktober", "novimber", "desimber"]
};
var dayValues28 = {
  narrow: ["s", "m", "t", "w", "t", "f", "s"],
  short: ["si", "mo", "ti", "wo", "to", "fr", "so"],
  abbreviated: ["snein", "moa", "tii", "woa", "ton", "fre", "sneon"],
  wide: ["snein", "moandei", "tiisdei", "woansdei", "tongersdei", "freed", "sneon"]
};
var dayPeriodValues28 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "middei",
    morning: "moarns",
    afternoon: "middeis",
    evening: "jûns",
    night: "nachts"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "middei",
    morning: "moarns",
    afternoon: "middeis",
    evening: "jûns",
    night: "nachts"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "middei",
    morning: "moarns",
    afternoon: "middeis",
    evening: "jûns",
    night: "nachts"
  }
};
var ordinalNumber55 = function ordinalNumber56(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "e";
};
var localize28 = {
  ordinalNumber: ordinalNumber55,
  era: buildLocalizeFn({
    values: eraValues28,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues28,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback28(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues28,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues28,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues28,
    defaultWidth: "wide"
  })
};
var localize_default29 = localize28;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/_lib/match/index.js
var matchOrdinalNumberPattern27 = /^(\d+)e?/i;
var parseOrdinalNumberPattern27 = /\d+/i;
var matchEraPatterns27 = {
  narrow: /^([fn]\.? ?K\.?)/,
  abbreviated: /^([fn]\. ?Kr\.?)/,
  wide: /^((foar|nei) Kristus)/
};
var parseEraPatterns27 = {
  any: [/^f/, /^n/]
};
var matchQuarterPatterns27 = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e fearnsjier/i
};
var parseQuarterPatterns27 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns27 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mai.|jun.|jul.|aug.|sep.|okt.|nov.|des.)/i,
  wide: /^(jannewaris|febrewaris|maart|april|maaie|juny|july|augustus|septimber|oktober|novimber|desimber)/i
};
var parseMonthPatterns27 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^des/i]
};
var matchDayPatterns27 = {
  narrow: /^[smtwf]/i,
  short: /^(si|mo|ti|wo|to|fr|so)/i,
  abbreviated: /^(snein|moa|tii|woa|ton|fre|sneon)/i,
  wide: /^(snein|moandei|tiisdei|woansdei|tongersdei|freed|sneon)/i
};
var parseDayPatterns27 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^sn/i, /^mo/i, /^ti/i, /^wo/i, /^to/i, /^fr/i, /^sn/i]
};
var matchDayPeriodPatterns27 = {
  any: /^(am|pm|middernacht|middeis|moarns|middei|jûns|nachts)/i
};
var parseDayPeriodPatterns27 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^middei/i,
    morning: /moarns/i,
    afternoon: /^middeis/i,
    evening: /jûns/i,
    night: /nachts/i
  }
};
var match27 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern27,
    parsePattern: parseOrdinalNumberPattern27,
    valueCallback: function valueCallback53(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns27,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns27,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns27,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns27,
    defaultParseWidth: "any",
    valueCallback: function valueCallback54(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns27,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns27,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns27,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns27,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns27,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns27,
    defaultParseWidth: "any"
  })
};
var match_default28 = match27;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/fy/index.js
var locale37 = {
  code: "fy",
  formatDistance: formatDistance_default29,
  formatLong: formatLong_default35,
  formatRelative: formatRelative_default29,
  localize: localize_default29,
  match: match_default28,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var fy_default = locale37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/_lib/formatDistance/index.js
var formatDistanceLocale29 = {
  lessThanXSeconds: {
    one: "nas lugha na diog",
    other: "nas lugha na {{count}} diogan"
  },
  xSeconds: {
    one: "1 diog",
    two: "2 dhiog",
    twenty: "20 diog",
    other: "{{count}} diogan"
  },
  halfAMinute: "leth mhionaid",
  lessThanXMinutes: {
    one: "nas lugha na mionaid",
    other: "nas lugha na {{count}} mionaidean"
  },
  xMinutes: {
    one: "1 mionaid",
    two: "2 mhionaid",
    twenty: "20 mionaid",
    other: "{{count}} mionaidean"
  },
  aboutXHours: {
    one: "mu uair de thìde",
    other: "mu {{count}} uairean de thìde"
  },
  xHours: {
    one: "1 uair de thìde",
    two: "2 uair de thìde",
    twenty: "20 uair de thìde",
    other: "{{count}} uairean de thìde"
  },
  xDays: {
    one: "1 là",
    other: "{{count}} là"
  },
  aboutXWeeks: {
    one: "mu 1 seachdain",
    other: "mu {{count}} seachdainean"
  },
  xWeeks: {
    one: "1 seachdain",
    other: "{{count}} seachdainean"
  },
  aboutXMonths: {
    one: "mu mhìos",
    other: "mu {{count}} mìosan"
  },
  xMonths: {
    one: "1 mìos",
    other: "{{count}} mìosan"
  },
  aboutXYears: {
    one: "mu bhliadhna",
    other: "mu {{count}} bliadhnaichean"
  },
  xYears: {
    one: "1 bhliadhna",
    other: "{{count}} bliadhna"
  },
  overXYears: {
    one: "còrr is bliadhna",
    other: "còrr is {{count}} bliadhnaichean"
  },
  almostXYears: {
    one: "cha mhòr bliadhna",
    other: "cha mhòr {{count}} bliadhnaichean"
  }
};
var formatDistance57 = function formatDistance58(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale29[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2 && !!tokenValue.two) {
    result = tokenValue.two;
  } else if (count === 20 && !!tokenValue.twenty) {
    result = tokenValue.twenty;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "ann an " + result;
    } else {
      return "o chionn " + result;
    }
  }
  return result;
};
var formatDistance_default30 = formatDistance57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/_lib/formatLong/index.js
var dateFormats36 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats36 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats36 = {
  full: "{{date}} 'aig' {{time}}",
  long: "{{date}} 'aig' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong36 = {
  date: buildFormatLongFn({
    formats: dateFormats36,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats36,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats36,
    defaultWidth: "full"
  })
};
var formatLong_default36 = formatLong36;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/_lib/formatRelative/index.js
var formatRelativeLocale29 = {
  lastWeek: "'mu dheireadh' eeee 'aig' p",
  //FIX
  yesterday: "'an-dè aig' p",
  today: "'an-diugh aig' p",
  tomorrow: "'a-màireach aig' p",
  nextWeek: "eeee 'aig' p",
  other: "P"
};
var formatRelative57 = function formatRelative58(token, _date, _baseDate, _options) {
  return formatRelativeLocale29[token];
};
var formatRelative_default30 = formatRelative57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/_lib/localize/index.js
var eraValues29 = {
  narrow: ["R", "A"],
  abbreviated: ["RC", "AD"],
  wide: ["ro Chrìosta", "anno domini"]
};
var quarterValues29 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["C1", "C2", "C3", "C4"],
  wide: ["a' chiad chairteal", "an dàrna cairteal", "an treas cairteal", "an ceathramh cairteal"]
};
var monthValues29 = {
  narrow: ["F", "G", "M", "G", "C", "Ò", "I", "L", "S", "D", "S", "D"],
  abbreviated: ["Faoi", "Gear", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùn", "Sult", "Dàmh", "Samh", "Dùbh"],
  wide: ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"]
};
var dayValues29 = {
  narrow: ["D", "L", "M", "C", "A", "H", "S"],
  short: ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"],
  abbreviated: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
  wide: ["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"]
};
var dayPeriodValues29 = {
  narrow: {
    am: "m",
    pm: "f",
    midnight: "m.o.",
    noon: "m.l.",
    morning: "madainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "oidhche"
  },
  abbreviated: {
    am: "M.",
    pm: "F.",
    midnight: "meadhan oidhche",
    noon: "meadhan là",
    morning: "madainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "oidhche"
  },
  wide: {
    am: "m.",
    pm: "f.",
    midnight: "meadhan oidhche",
    noon: "meadhan là",
    morning: "madainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "oidhche"
  }
};
var formattingDayPeriodValues23 = {
  narrow: {
    am: "m",
    pm: "f",
    midnight: "m.o.",
    noon: "m.l.",
    morning: "sa mhadainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "air an oidhche"
  },
  abbreviated: {
    am: "M.",
    pm: "F.",
    midnight: "meadhan oidhche",
    noon: "meadhan là",
    morning: "sa mhadainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "air an oidhche"
  },
  wide: {
    am: "m.",
    pm: "f.",
    midnight: "meadhan oidhche",
    noon: "meadhan là",
    morning: "sa mhadainn",
    afternoon: "feasgar",
    evening: "feasgar",
    night: "air an oidhche"
  }
};
var ordinalNumber57 = function ordinalNumber58(dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "d";
      case 2:
        return number + "na";
    }
  }
  if (rem100 === 12) {
    return number + "na";
  }
  return number + "mh";
};
var localize29 = {
  ordinalNumber: ordinalNumber57,
  era: buildLocalizeFn({
    values: eraValues29,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues29,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback29(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues29,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues29,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues29,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues23,
    defaultFormattingWidth: "wide"
  })
};
var localize_default30 = localize29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/_lib/match/index.js
var matchOrdinalNumberPattern28 = /^(\d+)(d|na|tr|mh)?/i;
var parseOrdinalNumberPattern28 = /\d+/i;
var matchEraPatterns28 = {
  narrow: /^(r|a)/i,
  abbreviated: /^(r\.?\s?c\.?|r\.?\s?a\.?\s?c\.?|a\.?\s?d\.?|a\.?\s?c\.?)/i,
  wide: /^(ro Chrìosta|ron aois choitchinn|anno domini|aois choitcheann)/i
};
var parseEraPatterns28 = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns28 = {
  narrow: /^[1234]/i,
  abbreviated: /^c[1234]/i,
  wide: /^[1234](cd|na|tr|mh)? cairteal/i
};
var parseQuarterPatterns28 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns28 = {
  narrow: /^[fgmcòilsd]/i,
  abbreviated: /^(faoi|gear|màrt|gibl|cèit|ògmh|iuch|lùn|sult|dàmh|samh|dùbh)/i,
  wide: /^(am faoilleach|an gearran|am màrt|an giblean|an cèitean|an t-Ògmhios|an t-Iuchar|an lùnastal|an t-Sultain|an dàmhair|an t-Samhain|an dùbhlachd)/i
};
var parseMonthPatterns28 = {
  narrow: [/^f/i, /^g/i, /^m/i, /^g/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^s/i, /^d/i, /^s/i, /^d/i],
  any: [/^fa/i, /^ge/i, /^mà/i, /^gi/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^su/i, /^d/i, /^sa/i, /^d/i]
};
var matchDayPatterns28 = {
  narrow: /^[dlmcahs]/i,
  short: /^(dò|lu|mà|ci|ar|ha|sa)/i,
  abbreviated: /^(did|dil|dim|dic|dia|dih|dis)/i,
  wide: /^(didòmhnaich|diluain|dimàirt|diciadain|diardaoin|dihaoine|disathairne)/i
};
var parseDayPatterns28 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i],
  any: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i]
};
var matchDayPeriodPatterns28 = {
  narrow: /^(a|p|mi|n|(san|aig) (madainn|feasgar|feasgar|oidhche))/i,
  any: /^([ap]\.?\s?m\.?|meadhan oidhche|meadhan là|(san|aig) (madainn|feasgar|feasgar|oidhche))/i
};
var parseDayPeriodPatterns28 = {
  any: {
    am: /^m/i,
    pm: /^f/i,
    midnight: /^meadhan oidhche/i,
    noon: /^meadhan là/i,
    morning: /sa mhadainn/i,
    afternoon: /feasgar/i,
    evening: /feasgar/i,
    night: /air an oidhche/i
  }
};
var match28 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern28,
    parsePattern: parseOrdinalNumberPattern28,
    valueCallback: function valueCallback55(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns28,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns28,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns28,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns28,
    defaultParseWidth: "any",
    valueCallback: function valueCallback56(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns28,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns28,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns28,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns28,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns28,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns28,
    defaultParseWidth: "any"
  })
};
var match_default29 = match28;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gd/index.js
var locale38 = {
  code: "gd",
  formatDistance: formatDistance_default30,
  formatLong: formatLong_default36,
  formatRelative: formatRelative_default30,
  localize: localize_default30,
  match: match_default29,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var gd_default = locale38;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/_lib/formatDistance/index.js
var formatDistanceLocale30 = {
  lessThanXSeconds: {
    one: "menos dun segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos dun minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "arredor dunha hora",
    other: "arredor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "arredor dunha semana",
    other: "arredor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "arredor de 1 mes",
    other: "arredor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "arredor dun ano",
    other: "arredor de {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "máis dun ano",
    other: "máis de {{count}} anos"
  },
  almostXYears: {
    one: "case un ano",
    other: "case {{count}} anos"
  }
};
var formatDistance59 = function formatDistance60(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale30[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "hai " + result;
    }
  }
  return result;
};
var formatDistance_default31 = formatDistance59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/_lib/formatLong/index.js
var dateFormats37 = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats37 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats37 = {
  full: "{{date}} 'ás' {{time}}",
  long: "{{date}} 'ás' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong37 = {
  date: buildFormatLongFn({
    formats: dateFormats37,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats37,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats37,
    defaultWidth: "full"
  })
};
var formatLong_default37 = formatLong37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/_lib/formatRelative/index.js
var formatRelativeLocale30 = {
  lastWeek: "'o' eeee 'pasado á' LT",
  yesterday: "'onte á' p",
  today: "'hoxe á' p",
  tomorrow: "'mañá á' p",
  nextWeek: "eeee 'á' p",
  other: "P"
};
var formatRelativeLocalePlural4 = {
  lastWeek: "'o' eeee 'pasado ás' p",
  yesterday: "'onte ás' p",
  today: "'hoxe ás' p",
  tomorrow: "'mañá ás' p",
  nextWeek: "eeee 'ás' p",
  other: "P"
};
var formatRelative59 = function formatRelative60(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural4[token];
  }
  return formatRelativeLocale30[token];
};
var formatRelative_default31 = formatRelative59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/_lib/localize/index.js
var eraValues30 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "despois de cristo"]
};
var quarterValues30 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues30 = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["xan", "feb", "mar", "abr", "mai", "xun", "xul", "ago", "set", "out", "nov", "dec"],
  wide: ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro"]
};
var dayValues30 = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "me", "xo", "ve", "sa"],
  abbreviated: ["dom", "lun", "mar", "mer", "xov", "ven", "sab"],
  wide: ["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"]
};
var dayPeriodValues30 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañá",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoite",
    noon: "mediodía",
    morning: "mañá",
    afternoon: "tarde",
    evening: "tardiña",
    night: "noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoite",
    noon: "mediodía",
    morning: "mañá",
    afternoon: "tarde",
    evening: "tardiña",
    night: "noite"
  }
};
var formattingDayPeriodValues24 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "da mañá",
    afternoon: "da tarde",
    evening: "da tardiña",
    night: "da noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoite",
    noon: "mediodía",
    morning: "da mañá",
    afternoon: "da tarde",
    evening: "da tardiña",
    night: "da noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoite",
    noon: "mediodía",
    morning: "da mañá",
    afternoon: "da tarde",
    evening: "da tardiña",
    night: "da noite"
  }
};
var ordinalNumber59 = function ordinalNumber60(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "º";
};
var localize30 = {
  ordinalNumber: ordinalNumber59,
  era: buildLocalizeFn({
    values: eraValues30,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues30,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback30(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues30,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues30,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues30,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues24,
    defaultFormattingWidth: "wide"
  })
};
var localize_default31 = localize30;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/_lib/match/index.js
var matchOrdinalNumberPattern29 = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern29 = /\d+/i;
var matchEraPatterns29 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era com[uú]n|despois de cristo|era com[uú]n)/i
};
var parseEraPatterns29 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era com[uú]n)/i, /^(despois de cristo|era com[uú]n)/i]
};
var matchQuarterPatterns29 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns29 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns29 = {
  narrow: /^[xfmasond]/i,
  abbreviated: /^(xan|feb|mar|abr|mai|xun|xul|ago|set|out|nov|dec)/i,
  wide: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i
};
var parseMonthPatterns29 = {
  narrow: [/^x/i, /^f/i, /^m/i, /^a/i, /^m/i, /^x/i, /^x/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xun/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i]
};
var matchDayPatterns29 = {
  narrow: /^[dlmxvs]/i,
  short: /^(do|lu|ma|me|xo|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|xov|ven|sab)/i,
  wide: /^(domingo|luns|martes|m[eé]rcores|xoves|venres|s[áa]bado)/i
};
var parseDayPatterns29 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^x/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^me/i, /^xo/i, /^ve/i, /^sa/i]
};
var matchDayPeriodPatterns29 = {
  narrow: /^(a|p|mn|md|(da|[aá]s) (mañ[aá]|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|medianoite|mediod[ií]a|(da|[aá]s) (mañ[aá]|tarde|noite))/i
};
var parseDayPeriodPatterns29 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañ[aá]/i,
    afternoon: /tarde/i,
    evening: /tardiña/i,
    night: /noite/i
  }
};
var match29 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern29,
    parsePattern: parseOrdinalNumberPattern29,
    valueCallback: function valueCallback57(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns29,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns29,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns29,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns29,
    defaultParseWidth: "any",
    valueCallback: function valueCallback58(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns29,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns29,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns29,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns29,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns29,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns29,
    defaultParseWidth: "any"
  })
};
var match_default30 = match29;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gl/index.js
var locale39 = {
  code: "gl",
  formatDistance: formatDistance_default31,
  formatLong: formatLong_default37,
  formatRelative: formatRelative_default31,
  localize: localize_default31,
  match: match_default30,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var gl_default = locale39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/_lib/formatDistance/index.js
var formatDistanceLocale31 = {
  lessThanXSeconds: {
    one: "હમણાં",
    // CLDR #1461
    other: "​આશરે {{count}} સેકંડ"
  },
  xSeconds: {
    one: "1 સેકંડ",
    other: "{{count}} સેકંડ"
  },
  halfAMinute: "અડધી મિનિટ",
  lessThanXMinutes: {
    one: "આ મિનિટ",
    // CLDR #1448
    other: "​આશરે {{count}} મિનિટ"
  },
  xMinutes: {
    one: "1 મિનિટ",
    other: "{{count}} મિનિટ"
  },
  aboutXHours: {
    one: "​આશરે 1 કલાક",
    other: "​આશરે {{count}} કલાક"
  },
  xHours: {
    one: "1 કલાક",
    other: "{{count}} કલાક"
  },
  xDays: {
    one: "1 દિવસ",
    other: "{{count}} દિવસ"
  },
  aboutXWeeks: {
    one: "આશરે 1 અઠવાડિયું",
    other: "આશરે {{count}} અઠવાડિયા"
  },
  xWeeks: {
    one: "1 અઠવાડિયું",
    other: "{{count}} અઠવાડિયા"
  },
  aboutXMonths: {
    one: "આશરે 1 મહિનો",
    other: "આશરે {{count}} મહિના"
  },
  xMonths: {
    one: "1 મહિનો",
    other: "{{count}} મહિના"
  },
  aboutXYears: {
    one: "આશરે 1 વર્ષ",
    other: "આશરે {{count}} વર્ષ"
  },
  xYears: {
    one: "1 વર્ષ",
    other: "{{count}} વર્ષ"
  },
  overXYears: {
    one: "1 વર્ષથી વધુ",
    other: "{{count}} વર્ષથી વધુ"
  },
  almostXYears: {
    one: "લગભગ 1 વર્ષ",
    other: "લગભગ {{count}} વર્ષ"
  }
};
var formatDistance61 = function formatDistance62(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale31[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "માં";
    } else {
      return result + " પહેલાં";
    }
  }
  return result;
};
var formatDistance_default32 = formatDistance61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/_lib/formatLong/index.js
var dateFormats38 = {
  full: "EEEE, d MMMM, y",
  // CLDR #1825
  long: "d MMMM, y",
  // CLDR #1826
  medium: "d MMM, y",
  // CLDR #1827
  short: "d/M/yy"
  // CLDR #1828
};
var timeFormats38 = {
  full: "hh:mm:ss a zzzz",
  // CLDR #1829
  long: "hh:mm:ss a z",
  // CLDR #1830
  medium: "hh:mm:ss a",
  // CLDR #1831
  short: "hh:mm a"
  // CLDR #1832
};
var dateTimeFormats38 = {
  full: "{{date}} {{time}}",
  // CLDR #1833
  long: "{{date}} {{time}}",
  // CLDR #1834
  medium: "{{date}} {{time}}",
  // CLDR #1835
  short: "{{date}} {{time}}"
  // CLDR #1836
};
var formatLong38 = {
  date: buildFormatLongFn({
    formats: dateFormats38,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats38,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats38,
    defaultWidth: "full"
  })
};
var formatLong_default38 = formatLong38;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/_lib/formatRelative/index.js
var formatRelativeLocale31 = {
  lastWeek: "'પાછલા' eeee p",
  // CLDR #1384
  yesterday: "'ગઈકાલે' p",
  // CLDR #1409
  today: "'આજે' p",
  // CLDR #1410
  tomorrow: "'આવતીકાલે' p",
  // CLDR #1411
  nextWeek: "eeee p",
  // CLDR #1386
  other: "P"
};
var formatRelative61 = function formatRelative62(token, _date, _baseDate, _options) {
  return formatRelativeLocale31[token];
};
var formatRelative_default32 = formatRelative61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/_lib/localize/index.js
var eraValues31 = {
  narrow: ["ઈસપૂ", "ઈસ"],
  abbreviated: ["ઈ.સ.પૂર્વે", "ઈ.સ."],
  wide: ["ઈસવીસન પૂર્વે", "ઈસવીસન"]
};
var quarterValues31 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1લો ત્રિમાસ", "2જો ત્રિમાસ", "3જો ત્રિમાસ", "4થો ત્રિમાસ"]
};
var monthValues31 = {
  narrow: ["જા", "ફે", "મા", "એ", "મે", "જૂ", "જુ", "ઓ", "સ", "ઓ", "ન", "ડિ"],
  abbreviated: ["જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટે", "ઓક્ટો", "નવે", "ડિસે"],
  wide: ["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઇ", "ઓગસ્ટ", "સપ્ટેમ્બર", "ઓક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"]
};
var dayValues31 = {
  narrow: ["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"],
  short: ["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"],
  abbreviated: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
  wide: [
    "રવિવાર",
    "સોમવાર",
    "મંગળવાર",
    "બુધવાર",
    "ગુરુવાર",
    "શુક્રવાર",
    "શનિવાર"
    /* Saturday */
  ]
};
var dayPeriodValues31 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "મ.રાત્રિ",
    noon: "બ.",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "​મધ્યરાત્રિ",
    noon: "બપોરે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "​મધ્યરાત્રિ",
    noon: "બપોરે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  }
};
var formattingDayPeriodValues25 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "મ.રાત્રિ",
    noon: "બપોરે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "મધ્યરાત્રિ",
    noon: "બપોરે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "​મધ્યરાત્રિ",
    noon: "બપોરે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે"
  }
};
var ordinalNumber61 = function ordinalNumber62(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize31 = {
  ordinalNumber: ordinalNumber61,
  era: buildLocalizeFn({
    values: eraValues31,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues31,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback31(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues31,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues31,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues31,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues25,
    defaultFormattingWidth: "wide"
  })
};
var localize_default32 = localize31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/_lib/match/index.js
var matchOrdinalNumberPattern30 = /^(\d+)(લ|જ|થ|ઠ્ઠ|મ)?/i;
var parseOrdinalNumberPattern30 = /\d+/i;
var matchEraPatterns30 = {
  narrow: /^(ઈસપૂ|ઈસ)/i,
  abbreviated: /^(ઈ\.સ\.પૂર્વે|ઈ\.સ\.)/i,
  wide: /^(ઈસવીસન\sપૂર્વે|ઈસવીસન)/i
};
var parseEraPatterns30 = {
  any: [/^ઈસપૂ/i, /^ઈસ/i]
};
var matchQuarterPatterns30 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](લો|જો|થો)? ત્રિમાસ/i
};
var parseQuarterPatterns30 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns30 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[જાફેમાએમેજૂજુઓસઓનડિ]/i,
  abbreviated: /^(જાન્યુ|ફેબ્રુ|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઈ|ઑગસ્ટ|સપ્ટે|ઓક્ટો|નવે|ડિસે)/i,
  wide: /^(જાન્યુઆરી|ફેબ્રુઆરી|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઇ|ઓગસ્ટ|સપ્ટેમ્બર|ઓક્ટોબર|નવેમ્બર|ડિસેમ્બર)/i
};
var parseMonthPatterns30 = {
  narrow: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i],
  any: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i]
};
var matchDayPatterns30 = {
  narrow: /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  short: /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  abbreviated: /^(રવિ|સોમ|મંગળ|બુધ|ગુરુ|શુક્ર|શનિ)/i,
  wide: /^(રવિવાર|સોમવાર|મંગળવાર|બુધવાર|ગુરુવાર|શુક્રવાર|શનિવાર)/i
};
var parseDayPatterns30 = {
  narrow: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i],
  any: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i]
};
var matchDayPeriodPatterns30 = {
  narrow: /^(a|p|મ\.?|સ|બ|સાં|રા)/i,
  any: /^(a|p|મ\.?|સ|બ|સાં|રા)/i
};
var parseDayPeriodPatterns30 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^મ\.?/i,
    noon: /^બ/i,
    morning: /સ/i,
    afternoon: /બ/i,
    evening: /સાં/i,
    night: /રા/i
  }
};
var match30 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern30,
    parsePattern: parseOrdinalNumberPattern30,
    valueCallback: function valueCallback59(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns30,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns30,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns30,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns30,
    defaultParseWidth: "any",
    valueCallback: function valueCallback60(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns30,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns30,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns30,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns30,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns30,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns30,
    defaultParseWidth: "any"
  })
};
var match_default31 = match30;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/gu/index.js
var locale40 = {
  code: "gu",
  formatDistance: formatDistance_default32,
  formatLong: formatLong_default38,
  formatRelative: formatRelative_default32,
  localize: localize_default32,
  match: match_default31,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var gu_default = locale40;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/_lib/formatDistance/index.js
var formatDistanceLocale32 = {
  lessThanXSeconds: {
    one: "פחות משנייה",
    two: "פחות משתי שניות",
    other: "פחות מ־{{count}} שניות"
  },
  xSeconds: {
    one: "שנייה",
    two: "שתי שניות",
    other: "{{count}} שניות"
  },
  halfAMinute: "חצי דקה",
  lessThanXMinutes: {
    one: "פחות מדקה",
    two: "פחות משתי דקות",
    other: "פחות מ־{{count}} דקות"
  },
  xMinutes: {
    one: "דקה",
    two: "שתי דקות",
    other: "{{count}} דקות"
  },
  aboutXHours: {
    one: "כשעה",
    two: "כשעתיים",
    other: "כ־{{count}} שעות"
  },
  xHours: {
    one: "שעה",
    two: "שעתיים",
    other: "{{count}} שעות"
  },
  xDays: {
    one: "יום",
    two: "יומיים",
    other: "{{count}} ימים"
  },
  aboutXWeeks: {
    one: "כשבוע",
    two: "כשבועיים",
    other: "כ־{{count}} שבועות"
  },
  xWeeks: {
    one: "שבוע",
    two: "שבועיים",
    other: "{{count}} שבועות"
  },
  aboutXMonths: {
    one: "כחודש",
    two: "כחודשיים",
    other: "כ־{{count}} חודשים"
  },
  xMonths: {
    one: "חודש",
    two: "חודשיים",
    other: "{{count}} חודשים"
  },
  aboutXYears: {
    one: "כשנה",
    two: "כשנתיים",
    other: "כ־{{count}} שנים"
  },
  xYears: {
    one: "שנה",
    two: "שנתיים",
    other: "{{count}} שנים"
  },
  overXYears: {
    one: "יותר משנה",
    two: "יותר משנתיים",
    other: "יותר מ־{{count}} שנים"
  },
  almostXYears: {
    one: "כמעט שנה",
    two: "כמעט שנתיים",
    other: "כמעט {{count}} שנים"
  }
};
var formatDistance63 = function formatDistance64(token, count, options) {
  if (token === "xDays" && options !== null && options !== void 0 && options.addSuffix && count <= 2) {
    if (options.comparison && options.comparison > 0) {
      return count === 1 ? "מחר" : "מחרתיים";
    }
    return count === 1 ? "אתמול" : "שלשום";
  }
  var result;
  var tokenValue = formatDistanceLocale32[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2) {
    result = tokenValue.two;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "בעוד " + result;
    } else {
      return "לפני " + result;
    }
  }
  return result;
};
var formatDistance_default33 = formatDistance63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/_lib/formatLong/index.js
var dateFormats39 = {
  full: "EEEE, d בMMMM y",
  long: "d בMMMM y",
  medium: "d בMMM y",
  short: "d.M.y"
};
var timeFormats39 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats39 = {
  full: "{{date}} 'בשעה' {{time}}",
  long: "{{date}} 'בשעה' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong39 = {
  date: buildFormatLongFn({
    formats: dateFormats39,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats39,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats39,
    defaultWidth: "full"
  })
};
var formatLong_default39 = formatLong39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/_lib/formatRelative/index.js
var formatRelativeLocale32 = {
  lastWeek: "eeee 'שעבר בשעה' p",
  yesterday: "'אתמול בשעה' p",
  today: "'היום בשעה' p",
  tomorrow: "'מחר בשעה' p",
  nextWeek: "eeee 'בשעה' p",
  other: "P"
};
var formatRelative63 = function formatRelative64(token, _date, _baseDate, _options) {
  return formatRelativeLocale32[token];
};
var formatRelative_default33 = formatRelative63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/_lib/localize/index.js
var eraValues32 = {
  narrow: ["לפנה״ס", "לספירה"],
  abbreviated: ["לפנה״ס", "לספירה"],
  wide: ["לפני הספירה", "לספירה"]
};
var quarterValues32 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["רבעון 1", "רבעון 2", "רבעון 3", "רבעון 4"]
};
var monthValues32 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"],
  wide: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
};
var dayValues32 = {
  narrow: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
  short: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
  abbreviated: ["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת"],
  wide: ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"]
};
var dayPeriodValues32 = {
  narrow: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בוקר",
    afternoon: "אחר הצהריים",
    evening: "ערב",
    night: "לילה"
  },
  abbreviated: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בוקר",
    afternoon: "אחר הצהריים",
    evening: "ערב",
    night: "לילה"
  },
  wide: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בוקר",
    afternoon: "אחר הצהריים",
    evening: "ערב",
    night: "לילה"
  }
};
var formattingDayPeriodValues26 = {
  narrow: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בבוקר",
    afternoon: "בצהריים",
    evening: "בערב",
    night: "בלילה"
  },
  abbreviated: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בבוקר",
    afternoon: "אחר הצהריים",
    evening: "בערב",
    night: "בלילה"
  },
  wide: {
    am: "לפנה״צ",
    pm: "אחה״צ",
    midnight: "חצות",
    noon: "צהריים",
    morning: "בבוקר",
    afternoon: "אחר הצהריים",
    evening: "בערב",
    night: "בלילה"
  }
};
var ordinalNumber63 = function ordinalNumber64(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  if (number <= 0 || number > 10)
    return String(number);
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  var isFemale = ["year", "hour", "minute", "second"].indexOf(unit) >= 0;
  var male = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שביעי", "שמיני", "תשיעי", "עשירי"];
  var female = ["ראשונה", "שנייה", "שלישית", "רביעית", "חמישית", "שישית", "שביעית", "שמינית", "תשיעית", "עשירית"];
  var index = number - 1;
  return isFemale ? female[index] : male[index];
};
var localize32 = {
  ordinalNumber: ordinalNumber63,
  era: buildLocalizeFn({
    values: eraValues32,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues32,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback32(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues32,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues32,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues32,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues26,
    defaultFormattingWidth: "wide"
  })
};
var localize_default33 = localize32;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/_lib/match/index.js
var matchOrdinalNumberPattern31 = /^(\d+|(ראשון|שני|שלישי|רביעי|חמישי|שישי|שביעי|שמיני|תשיעי|עשירי|ראשונה|שנייה|שלישית|רביעית|חמישית|שישית|שביעית|שמינית|תשיעית|עשירית))/i;
var parseOrdinalNumberPattern31 = /^(\d+|רא|שנ|של|רב|ח|שי|שב|שמ|ת|ע)/i;
var matchEraPatterns31 = {
  narrow: /^ל(ספירה|פנה״ס)/i,
  abbreviated: /^ל(ספירה|פנה״ס)/i,
  wide: /^ל(פני ה)?ספירה/i
};
var parseEraPatterns31 = {
  any: [/^לפ/i, /^לס/i]
};
var matchQuarterPatterns31 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^רבעון [1234]/i
};
var parseQuarterPatterns31 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns31 = {
  narrow: /^\d+/i,
  abbreviated: /^(ינו|פבר|מרץ|אפר|מאי|יוני|יולי|אוג|ספט|אוק|נוב|דצמ)׳?/i,
  wide: /^(ינואר|פברואר|מרץ|אפריל|מאי|יוני|יולי|אוגוסט|ספטמבר|אוקטובר|נובמבר|דצמבר)/i
};
var parseMonthPatterns31 = {
  narrow: [/^1$/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ינ/i, /^פ/i, /^מר/i, /^אפ/i, /^מא/i, /^יונ/i, /^יול/i, /^אוג/i, /^ס/i, /^אוק/i, /^נ/i, /^ד/i]
};
var matchDayPatterns31 = {
  narrow: /^[אבגדהוש]׳/i,
  short: /^[אבגדהוש]׳/i,
  abbreviated: /^(שבת|יום (א|ב|ג|ד|ה|ו)׳)/i,
  wide: /^יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)/i
};
var parseDayPatterns31 = {
  abbreviated: [/א׳$/i, /ב׳$/i, /ג׳$/i, /ד׳$/i, /ה׳$/i, /ו׳$/i, /^ש/i],
  wide: [/ן$/i, /ני$/i, /לישי$/i, /עי$/i, /מישי$/i, /שישי$/i, /ת$/i],
  any: [/^א/i, /^ב/i, /^ג/i, /^ד/i, /^ה/i, /^ו/i, /^ש/i]
};
var matchDayPeriodPatterns31 = {
  any: /^(אחר ה|ב)?(חצות|צהריים|בוקר|ערב|לילה|אחה״צ|לפנה״צ)/i
};
var parseDayPeriodPatterns31 = {
  any: {
    am: /^לפ/i,
    pm: /^אחה/i,
    midnight: /^ח/i,
    noon: /^צ/i,
    morning: /בוקר/i,
    afternoon: /בצ|אחר/i,
    evening: /ערב/i,
    night: /לילה/i
  }
};
var ordinalName = ["רא", "שנ", "של", "רב", "ח", "שי", "שב", "שמ", "ת", "ע"];
var match31 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern31,
    parsePattern: parseOrdinalNumberPattern31,
    valueCallback: function valueCallback61(value) {
      var number = parseInt(value, 10);
      return isNaN(number) ? ordinalName.indexOf(value) + 1 : number;
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns31,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns31,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns31,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns31,
    defaultParseWidth: "any",
    valueCallback: function valueCallback62(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns31,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns31,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns31,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns31,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns31,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns31,
    defaultParseWidth: "any"
  })
};
var match_default32 = match31;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/he/index.js
var locale41 = {
  code: "he",
  formatDistance: formatDistance_default33,
  formatLong: formatLong_default39,
  formatRelative: formatRelative_default33,
  localize: localize_default33,
  match: match_default32,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var he_default = locale41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/_lib/localize/index.js
var numberValues2 = {
  locale: {
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
    "0": "०"
  },
  number: {
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
    "०": "0"
  }
};
var eraValues33 = {
  narrow: ["ईसा-पूर्व", "ईस्वी"],
  abbreviated: ["ईसा-पूर्व", "ईस्वी"],
  wide: ["ईसा-पूर्व", "ईसवी सन"]
};
var quarterValues33 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ति1", "ति2", "ति3", "ति4"],
  wide: ["पहली तिमाही", "दूसरी तिमाही", "तीसरी तिमाही", "चौथी तिमाही"]
};
var monthValues33 = {
  narrow: ["ज", "फ़", "मा", "अ", "मई", "जू", "जु", "अग", "सि", "अक्टू", "न", "दि"],
  abbreviated: ["जन", "फ़र", "मार्च", "अप्रैल", "मई", "जून", "जुल", "अग", "सित", "अक्टू", "नव", "दिस"],
  wide: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
};
var dayValues33 = {
  narrow: ["र", "सो", "मं", "बु", "गु", "शु", "श"],
  short: ["र", "सो", "मं", "बु", "गु", "शु", "श"],
  abbreviated: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  wide: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
};
var dayPeriodValues33 = {
  narrow: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  },
  abbreviated: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  },
  wide: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  }
};
var formattingDayPeriodValues27 = {
  narrow: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  },
  abbreviated: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  },
  wide: {
    am: "पूर्वाह्न",
    pm: "अपराह्न",
    midnight: "मध्यरात्रि",
    noon: "दोपहर",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात"
  }
};
var ordinalNumber65 = function ordinalNumber66(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return numberToLocale2(number);
};
function localeToNumber(locale93) {
  var enNumber = locale93.toString().replace(/[१२३४५६७८९०]/g, function(match82) {
    return numberValues2.number[match82];
  });
  return Number(enNumber);
}
function numberToLocale2(enNumber) {
  return enNumber.toString().replace(/\d/g, function(match82) {
    return numberValues2.locale[match82];
  });
}
var localize33 = {
  ordinalNumber: ordinalNumber65,
  era: buildLocalizeFn({
    values: eraValues33,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues33,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback33(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues33,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues33,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues33,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues27,
    defaultFormattingWidth: "wide"
  })
};
var localize_default34 = localize33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/_lib/formatDistance/index.js
var formatDistanceLocale33 = {
  lessThanXSeconds: {
    one: "१ सेकंड से कम",
    // CLDR #1310
    other: "{{count}} सेकंड से कम"
  },
  xSeconds: {
    one: "१ सेकंड",
    other: "{{count}} सेकंड"
  },
  halfAMinute: "आधा मिनट",
  lessThanXMinutes: {
    one: "१ मिनट से कम",
    other: "{{count}} मिनट से कम"
  },
  xMinutes: {
    one: "१ मिनट",
    // CLDR #1307
    other: "{{count}} मिनट"
  },
  aboutXHours: {
    one: "लगभग १ घंटा",
    other: "लगभग {{count}} घंटे"
  },
  xHours: {
    one: "१ घंटा",
    // CLDR #1304
    other: "{{count}} घंटे"
    // CLDR #4467
  },
  xDays: {
    one: "१ दिन",
    // CLDR #1286
    other: "{{count}} दिन"
  },
  aboutXWeeks: {
    one: "लगभग १ सप्ताह",
    other: "लगभग {{count}} सप्ताह"
  },
  xWeeks: {
    one: "१ सप्ताह",
    other: "{{count}} सप्ताह"
  },
  aboutXMonths: {
    one: "लगभग १ महीना",
    other: "लगभग {{count}} महीने"
  },
  xMonths: {
    one: "१ महीना",
    other: "{{count}} महीने"
  },
  aboutXYears: {
    one: "लगभग १ वर्ष",
    other: "लगभग {{count}} वर्ष"
    // CLDR #4823
  },
  xYears: {
    one: "१ वर्ष",
    other: "{{count}} वर्ष"
  },
  overXYears: {
    one: "१ वर्ष से अधिक",
    other: "{{count}} वर्ष से अधिक"
  },
  almostXYears: {
    one: "लगभग १ वर्ष",
    other: "लगभग {{count}} वर्ष"
  }
};
var formatDistance65 = function formatDistance66(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale33[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", numberToLocale2(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "मे ";
    } else {
      return result + " पहले";
    }
  }
  return result;
};
var formatDistance_default34 = formatDistance65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/_lib/formatLong/index.js
var dateFormats40 = {
  full: "EEEE, do MMMM, y",
  // CLDR #1787
  long: "do MMMM, y",
  // CLDR #1788
  medium: "d MMM, y",
  // CLDR #1789
  short: "dd/MM/yyyy"
  // CLDR #1790
};
var timeFormats40 = {
  full: "h:mm:ss a zzzz",
  // CLDR #1791
  long: "h:mm:ss a z",
  // CLDR #1792
  medium: "h:mm:ss a",
  // CLDR #1793
  short: "h:mm a"
  // CLDR #1794
};
var dateTimeFormats40 = {
  full: "{{date}} 'को' {{time}}",
  // CLDR #1795
  long: "{{date}} 'को' {{time}}",
  // CLDR #1796
  medium: "{{date}}, {{time}}",
  // CLDR #1797
  short: "{{date}}, {{time}}"
  // CLDR #1798
};
var formatLong40 = {
  date: buildFormatLongFn({
    formats: dateFormats40,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats40,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats40,
    defaultWidth: "full"
  })
};
var formatLong_default40 = formatLong40;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/_lib/formatRelative/index.js
var formatRelativeLocale33 = {
  lastWeek: "'पिछले' eeee p",
  yesterday: "'कल' p",
  today: "'आज' p",
  tomorrow: "'कल' p",
  nextWeek: "eeee 'को' p",
  other: "P"
};
var formatRelative65 = function formatRelative66(token, _date, _baseDate, _options) {
  return formatRelativeLocale33[token];
};
var formatRelative_default34 = formatRelative65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/_lib/match/index.js
var matchOrdinalNumberPattern32 = /^[०१२३४५६७८९]+/i;
var parseOrdinalNumberPattern32 = /^[०१२३४५६७८९]+/i;
var matchEraPatterns32 = {
  narrow: /^(ईसा-पूर्व|ईस्वी)/i,
  abbreviated: /^(ईसा\.?\s?पूर्व\.?|ईसा\.?)/i,
  wide: /^(ईसा-पूर्व|ईसवी पूर्व|ईसवी सन|ईसवी)/i
};
var parseEraPatterns32 = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns32 = {
  narrow: /^[1234]/i,
  abbreviated: /^ति[1234]/i,
  wide: /^[1234](पहली|दूसरी|तीसरी|चौथी)? तिमाही/i
};
var parseQuarterPatterns32 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns32 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[जफ़माअप्मईजूनजुअगसिअक्तनदि]/i,
  abbreviated: /^(जन|फ़र|मार्च|अप्|मई|जून|जुल|अग|सित|अक्तू|नव|दिस)/i,
  wide: /^(जनवरी|फ़रवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्तूबर|नवंबर|दिसंबर)/i
};
var parseMonthPatterns32 = {
  narrow: [/^ज/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^न/i, /^दि/i],
  any: [/^जन/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^नव/i, /^दिस/i]
};
var matchDayPatterns32 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[रविसोममंगलबुधगुरुशुक्रशनि]/i,
  short: /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  abbreviated: /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  wide: /^(रविवार|सोमवार|मंगलवार|बुधवार|गुरुवार|शुक्रवार|शनिवार)/i
};
var parseDayPatterns32 = {
  narrow: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i],
  any: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i]
};
var matchDayPeriodPatterns32 = {
  narrow: /^(पू|अ|म|द.\?|सु|दो|शा|रा)/i,
  any: /^(पूर्वाह्न|अपराह्न|म|द.\?|सु|दो|शा|रा)/i
};
var parseDayPeriodPatterns32 = {
  any: {
    am: /^पूर्वाह्न/i,
    pm: /^अपराह्न/i,
    midnight: /^मध्य/i,
    noon: /^दो/i,
    morning: /सु/i,
    afternoon: /दो/i,
    evening: /शा/i,
    night: /रा/i
  }
};
var match32 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern32,
    parsePattern: parseOrdinalNumberPattern32,
    valueCallback: localeToNumber
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns32,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns32,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns32,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns32,
    defaultParseWidth: "any",
    valueCallback: function valueCallback63(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns32,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns32,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns32,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns32,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns32,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns32,
    defaultParseWidth: "any"
  })
};
var match_default33 = match32;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hi/index.js
var locale42 = {
  code: "hi",
  formatDistance: formatDistance_default34,
  formatLong: formatLong_default40,
  formatRelative: formatRelative_default34,
  localize: localize_default34,
  match: match_default33,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 4
  }
};
var hi_default = locale42;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/_lib/formatDistance/index.js
var formatDistanceLocale34 = {
  lessThanXSeconds: {
    one: {
      standalone: "manje od 1 sekunde",
      withPrepositionAgo: "manje od 1 sekunde",
      withPrepositionIn: "manje od 1 sekundu"
    },
    dual: "manje od {{count}} sekunde",
    other: "manje od {{count}} sekundi"
  },
  xSeconds: {
    one: {
      standalone: "1 sekunda",
      withPrepositionAgo: "1 sekunde",
      withPrepositionIn: "1 sekundu"
    },
    dual: "{{count}} sekunde",
    other: "{{count}} sekundi"
  },
  halfAMinute: "pola minute",
  lessThanXMinutes: {
    one: {
      standalone: "manje od 1 minute",
      withPrepositionAgo: "manje od 1 minute",
      withPrepositionIn: "manje od 1 minutu"
    },
    dual: "manje od {{count}} minute",
    other: "manje od {{count}} minuta"
  },
  xMinutes: {
    one: {
      standalone: "1 minuta",
      withPrepositionAgo: "1 minute",
      withPrepositionIn: "1 minutu"
    },
    dual: "{{count}} minute",
    other: "{{count}} minuta"
  },
  aboutXHours: {
    one: {
      standalone: "oko 1 sat",
      withPrepositionAgo: "oko 1 sat",
      withPrepositionIn: "oko 1 sat"
    },
    dual: "oko {{count}} sata",
    other: "oko {{count}} sati"
  },
  xHours: {
    one: {
      standalone: "1 sat",
      withPrepositionAgo: "1 sat",
      withPrepositionIn: "1 sat"
    },
    dual: "{{count}} sata",
    other: "{{count}} sati"
  },
  xDays: {
    one: {
      standalone: "1 dan",
      withPrepositionAgo: "1 dan",
      withPrepositionIn: "1 dan"
    },
    dual: "{{count}} dana",
    other: "{{count}} dana"
  },
  aboutXWeeks: {
    one: {
      standalone: "oko 1 tjedan",
      withPrepositionAgo: "oko 1 tjedan",
      withPrepositionIn: "oko 1 tjedan"
    },
    dual: "oko {{count}} tjedna",
    other: "oko {{count}} tjedana"
  },
  xWeeks: {
    one: {
      standalone: "1 tjedan",
      withPrepositionAgo: "1 tjedan",
      withPrepositionIn: "1 tjedan"
    },
    dual: "{{count}} tjedna",
    other: "{{count}} tjedana"
  },
  aboutXMonths: {
    one: {
      standalone: "oko 1 mjesec",
      withPrepositionAgo: "oko 1 mjesec",
      withPrepositionIn: "oko 1 mjesec"
    },
    dual: "oko {{count}} mjeseca",
    other: "oko {{count}} mjeseci"
  },
  xMonths: {
    one: {
      standalone: "1 mjesec",
      withPrepositionAgo: "1 mjesec",
      withPrepositionIn: "1 mjesec"
    },
    dual: "{{count}} mjeseca",
    other: "{{count}} mjeseci"
  },
  aboutXYears: {
    one: {
      standalone: "oko 1 godinu",
      withPrepositionAgo: "oko 1 godinu",
      withPrepositionIn: "oko 1 godinu"
    },
    dual: "oko {{count}} godine",
    other: "oko {{count}} godina"
  },
  xYears: {
    one: {
      standalone: "1 godina",
      withPrepositionAgo: "1 godine",
      withPrepositionIn: "1 godinu"
    },
    dual: "{{count}} godine",
    other: "{{count}} godina"
  },
  overXYears: {
    one: {
      standalone: "preko 1 godinu",
      withPrepositionAgo: "preko 1 godinu",
      withPrepositionIn: "preko 1 godinu"
    },
    dual: "preko {{count}} godine",
    other: "preko {{count}} godina"
  },
  almostXYears: {
    one: {
      standalone: "gotovo 1 godinu",
      withPrepositionAgo: "gotovo 1 godinu",
      withPrepositionIn: "gotovo 1 godinu"
    },
    dual: "gotovo {{count}} godine",
    other: "gotovo {{count}} godina"
  }
};
var formatDistance67 = function formatDistance68(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale34[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        result = tokenValue.one.withPrepositionIn;
      } else {
        result = tokenValue.one.withPrepositionAgo;
      }
    } else {
      result = tokenValue.one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== "1") {
    result = tokenValue.dual.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "za " + result;
    } else {
      return "prije " + result;
    }
  }
  return result;
};
var formatDistance_default35 = formatDistance67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/_lib/formatLong/index.js
var dateFormats41 = {
  full: "EEEE, d. MMMM y.",
  long: "d. MMMM y.",
  medium: "d. MMM y.",
  short: "dd. MM. y."
};
var timeFormats41 = {
  full: "HH:mm:ss (zzzz)",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats41 = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong41 = {
  date: buildFormatLongFn({
    formats: dateFormats41,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats41,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats41,
    defaultWidth: "full"
  })
};
var formatLong_default41 = formatLong41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/_lib/formatRelative/index.js
var formatRelativeLocale34 = {
  lastWeek: function lastWeek6(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'prošlu nedjelju u' p";
      case 3:
        return "'prošlu srijedu u' p";
      case 6:
        return "'prošlu subotu u' p";
      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'jučer u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function nextWeek6(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'iduću nedjelju u' p";
      case 3:
        return "'iduću srijedu u' p";
      case 6:
        return "'iduću subotu u' p";
      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  other: "P"
};
var formatRelative67 = function formatRelative68(token, date, _baseDate, _options) {
  var format = formatRelativeLocale34[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default35 = formatRelative67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/_lib/localize/index.js
var eraValues34 = {
  narrow: ["pr.n.e.", "AD"],
  abbreviated: ["pr. Kr.", "po. Kr."],
  wide: ["Prije Krista", "Poslije Krista"]
};
var quarterValues34 = {
  narrow: ["1.", "2.", "3.", "4."],
  abbreviated: ["1. kv.", "2. kv.", "3. kv.", "4. kv."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues34 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
  wide: ["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"]
};
var formattingMonthValues9 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
  wide: ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenog", "prosinca"]
};
var dayValues34 = {
  narrow: ["N", "P", "U", "S", "Č", "P", "S"],
  short: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
  abbreviated: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
  wide: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"]
};
var formattingDayPeriodValues28 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "popodne",
    evening: "navečer",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "popodne",
    evening: "navečer",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "poslije podne",
    evening: "navečer",
    night: "noću"
  }
};
var dayPeriodValues34 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "popodne",
    evening: "navečer",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "popodne",
    evening: "navečer",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutro",
    afternoon: "poslije podne",
    evening: "navečer",
    night: "noću"
  }
};
var ordinalNumber67 = function ordinalNumber68(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize34 = {
  ordinalNumber: ordinalNumber67,
  era: buildLocalizeFn({
    values: eraValues34,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues34,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback34(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues34,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues9,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues34,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues34,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues28,
    defaultFormattingWidth: "wide"
  })
};
var localize_default35 = localize34;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/_lib/match/index.js
var matchOrdinalNumberPattern33 = /^(\d+)\./i;
var parseOrdinalNumberPattern33 = /\d+/i;
var matchEraPatterns33 = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Kr\.|po\.\s?Kr\.)/i,
  wide: /^(Prije Krista|prije nove ere|Poslije Krista|nova era)/i
};
var parseEraPatterns33 = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns33 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns33 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns33 = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(sij|velj|(ožu|ozu)|tra|svi|lip|srp|kol|ruj|lis|stu|pro)/i,
  wide: /^((siječanj|siječnja|sijecanj|sijecnja)|(veljača|veljače|veljaca|veljace)|(ožujak|ožujka|ozujak|ozujka)|(travanj|travnja)|(svibanj|svibnja)|(lipanj|lipnja)|(srpanj|srpnja)|(kolovoz|kolovoza)|(rujan|rujna)|(listopad|listopada)|(studeni|studenog)|(prosinac|prosinca))/i
};
var parseMonthPatterns33 = {
  narrow: [/1/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i, /8/i, /9/i, /10/i, /11/i, /12/i],
  abbreviated: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i],
  wide: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i]
};
var matchDayPatterns33 = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
  wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns33 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns33 = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|navecer|navečer|noću|poslije podne|ujutro)/i
};
var parseDayPeriodPatterns33 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(poslije\s|po)+podne/i,
    evening: /(navece|naveče)/i,
    night: /(nocu|noću)/i
  }
};
var match33 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern33,
    parsePattern: parseOrdinalNumberPattern33,
    valueCallback: function valueCallback64(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns33,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns33,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns33,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns33,
    defaultParseWidth: "any",
    valueCallback: function valueCallback65(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns33,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns33,
    defaultParseWidth: "wide"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns33,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns33,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns33,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns33,
    defaultParseWidth: "any"
  })
};
var match_default34 = match33;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hr/index.js
var locale43 = {
  code: "hr",
  formatDistance: formatDistance_default35,
  formatLong: formatLong_default41,
  formatRelative: formatRelative_default35,
  localize: localize_default35,
  match: match_default34,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var hr_default = locale43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/_lib/formatDistance/index.js
var formatDistanceLocale35 = {
  lessThanXSeconds: {
    one: "mwens pase yon segond",
    other: "mwens pase {{count}} segond"
  },
  xSeconds: {
    one: "1 segond",
    other: "{{count}} segond"
  },
  halfAMinute: "30 segond",
  lessThanXMinutes: {
    one: "mwens pase yon minit",
    other: "mwens pase {{count}} minit"
  },
  xMinutes: {
    one: "1 minit",
    other: "{{count}} minit"
  },
  aboutXHours: {
    one: "anviwon inè",
    other: "anviwon {{count}} è"
  },
  xHours: {
    one: "1 lè",
    other: "{{count}} lè"
  },
  xDays: {
    one: "1 jou",
    other: "{{count}} jou"
  },
  aboutXWeeks: {
    one: "anviwon 1 semèn",
    other: "anviwon {{count}} semèn"
  },
  xWeeks: {
    one: "1 semèn",
    other: "{{count}} semèn"
  },
  aboutXMonths: {
    one: "anviwon 1 mwa",
    other: "anviwon {{count}} mwa"
  },
  xMonths: {
    one: "1 mwa",
    other: "{{count}} mwa"
  },
  aboutXYears: {
    one: "anviwon 1 an",
    other: "anviwon {{count}} an"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} an"
  },
  overXYears: {
    one: "plis pase 1 an",
    other: "plis pase {{count}} an"
  },
  almostXYears: {
    one: "prèske 1 an",
    other: "prèske {{count}} an"
  }
};
var formatDistance69 = function formatDistance70(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale35[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "nan " + result;
    } else {
      return "sa fè " + result;
    }
  }
  return result;
};
var formatDistance_default36 = formatDistance69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/_lib/formatLong/index.js
var dateFormats42 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats42 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats42 = {
  full: "{{date}} 'nan lè' {{time}}",
  long: "{{date}} 'nan lè' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong42 = {
  date: buildFormatLongFn({
    formats: dateFormats42,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats42,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats42,
    defaultWidth: "full"
  })
};
var formatLong_default42 = formatLong42;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/_lib/formatRelative/index.js
var formatRelativeLocale35 = {
  lastWeek: "eeee 'pase nan lè' p",
  yesterday: "'yè nan lè' p",
  today: "'jodi a' p",
  tomorrow: "'demen nan lè' p'",
  nextWeek: "eeee 'pwochen nan lè' p",
  other: "P"
};
var formatRelative69 = function formatRelative70(token, _date, _baseDate, _options) {
  return formatRelativeLocale35[token];
};
var formatRelative_default36 = formatRelative69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/_lib/localize/index.js
var eraValues35 = {
  narrow: ["av. J.-K", "ap. J.-K"],
  abbreviated: ["av. J.-K", "ap. J.-K"],
  wide: ["anvan Jezi Kris", "apre Jezi Kris"]
};
var quarterValues35 = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1ye trim.", "2yèm trim.", "3yèm trim.", "4yèm trim."],
  wide: ["1ye trimès", "2yèm trimès", "3yèm trimès", "4yèm trimès"]
};
var monthValues35 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "O", "S", "O", "N", "D"],
  abbreviated: ["janv.", "fevr.", "mas", "avr.", "me", "jen", "jiyè", "out", "sept.", "okt.", "nov.", "des."],
  wide: ["janvye", "fevrye", "mas", "avril", "me", "jen", "jiyè", "out", "septanm", "oktòb", "novanm", "desanm"]
};
var dayValues35 = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "le", "ma", "mè", "je", "va", "sa"],
  abbreviated: ["dim.", "len.", "mad.", "mèk.", "jed.", "van.", "sam."],
  wide: ["dimanch", "lendi", "madi", "mèkredi", "jedi", "vandredi", "samdi"]
};
var dayPeriodValues35 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minwit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "swa",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minwit",
    noon: "midi",
    morning: "maten",
    afternoon: "aprèmidi",
    evening: "swa",
    night: "maten"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minwit",
    noon: "midi",
    morning: "nan maten",
    afternoon: "nan aprèmidi",
    evening: "nan aswè",
    night: "nan maten"
  }
};
var ordinalNumber69 = function ordinalNumber70(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  if (number === 0)
    return String(number);
  var suffix = number === 1 ? "ye" : "yèm";
  return number + suffix;
};
var localize35 = {
  ordinalNumber: ordinalNumber69,
  era: buildLocalizeFn({
    values: eraValues35,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues35,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback35(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues35,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues35,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues35,
    defaultWidth: "wide"
  })
};
var localize_default36 = localize35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/_lib/match/index.js
var matchOrdinalNumberPattern34 = /^(\d+)(ye|yèm)?/i;
var parseOrdinalNumberPattern34 = /\d+/i;
var matchEraPatterns34 = {
  narrow: /^(av\.J\.K|ap\.J\.K|ap\.J\.-K)/i,
  abbreviated: /^(av\.J\.-K|av\.J-K|apr\.J\.-K|apr\.J-K|ap\.J-K)/i,
  wide: /^(avan Jezi Kris|apre Jezi Kris)/i
};
var parseEraPatterns34 = {
  any: [/^av/i, /^ap/i]
};
var matchQuarterPatterns34 = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](ye|yèm)? trimès/i
};
var parseQuarterPatterns34 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns34 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|fevr|mas|avr|me|jen|jiyè|out|sept|okt|nov|des)\.?/i,
  wide: /^(janvye|fevrye|mas|avril|me|jen|jiyè|out|septanm|oktòb|novanm|desanm)/i
};
var parseMonthPatterns34 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^o/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^av/i, /^me/i, /^je/i, /^ji/i, /^ou/i, /^s/i, /^ok/i, /^n/i, /^d/i]
};
var matchDayPatterns34 = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|le|ma|me|je|va|sa)/i,
  abbreviated: /^(dim|len|mad|mèk|jed|van|sam)\.?/i,
  wide: /^(dimanch|lendi|madi|mèkredi|jedi|vandredi|samdi)/i
};
var parseDayPatterns34 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^le/i, /^ma/i, /^mè/i, /^je/i, /^va/i, /^sa/i]
};
var matchDayPeriodPatterns34 = {
  narrow: /^(a|p|minwit|midi|mat\.?|ap\.?m\.?|swa)/i,
  any: /^([ap]\.?\s?m\.?|nan maten|nan aprèmidi|nan aswè)/i
};
var parseDayPeriodPatterns34 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /sw/i,
    night: /nwit/i
  }
};
var match34 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern34,
    parsePattern: parseOrdinalNumberPattern34,
    valueCallback: function valueCallback66(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns34,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns34,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns34,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns34,
    defaultParseWidth: "any",
    valueCallback: function valueCallback67(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns34,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns34,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns34,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns34,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns34,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns34,
    defaultParseWidth: "any"
  })
};
var match_default35 = match34;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ht/index.js
var locale44 = {
  code: "ht",
  formatDistance: formatDistance_default36,
  formatLong: formatLong_default42,
  formatRelative: formatRelative_default36,
  localize: localize_default36,
  match: match_default35,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var ht_default = locale44;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/_lib/formatDistance/index.js
var translations = {
  about: "körülbelül",
  over: "több mint",
  almost: "majdnem",
  lessthan: "kevesebb mint"
};
var withoutSuffixes = {
  xseconds: " másodperc",
  halfaminute: "fél perc",
  xminutes: " perc",
  xhours: " óra",
  xdays: " nap",
  xweeks: " hét",
  xmonths: " hónap",
  xyears: " év"
};
var withSuffixes = {
  xseconds: {
    "-1": " másodperccel ezelőtt",
    "1": " másodperc múlva",
    "0": " másodperce"
  },
  halfaminute: {
    "-1": "fél perccel ezelőtt",
    "1": "fél perc múlva",
    "0": "fél perce"
  },
  xminutes: {
    "-1": " perccel ezelőtt",
    "1": " perc múlva",
    "0": " perce"
  },
  xhours: {
    "-1": " órával ezelőtt",
    "1": " óra múlva",
    "0": " órája"
  },
  xdays: {
    "-1": " nappal ezelőtt",
    "1": " nap múlva",
    "0": " napja"
  },
  xweeks: {
    "-1": " héttel ezelőtt",
    "1": " hét múlva",
    "0": " hete"
  },
  xmonths: {
    "-1": " hónappal ezelőtt",
    "1": " hónap múlva",
    "0": " hónapja"
  },
  xyears: {
    "-1": " évvel ezelőtt",
    "1": " év múlva",
    "0": " éve"
  }
};
var formatDistance71 = function formatDistance72(token, count, options) {
  var adverb = token.match(/about|over|almost|lessthan/i);
  var unit = adverb ? token.replace(adverb[0], "") : token;
  var addSuffix = (options === null || options === void 0 ? void 0 : options.addSuffix) === true;
  var key = unit.toLowerCase();
  var comparison = (options === null || options === void 0 ? void 0 : options.comparison) || 0;
  var translated = addSuffix ? withSuffixes[key][comparison] : withoutSuffixes[key];
  var result = key === "halfaminute" ? translated : count + translated;
  if (adverb) {
    var adv = adverb[0].toLowerCase();
    result = translations[adv] + " " + result;
  }
  return result;
};
var formatDistance_default37 = formatDistance71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/_lib/formatLong/index.js
var dateFormats43 = {
  full: "y. MMMM d., EEEE",
  long: "y. MMMM d.",
  medium: "y. MMM d.",
  short: "y. MM. dd."
};
var timeFormats43 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats43 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong43 = {
  date: buildFormatLongFn({
    formats: dateFormats43,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats43,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats43,
    defaultWidth: "full"
  })
};
var formatLong_default43 = formatLong43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/_lib/formatRelative/index.js
var accusativeWeekdays4 = ["vasárnap", "hétfőn", "kedden", "szerdán", "csütörtökön", "pénteken", "szombaton"];
function week(isFuture) {
  return function(date) {
    var weekday = accusativeWeekdays4[date.getUTCDay()];
    var prefix = isFuture ? "" : "'múlt' ";
    return "".concat(prefix, "'").concat(weekday, "' p'-kor'");
  };
}
var formatRelativeLocale36 = {
  lastWeek: week(false),
  yesterday: "'tegnap' p'-kor'",
  today: "'ma' p'-kor'",
  tomorrow: "'holnap' p'-kor'",
  nextWeek: week(true),
  other: "P"
};
var formatRelative71 = function formatRelative72(token, date) {
  var format = formatRelativeLocale36[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default37 = formatRelative71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/_lib/localize/index.js
var eraValues36 = {
  narrow: ["ie.", "isz."],
  abbreviated: ["i. e.", "i. sz."],
  wide: ["Krisztus előtt", "időszámításunk szerint"]
};
var quarterValues36 = {
  narrow: ["1.", "2.", "3.", "4."],
  abbreviated: ["1. n.év", "2. n.év", "3. n.év", "4. n.év"],
  wide: ["1. negyedév", "2. negyedév", "3. negyedév", "4. negyedév"]
};
var formattingQuarterValues = {
  narrow: ["I.", "II.", "III.", "IV."],
  abbreviated: ["I. n.év", "II. n.év", "III. n.év", "IV. n.év"],
  wide: ["I. negyedév", "II. negyedév", "III. negyedév", "IV. negyedév"]
};
var monthValues36 = {
  narrow: ["J", "F", "M", "Á", "M", "J", "J", "A", "Sz", "O", "N", "D"],
  abbreviated: ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."],
  wide: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]
};
var dayValues36 = {
  narrow: ["V", "H", "K", "Sz", "Cs", "P", "Sz"],
  short: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
  abbreviated: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
  wide: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
};
var dayPeriodValues36 = {
  narrow: {
    am: "de.",
    pm: "du.",
    midnight: "éjfél",
    noon: "dél",
    morning: "reggel",
    afternoon: "du.",
    evening: "este",
    night: "éjjel"
  },
  abbreviated: {
    am: "de.",
    pm: "du.",
    midnight: "éjfél",
    noon: "dél",
    morning: "reggel",
    afternoon: "du.",
    evening: "este",
    night: "éjjel"
  },
  wide: {
    am: "de.",
    pm: "du.",
    midnight: "éjfél",
    noon: "dél",
    morning: "reggel",
    afternoon: "délután",
    evening: "este",
    night: "éjjel"
  }
};
var ordinalNumber71 = function ordinalNumber72(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize36 = {
  ordinalNumber: ordinalNumber71,
  era: buildLocalizeFn({
    values: eraValues36,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues36,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback36(quarter) {
      return quarter - 1;
    },
    formattingValues: formattingQuarterValues,
    defaultFormattingWidth: "wide"
  }),
  month: buildLocalizeFn({
    values: monthValues36,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues36,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues36,
    defaultWidth: "wide"
  })
};
var localize_default37 = localize36;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/_lib/match/index.js
var matchOrdinalNumberPattern35 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern35 = /\d+/i;
var matchEraPatterns35 = {
  narrow: /^(ie\.|isz\.)/i,
  abbreviated: /^(i\.\s?e\.?|b?\s?c\s?e|i\.\s?sz\.?)/i,
  wide: /^(Krisztus előtt|időszámításunk előtt|időszámításunk szerint|i\. sz\.)/i
};
var parseEraPatterns35 = {
  narrow: [/ie/i, /isz/i],
  abbreviated: [/^(i\.?\s?e\.?|b\s?ce)/i, /^(i\.?\s?sz\.?|c\s?e)/i],
  any: [/előtt/i, /(szerint|i. sz.)/i]
};
var matchQuarterPatterns35 = {
  narrow: /^[1234]\.?/i,
  abbreviated: /^[1234]?\.?\s?n\.év/i,
  wide: /^([1234]|I|II|III|IV)?\.?\s?negyedév/i
};
var parseQuarterPatterns35 = {
  any: [/1|I$/i, /2|II$/i, /3|III/i, /4|IV/i]
};
var matchMonthPatterns35 = {
  narrow: /^[jfmaásond]|sz/i,
  abbreviated: /^(jan\.?|febr\.?|márc\.?|ápr\.?|máj\.?|jún\.?|júl\.?|aug\.?|szept\.?|okt\.?|nov\.?|dec\.?)/i,
  wide: /^(január|február|március|április|május|június|július|augusztus|szeptember|október|november|december)/i
};
var parseMonthPatterns35 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a|á/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s|sz/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^már/i, /^áp/i, /^máj/i, /^jún/i, /^júl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns35 = {
  narrow: /^([vhkpc]|sz|cs|sz)/i,
  short: /^([vhkp]|sze|cs|szo)/i,
  abbreviated: /^([vhkp]|sze|cs|szo)/i,
  wide: /^(vasárnap|hétfő|kedd|szerda|csütörtök|péntek|szombat)/i
};
var parseDayPatterns35 = {
  narrow: [/^v/i, /^h/i, /^k/i, /^sz/i, /^c/i, /^p/i, /^sz/i],
  any: [/^v/i, /^h/i, /^k/i, /^sze/i, /^c/i, /^p/i, /^szo/i]
};
var matchDayPeriodPatterns35 = {
  any: /^((de|du)\.?|éjfél|délután|dél|reggel|este|éjjel)/i
};
var parseDayPeriodPatterns35 = {
  any: {
    am: /^de\.?/i,
    pm: /^du\.?/i,
    midnight: /^éjf/i,
    noon: /^dé/i,
    morning: /reg/i,
    afternoon: /^délu\.?/i,
    evening: /es/i,
    night: /éjj/i
  }
};
var match35 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern35,
    parsePattern: parseOrdinalNumberPattern35,
    valueCallback: function valueCallback68(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns35,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns35,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns35,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns35,
    defaultParseWidth: "any",
    valueCallback: function valueCallback69(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns35,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns35,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns35,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns35,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns35,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns35,
    defaultParseWidth: "any"
  })
};
var match_default36 = match35;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hu/index.js
var locale45 = {
  code: "hu",
  formatDistance: formatDistance_default37,
  formatLong: formatLong_default43,
  formatRelative: formatRelative_default37,
  localize: localize_default37,
  match: match_default36,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var hu_default = locale45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/_lib/formatDistance/index.js
var formatDistanceLocale36 = {
  lessThanXSeconds: {
    one: "ավելի քիչ քան 1 վայրկյան",
    other: "ավելի քիչ քան {{count}} վայրկյան"
  },
  xSeconds: {
    one: "1 վայրկյան",
    other: "{{count}} վայրկյան"
  },
  halfAMinute: "կես րոպե",
  lessThanXMinutes: {
    one: "ավելի քիչ քան 1 րոպե",
    other: "ավելի քիչ քան {{count}} րոպե"
  },
  xMinutes: {
    one: "1 րոպե",
    other: "{{count}} րոպե"
  },
  aboutXHours: {
    one: "մոտ 1 ժամ",
    other: "մոտ {{count}} ժամ"
  },
  xHours: {
    one: "1 ժամ",
    other: "{{count}} ժամ"
  },
  xDays: {
    one: "1 օր",
    other: "{{count}} օր"
  },
  aboutXWeeks: {
    one: "մոտ 1 շաբաթ",
    other: "մոտ {{count}} շաբաթ"
  },
  xWeeks: {
    one: "1 շաբաթ",
    other: "{{count}} շաբաթ"
  },
  aboutXMonths: {
    one: "մոտ 1 ամիս",
    other: "մոտ {{count}} ամիս"
  },
  xMonths: {
    one: "1 ամիս",
    other: "{{count}} ամիս"
  },
  aboutXYears: {
    one: "մոտ 1 տարի",
    other: "մոտ {{count}} տարի"
  },
  xYears: {
    one: "1 տարի",
    other: "{{count}} տարի"
  },
  overXYears: {
    one: "ավելի քան 1 տարի",
    other: "ավելի քան {{count}} տարի"
  },
  almostXYears: {
    one: "համարյա 1 տարի",
    other: "համարյա {{count}} տարի"
  }
};
var formatDistance73 = function formatDistance74(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale36[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " հետո";
    } else {
      return result + " առաջ";
    }
  }
  return result;
};
var formatDistance_default38 = formatDistance73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/_lib/formatLong/index.js
var dateFormats44 = {
  full: "d MMMM, y, EEEE",
  long: "d MMMM, y",
  medium: "d MMM, y",
  short: "dd.MM.yyyy"
};
var timeFormats44 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats44 = {
  full: "{{date}} 'ժ․'{{time}}",
  long: "{{date}} 'ժ․'{{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong44 = {
  date: buildFormatLongFn({
    formats: dateFormats44,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats44,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats44,
    defaultWidth: "full"
  })
};
var formatLong_default44 = formatLong44;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/_lib/formatRelative/index.js
var formatRelativeLocale37 = {
  lastWeek: "'նախորդ' eeee p'֊ին'",
  yesterday: "'երեկ' p'֊ին'",
  today: "'այսօր' p'֊ին'",
  tomorrow: "'վաղը' p'֊ին'",
  nextWeek: "'հաջորդ' eeee p'֊ին'",
  other: "P"
};
var formatRelative73 = function formatRelative74(token, _date, _baseDate, _options) {
  return formatRelativeLocale37[token];
};
var formatRelative_default38 = formatRelative73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/_lib/localize/index.js
var eraValues37 = {
  narrow: ["Ք", "Մ"],
  abbreviated: ["ՔԱ", "ՄԹ"],
  wide: ["Քրիստոսից առաջ", "Մեր թվարկության"]
};
var quarterValues37 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Ք1", "Ք2", "Ք3", "Ք4"],
  wide: ["1֊ին քառորդ", "2֊րդ քառորդ", "3֊րդ քառորդ", "4֊րդ քառորդ"]
};
var monthValues37 = {
  narrow: ["Հ", "Փ", "Մ", "Ա", "Մ", "Հ", "Հ", "Օ", "Ս", "Հ", "Ն", "Դ"],
  abbreviated: ["հուն", "փետ", "մար", "ապր", "մայ", "հուն", "հուլ", "օգս", "սեպ", "հոկ", "նոյ", "դեկ"],
  wide: ["հունվար", "փետրվար", "մարտ", "ապրիլ", "մայիս", "հունիս", "հուլիս", "օգոստոս", "սեպտեմբեր", "հոկտեմբեր", "նոյեմբեր", "դեկտեմբեր"]
};
var dayValues37 = {
  narrow: ["Կ", "Ե", "Ե", "Չ", "Հ", "Ո", "Շ"],
  short: ["կր", "եր", "եք", "չք", "հգ", "ուր", "շբ"],
  abbreviated: ["կիր", "երկ", "երք", "չոր", "հնգ", "ուրբ", "շաբ"],
  wide: ["կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"]
};
var dayPeriodValues37 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "կեսգշ",
    noon: "կեսօր",
    morning: "առավոտ",
    afternoon: "ցերեկ",
    evening: "երեկո",
    night: "գիշեր"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "կեսգիշեր",
    noon: "կեսօր",
    morning: "առավոտ",
    afternoon: "ցերեկ",
    evening: "երեկո",
    night: "գիշեր"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "կեսգիշեր",
    noon: "կեսօր",
    morning: "առավոտ",
    afternoon: "ցերեկ",
    evening: "երեկո",
    night: "գիշեր"
  }
};
var formattingDayPeriodValues29 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "կեսգշ",
    noon: "կեսօր",
    morning: "առավոտը",
    afternoon: "ցերեկը",
    evening: "երեկոյան",
    night: "գիշերը"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "կեսգիշերին",
    noon: "կեսօրին",
    morning: "առավոտը",
    afternoon: "ցերեկը",
    evening: "երեկոյան",
    night: "գիշերը"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "կեսգիշերին",
    noon: "կեսօրին",
    morning: "առավոտը",
    afternoon: "ցերեկը",
    evening: "երեկոյան",
    night: "գիշերը"
  }
};
var ordinalNumber73 = function ordinalNumber74(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 < 10) {
    if (rem100 % 10 === 1) {
      return number + "֊ին";
    }
  }
  return number + "֊րդ";
};
var localize37 = {
  ordinalNumber: ordinalNumber73,
  era: buildLocalizeFn({
    values: eraValues37,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues37,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback37(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues37,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues37,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues37,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues29,
    defaultFormattingWidth: "wide"
  })
};
var localize_default38 = localize37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/_lib/match/index.js
var matchOrdinalNumberPattern36 = /^(\d+)((-|֊)?(ին|րդ))?/i;
var parseOrdinalNumberPattern36 = /\d+/i;
var matchEraPatterns36 = {
  narrow: /^(Ք|Մ)/i,
  abbreviated: /^(Ք\.?\s?Ա\.?|Մ\.?\s?Թ\.?\s?Ա\.?|Մ\.?\s?Թ\.?|Ք\.?\s?Հ\.?)/i,
  wide: /^(քրիստոսից առաջ|մեր թվարկությունից առաջ|մեր թվարկության|քրիստոսից հետո)/i
};
var parseEraPatterns36 = {
  any: [/^ք/i, /^մ/i]
};
var matchQuarterPatterns36 = {
  narrow: /^[1234]/i,
  abbreviated: /^ք[1234]/i,
  wide: /^[1234]((-|֊)?(ին|րդ)) քառորդ/i
};
var parseQuarterPatterns36 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns36 = {
  narrow: /^[հփմաօսնդ]/i,
  abbreviated: /^(հուն|փետ|մար|ապր|մայ|հուն|հուլ|օգս|սեպ|հոկ|նոյ|դեկ)/i,
  wide: /^(հունվար|փետրվար|մարտ|ապրիլ|մայիս|հունիս|հուլիս|օգոստոս|սեպտեմբեր|հոկտեմբեր|նոյեմբեր|դեկտեմբեր)/i
};
var parseMonthPatterns36 = {
  narrow: [/^հ/i, /^փ/i, /^մ/i, /^ա/i, /^մ/i, /^հ/i, /^հ/i, /^օ/i, /^ս/i, /^հ/i, /^ն/i, /^դ/i],
  any: [/^հու/i, /^փ/i, /^մար/i, /^ա/i, /^մայ/i, /^հուն/i, /^հուլ/i, /^օ/i, /^ս/i, /^հոկ/i, /^ն/i, /^դ/i]
};
var matchDayPatterns36 = {
  narrow: /^[եչհոշկ]/i,
  short: /^(կր|եր|եք|չք|հգ|ուր|շբ)/i,
  abbreviated: /^(կիր|երկ|երք|չոր|հնգ|ուրբ|շաբ)/i,
  wide: /^(կիրակի|երկուշաբթի|երեքշաբթի|չորեքշաբթի|հինգշաբթի|ուրբաթ|շաբաթ)/i
};
var parseDayPatterns36 = {
  narrow: [/^կ/i, /^ե/i, /^ե/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  short: [/^կ/i, /^եր/i, /^եք/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  abbreviated: [/^կ/i, /^երկ/i, /^երք/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  wide: [/^կ/i, /^երկ/i, /^երե/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i]
};
var matchDayPeriodPatterns36 = {
  narrow: /^([ap]|կեսգշ|կեսօր|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i,
  any: /^([ap]\.?\s?m\.?|կեսգիշեր(ին)?|կեսօր(ին)?|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i
};
var parseDayPeriodPatterns36 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /կեսգիշեր/i,
    noon: /կեսօր/i,
    morning: /առավոտ/i,
    afternoon: /ցերեկ/i,
    evening: /երեկո/i,
    night: /գիշեր/i
  }
};
var match36 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern36,
    parsePattern: parseOrdinalNumberPattern36,
    valueCallback: function valueCallback70(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns36,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns36,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns36,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns36,
    defaultParseWidth: "any",
    valueCallback: function valueCallback71(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns36,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns36,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns36,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns36,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns36,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns36,
    defaultParseWidth: "any"
  })
};
var match_default37 = match36;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/hy/index.js
var locale46 = {
  code: "hy",
  formatDistance: formatDistance_default38,
  formatLong: formatLong_default44,
  formatRelative: formatRelative_default38,
  localize: localize_default38,
  match: match_default37,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var hy_default = locale46;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/_lib/formatDistance/index.js
var formatDistanceLocale37 = {
  lessThanXSeconds: {
    one: "kurang dari 1 detik",
    other: "kurang dari {{count}} detik"
  },
  xSeconds: {
    one: "1 detik",
    other: "{{count}} detik"
  },
  halfAMinute: "setengah menit",
  lessThanXMinutes: {
    one: "kurang dari 1 menit",
    other: "kurang dari {{count}} menit"
  },
  xMinutes: {
    one: "1 menit",
    other: "{{count}} menit"
  },
  aboutXHours: {
    one: "sekitar 1 jam",
    other: "sekitar {{count}} jam"
  },
  xHours: {
    one: "1 jam",
    other: "{{count}} jam"
  },
  xDays: {
    one: "1 hari",
    other: "{{count}} hari"
  },
  aboutXWeeks: {
    one: "sekitar 1 minggu",
    other: "sekitar {{count}} minggu"
  },
  xWeeks: {
    one: "1 minggu",
    other: "{{count}} minggu"
  },
  aboutXMonths: {
    one: "sekitar 1 bulan",
    other: "sekitar {{count}} bulan"
  },
  xMonths: {
    one: "1 bulan",
    other: "{{count}} bulan"
  },
  aboutXYears: {
    one: "sekitar 1 tahun",
    other: "sekitar {{count}} tahun"
  },
  xYears: {
    one: "1 tahun",
    other: "{{count}} tahun"
  },
  overXYears: {
    one: "lebih dari 1 tahun",
    other: "lebih dari {{count}} tahun"
  },
  almostXYears: {
    one: "hampir 1 tahun",
    other: "hampir {{count}} tahun"
  }
};
var formatDistance75 = function formatDistance76(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale37[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dalam waktu " + result;
    } else {
      return result + " yang lalu";
    }
  }
  return result;
};
var formatDistance_default39 = formatDistance75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/_lib/formatLong/index.js
var dateFormats45 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "d/M/yyyy"
};
var timeFormats45 = {
  full: "HH.mm.ss",
  long: "HH.mm.ss",
  medium: "HH.mm",
  short: "HH.mm"
};
var dateTimeFormats45 = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong45 = {
  date: buildFormatLongFn({
    formats: dateFormats45,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats45,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats45,
    defaultWidth: "full"
  })
};
var formatLong_default45 = formatLong45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/_lib/formatRelative/index.js
var formatRelativeLocale38 = {
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: "P"
};
var formatRelative75 = function formatRelative76(token, _date, _baseDate, _options) {
  return formatRelativeLocale38[token];
};
var formatRelative_default39 = formatRelative75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/_lib/localize/index.js
var eraValues38 = {
  narrow: ["SM", "M"],
  abbreviated: ["SM", "M"],
  wide: ["Sebelum Masehi", "Masehi"]
};
var quarterValues38 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"]
};
var monthValues38 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"],
  wide: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
};
var dayValues38 = {
  narrow: ["M", "S", "S", "R", "K", "J", "S"],
  short: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  abbreviated: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  wide: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
};
var dayPeriodValues38 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  }
};
var formattingDayPeriodValues30 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "siang",
    evening: "sore",
    night: "malam"
  }
};
var ordinalNumber75 = function ordinalNumber76(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return "ke-" + number;
};
var localize38 = {
  ordinalNumber: ordinalNumber75,
  era: buildLocalizeFn({
    values: eraValues38,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues38,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback38(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues38,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues38,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues38,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues30,
    defaultFormattingWidth: "wide"
  })
};
var localize_default39 = localize38;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/_lib/match/index.js
var matchOrdinalNumberPattern37 = /^ke-(\d+)?/i;
var parseOrdinalNumberPattern37 = /\d+/i;
var matchEraPatterns37 = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
};
var parseEraPatterns37 = {
  any: [/^s/i, /^(m|e)/i]
};
var matchQuarterPatterns37 = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
};
var parseQuarterPatterns37 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns37 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
};
var parseMonthPatterns37 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns37 = {
  narrow: /^[srkjm]/i,
  short: /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
};
var parseDayPatterns37 = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
var matchDayPeriodPatterns37 = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
};
var parseDayPeriodPatterns37 = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pagi/i,
    afternoon: /siang/i,
    evening: /sore/i,
    night: /malam/i
  }
};
var match37 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern37,
    parsePattern: parseOrdinalNumberPattern37,
    valueCallback: function valueCallback72(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns37,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns37,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns37,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns37,
    defaultParseWidth: "any",
    valueCallback: function valueCallback73(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns37,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns37,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns37,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns37,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns37,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns37,
    defaultParseWidth: "any"
  })
};
var match_default38 = match37;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/id/index.js
var locale47 = {
  code: "id",
  formatDistance: formatDistance_default39,
  formatLong: formatLong_default45,
  formatRelative: formatRelative_default39,
  localize: localize_default39,
  match: match_default38,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var id_default = locale47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/_lib/formatDistance/index.js
var formatDistanceLocale38 = {
  lessThanXSeconds: {
    one: "minna en 1 sekúnda",
    other: "minna en {{count}} sekúndur"
  },
  xSeconds: {
    one: "1 sekúnda",
    other: "{{count}} sekúndur"
  },
  halfAMinute: "hálf mínúta",
  lessThanXMinutes: {
    one: "minna en 1 mínúta",
    other: "minna en {{count}} mínútur"
  },
  xMinutes: {
    one: "1 mínúta",
    other: "{{count}} mínútur"
  },
  aboutXHours: {
    one: "u.þ.b. 1 klukkustund",
    other: "u.þ.b. {{count}} klukkustundir"
  },
  xHours: {
    one: "1 klukkustund",
    other: "{{count}} klukkustundir"
  },
  xDays: {
    one: "1 dagur",
    other: "{{count}} dagar"
  },
  aboutXWeeks: {
    one: "um viku",
    other: "um {{count}} vikur"
  },
  xWeeks: {
    one: "1 viku",
    other: "{{count}} vikur"
  },
  aboutXMonths: {
    one: "u.þ.b. 1 mánuður",
    other: "u.þ.b. {{count}} mánuðir"
  },
  xMonths: {
    one: "1 mánuður",
    other: "{{count}} mánuðir"
  },
  aboutXYears: {
    one: "u.þ.b. 1 ár",
    other: "u.þ.b. {{count}} ár"
  },
  xYears: {
    one: "1 ár",
    other: "{{count}} ár"
  },
  overXYears: {
    one: "meira en 1 ár",
    other: "meira en {{count}} ár"
  },
  almostXYears: {
    one: "næstum 1 ár",
    other: "næstum {{count}} ár"
  }
};
var formatDistance77 = function formatDistance78(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale38[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "í " + result;
    } else {
      return result + " síðan";
    }
  }
  return result;
};
var formatDistance_default40 = formatDistance77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/_lib/formatLong/index.js
var dateFormats46 = {
  full: "EEEE, do MMMM y",
  long: "do MMMM y",
  medium: "do MMM y",
  short: "d.MM.y"
};
var timeFormats46 = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats46 = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong46 = {
  date: buildFormatLongFn({
    formats: dateFormats46,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats46,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats46,
    defaultWidth: "full"
  })
};
var formatLong_default46 = formatLong46;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/_lib/formatRelative/index.js
var formatRelativeLocale39 = {
  lastWeek: "'síðasta' dddd 'kl.' p",
  yesterday: "'í gær kl.' p",
  today: "'í dag kl.' p",
  tomorrow: "'á morgun kl.' p",
  nextWeek: "dddd 'kl.' p",
  other: "P"
};
var formatRelative77 = function formatRelative78(token, _date, _baseDate, _options) {
  return formatRelativeLocale39[token];
};
var formatRelative_default40 = formatRelative77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/_lib/localize/index.js
var eraValues39 = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["fyrir Krist", "eftir Krist"]
};
var quarterValues39 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1F", "2F", "3F", "4F"],
  wide: ["1. fjórðungur", "2. fjórðungur", "3. fjórðungur", "4. fjórðungur"]
};
var monthValues39 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "Á", "S", "Ó", "N", "D"],
  abbreviated: ["jan.", "feb.", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "sept.", "okt.", "nóv.", "des."],
  wide: ["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember"]
};
var dayValues39 = {
  narrow: ["S", "M", "Þ", "M", "F", "F", "L"],
  short: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La"],
  abbreviated: ["sun.", "mán.", "þri.", "mið.", "fim.", "fös.", "lau."],
  wide: ["sunnudagur", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur"]
};
var dayPeriodValues39 = {
  narrow: {
    am: "f",
    pm: "e",
    midnight: "miðnætti",
    noon: "hádegi",
    morning: "morgunn",
    afternoon: "síðdegi",
    evening: "kvöld",
    night: "nótt"
  },
  abbreviated: {
    am: "f.h.",
    pm: "e.h.",
    midnight: "miðnætti",
    noon: "hádegi",
    morning: "morgunn",
    afternoon: "síðdegi",
    evening: "kvöld",
    night: "nótt"
  },
  wide: {
    am: "fyrir hádegi",
    pm: "eftir hádegi",
    midnight: "miðnætti",
    noon: "hádegi",
    morning: "morgunn",
    afternoon: "síðdegi",
    evening: "kvöld",
    night: "nótt"
  }
};
var formattingDayPeriodValues31 = {
  narrow: {
    am: "f",
    pm: "e",
    midnight: "á miðnætti",
    noon: "á hádegi",
    morning: "að morgni",
    afternoon: "síðdegis",
    evening: "um kvöld",
    night: "um nótt"
  },
  abbreviated: {
    am: "f.h.",
    pm: "e.h.",
    midnight: "á miðnætti",
    noon: "á hádegi",
    morning: "að morgni",
    afternoon: "síðdegis",
    evening: "um kvöld",
    night: "um nótt"
  },
  wide: {
    am: "fyrir hádegi",
    pm: "eftir hádegi",
    midnight: "á miðnætti",
    noon: "á hádegi",
    morning: "að morgni",
    afternoon: "síðdegis",
    evening: "um kvöld",
    night: "um nótt"
  }
};
var ordinalNumber77 = function ordinalNumber78(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize39 = {
  ordinalNumber: ordinalNumber77,
  era: buildLocalizeFn({
    values: eraValues39,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues39,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback39(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues39,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues39,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues39,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues31,
    defaultFormattingWidth: "wide"
  })
};
var localize_default40 = localize39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/_lib/match/index.js
var matchOrdinalNumberPattern38 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern38 = /\d+(\.)?/i;
var matchEraPatterns38 = {
  narrow: /^(f\.Kr\.|e\.Kr\.)/i,
  abbreviated: /^(f\.Kr\.|e\.Kr\.)/i,
  wide: /^(fyrir Krist|eftir Krist)/i
};
var parseEraPatterns38 = {
  any: [/^(f\.Kr\.)/i, /^(e\.Kr\.)/i]
};
var matchQuarterPatterns38 = {
  narrow: /^[1234]\.?/i,
  abbreviated: /^q[1234]\.?/i,
  wide: /^[1234]\.? fjórðungur/i
};
var parseQuarterPatterns38 = {
  any: [/1\.?/i, /2\.?/i, /3\.?/i, /4\.?/i]
};
var matchMonthPatterns38 = {
  narrow: /^[jfmásónd]/i,
  abbreviated: /^(jan\.|feb\.|mars\.|apríl\.|maí|júní|júlí|águst|sep\.|oct\.|nov\.|dec\.)/i,
  wide: /^(januar|febrúar|mars|apríl|maí|júní|júlí|águst|september|október|nóvember|desember)/i
};
var parseMonthPatterns38 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^á/i, /^s/i, /^ó/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maí/i, /^jún/i, /^júl/i, /^áu/i, /^s/i, /^ó/i, /^n/i, /^d/i]
};
var matchDayPatterns38 = {
  narrow: /^[smtwf]/i,
  short: /^(su|má|þr|mi|fi|fö|la)/i,
  abbreviated: /^(sun|mán|þri|mið|fim|fös|lau)\.?/i,
  wide: /^(sunnudagur|mánudagur|þriðjudagur|miðvikudagur|fimmtudagur|föstudagur|laugardagur)/i
};
var parseDayPatterns38 = {
  narrow: [/^s/i, /^m/i, /^þ/i, /^m/i, /^f/i, /^f/i, /^l/i],
  any: [/^su/i, /^má/i, /^þr/i, /^mi/i, /^fi/i, /^fö/i, /^la/i]
};
var matchDayPeriodPatterns38 = {
  narrow: /^(f|e|síðdegis|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i,
  any: /^(fyrir hádegi|eftir hádegi|[ef]\.?h\.?|síðdegis|morgunn|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i
};
var parseDayPeriodPatterns38 = {
  any: {
    am: /^f/i,
    pm: /^e/i,
    midnight: /^mi/i,
    noon: /^há/i,
    morning: /morgunn/i,
    afternoon: /síðdegi/i,
    evening: /kvöld/i,
    night: /nótt/i
  }
};
var match38 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern38,
    parsePattern: parseOrdinalNumberPattern38,
    valueCallback: function valueCallback74(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns38,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns38,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns38,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns38,
    defaultParseWidth: "any",
    valueCallback: function valueCallback75(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns38,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns38,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns38,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns38,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns38,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns38,
    defaultParseWidth: "any"
  })
};
var match_default39 = match38;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/is/index.js
var locale48 = {
  code: "is",
  formatDistance: formatDistance_default40,
  formatLong: formatLong_default46,
  formatRelative: formatRelative_default40,
  localize: localize_default40,
  match: match_default39,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var is_default = locale48;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/_lib/formatDistance/index.js
var formatDistanceLocale39 = {
  lessThanXSeconds: {
    one: "meno di un secondo",
    other: "meno di {{count}} secondi"
  },
  xSeconds: {
    one: "un secondo",
    other: "{{count}} secondi"
  },
  halfAMinute: "alcuni secondi",
  lessThanXMinutes: {
    one: "meno di un minuto",
    other: "meno di {{count}} minuti"
  },
  xMinutes: {
    one: "un minuto",
    other: "{{count}} minuti"
  },
  aboutXHours: {
    one: "circa un'ora",
    other: "circa {{count}} ore"
  },
  xHours: {
    one: "un'ora",
    other: "{{count}} ore"
  },
  xDays: {
    one: "un giorno",
    other: "{{count}} giorni"
  },
  aboutXWeeks: {
    one: "circa una settimana",
    other: "circa {{count}} settimane"
  },
  xWeeks: {
    one: "una settimana",
    other: "{{count}} settimane"
  },
  aboutXMonths: {
    one: "circa un mese",
    other: "circa {{count}} mesi"
  },
  xMonths: {
    one: "un mese",
    other: "{{count}} mesi"
  },
  aboutXYears: {
    one: "circa un anno",
    other: "circa {{count}} anni"
  },
  xYears: {
    one: "un anno",
    other: "{{count}} anni"
  },
  overXYears: {
    one: "più di un anno",
    other: "più di {{count}} anni"
  },
  almostXYears: {
    one: "quasi un anno",
    other: "quasi {{count}} anni"
  }
};
var formatDistance79 = function formatDistance80(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale39[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "tra " + result;
    } else {
      return result + " fa";
    }
  }
  return result;
};
var formatDistance_default41 = formatDistance79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/_lib/formatLong/index.js
var dateFormats47 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats47 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats47 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong47 = {
  date: buildFormatLongFn({
    formats: dateFormats47,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats47,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats47,
    defaultWidth: "full"
  })
};
var formatLong_default47 = formatLong47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/_lib/formatRelative/index.js
var weekdays2 = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
function _lastWeek(day) {
  switch (day) {
    case 0:
      return "'domenica scorsa alle' p";
    default:
      return "'" + weekdays2[day] + " scorso alle' p";
  }
}
function thisWeek4(day) {
  return "'" + weekdays2[day] + " alle' p";
}
function _nextWeek(day) {
  switch (day) {
    case 0:
      return "'domenica prossima alle' p";
    default:
      return "'" + weekdays2[day] + " prossimo alle' p";
  }
}
var formatRelativeLocale40 = {
  lastWeek: function lastWeek7(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek4(day);
    } else {
      return _lastWeek(day);
    }
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: function nextWeek7(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek4(day);
    } else {
      return _nextWeek(day);
    }
  },
  other: "P"
};
var formatRelative79 = function formatRelative80(token, date, baseDate, options) {
  var format = formatRelativeLocale40[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default41 = formatRelative79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/_lib/localize/index.js
var eraValues40 = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["avanti Cristo", "dopo Cristo"]
};
var quarterValues40 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues40 = {
  narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
  abbreviated: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  wide: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
};
var dayValues40 = {
  narrow: ["D", "L", "M", "M", "G", "V", "S"],
  short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  wide: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"]
};
var dayPeriodValues40 = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  }
};
var formattingDayPeriodValues32 = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  }
};
var ordinalNumber79 = function ordinalNumber80(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return String(number);
};
var localize40 = {
  ordinalNumber: ordinalNumber79,
  era: buildLocalizeFn({
    values: eraValues40,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues40,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback40(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues40,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues40,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues40,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues32,
    defaultFormattingWidth: "wide"
  })
};
var localize_default41 = localize40;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/_lib/match/index.js
var matchOrdinalNumberPattern39 = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern39 = /\d+/i;
var matchEraPatterns39 = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
};
var parseEraPatterns39 = {
  any: [/^a/i, /^(d|e)/i]
};
var matchQuarterPatterns39 = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns39 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns39 = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
};
var parseMonthPatterns39 = {
  narrow: [/^g/i, /^f/i, /^m/i, /^a/i, /^m/i, /^g/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ge/i, /^f/i, /^mar/i, /^ap/i, /^mag/i, /^gi/i, /^l/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns39 = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
};
var parseDayPatterns39 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns39 = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
};
var parseDayPeriodPatterns39 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mezza/i,
    noon: /^mezzo/i,
    morning: /mattina/i,
    afternoon: /pomeriggio/i,
    evening: /sera/i,
    night: /notte/i
  }
};
var match39 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern39,
    parsePattern: parseOrdinalNumberPattern39,
    valueCallback: function valueCallback76(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns39,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns39,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns39,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns39,
    defaultParseWidth: "any",
    valueCallback: function valueCallback77(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns39,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns39,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns39,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns39,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns39,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns39,
    defaultParseWidth: "any"
  })
};
var match_default40 = match39;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it/index.js
var locale49 = {
  code: "it",
  formatDistance: formatDistance_default41,
  formatLong: formatLong_default47,
  formatRelative: formatRelative_default41,
  localize: localize_default41,
  match: match_default40,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var it_default = locale49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it-CH/_lib/formatLong/index.js
var dateFormats48 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd.MM.y"
};
var timeFormats48 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats48 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong48 = {
  date: buildFormatLongFn({
    formats: dateFormats48,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats48,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats48,
    defaultWidth: "full"
  })
};
var formatLong_default48 = formatLong48;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/it-CH/index.js
var locale50 = {
  code: "it-CH",
  formatDistance: formatDistance_default41,
  formatLong: formatLong_default48,
  formatRelative: formatRelative_default41,
  localize: localize_default41,
  match: match_default40,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var it_CH_default = locale50;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/_lib/formatDistance/index.js
var formatDistanceLocale40 = {
  lessThanXSeconds: {
    one: "1秒未満",
    other: "{{count}}秒未満",
    oneWithSuffix: "約1秒",
    otherWithSuffix: "約{{count}}秒"
  },
  xSeconds: {
    one: "1秒",
    other: "{{count}}秒"
  },
  halfAMinute: "30秒",
  lessThanXMinutes: {
    one: "1分未満",
    other: "{{count}}分未満",
    oneWithSuffix: "約1分",
    otherWithSuffix: "約{{count}}分"
  },
  xMinutes: {
    one: "1分",
    other: "{{count}}分"
  },
  aboutXHours: {
    one: "約1時間",
    other: "約{{count}}時間"
  },
  xHours: {
    one: "1時間",
    other: "{{count}}時間"
  },
  xDays: {
    one: "1日",
    other: "{{count}}日"
  },
  aboutXWeeks: {
    one: "約1週間",
    other: "約{{count}}週間"
  },
  xWeeks: {
    one: "1週間",
    other: "{{count}}週間"
  },
  aboutXMonths: {
    one: "約1か月",
    other: "約{{count}}か月"
  },
  xMonths: {
    one: "1か月",
    other: "{{count}}か月"
  },
  aboutXYears: {
    one: "約1年",
    other: "約{{count}}年"
  },
  xYears: {
    one: "1年",
    other: "{{count}}年"
  },
  overXYears: {
    one: "1年以上",
    other: "{{count}}年以上"
  },
  almostXYears: {
    one: "1年近く",
    other: "{{count}}年近く"
  }
};
var formatDistance81 = function formatDistance82(token, count, options) {
  options = options || {};
  var result;
  var tokenValue = formatDistanceLocale40[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options.addSuffix && tokenValue.oneWithSuffix) {
      result = tokenValue.oneWithSuffix;
    } else {
      result = tokenValue.one;
    }
  } else {
    if (options.addSuffix && tokenValue.otherWithSuffix) {
      result = tokenValue.otherWithSuffix.replace("{{count}}", String(count));
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "後";
    } else {
      return result + "前";
    }
  }
  return result;
};
var formatDistance_default42 = formatDistance81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/_lib/formatLong/index.js
var dateFormats49 = {
  full: "y年M月d日EEEE",
  long: "y年M月d日",
  medium: "y/MM/dd",
  short: "y/MM/dd"
};
var timeFormats49 = {
  full: "H時mm分ss秒 zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats49 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong49 = {
  date: buildFormatLongFn({
    formats: dateFormats49,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats49,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats49,
    defaultWidth: "full"
  })
};
var formatLong_default49 = formatLong49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/_lib/formatRelative/index.js
var formatRelativeLocale41 = {
  lastWeek: "先週のeeeeのp",
  yesterday: "昨日のp",
  today: "今日のp",
  tomorrow: "明日のp",
  nextWeek: "翌週のeeeeのp",
  other: "P"
};
var formatRelative81 = function formatRelative82(token, _date, _baseDate, _options) {
  return formatRelativeLocale41[token];
};
var formatRelative_default42 = formatRelative81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/_lib/localize/index.js
var eraValues41 = {
  narrow: ["BC", "AC"],
  abbreviated: ["紀元前", "西暦"],
  wide: ["紀元前", "西暦"]
};
var quarterValues41 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["第1四半期", "第2四半期", "第3四半期", "第4四半期"]
};
var monthValues41 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
};
var dayValues41 = {
  narrow: ["日", "月", "火", "水", "木", "金", "土"],
  short: ["日", "月", "火", "水", "木", "金", "土"],
  abbreviated: ["日", "月", "火", "水", "木", "金", "土"],
  wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
};
var dayPeriodValues41 = {
  narrow: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  abbreviated: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  wide: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  }
};
var formattingDayPeriodValues33 = {
  narrow: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  abbreviated: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  },
  wide: {
    am: "午前",
    pm: "午後",
    midnight: "深夜",
    noon: "正午",
    morning: "朝",
    afternoon: "午後",
    evening: "夜",
    night: "深夜"
  }
};
var ordinalNumber81 = function ordinalNumber82(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  switch (unit) {
    case "year":
      return "".concat(number, "年");
    case "quarter":
      return "第".concat(number, "四半期");
    case "month":
      return "".concat(number, "月");
    case "week":
      return "第".concat(number, "週");
    case "date":
      return "".concat(number, "日");
    case "hour":
      return "".concat(number, "時");
    case "minute":
      return "".concat(number, "分");
    case "second":
      return "".concat(number, "秒");
    default:
      return "".concat(number);
  }
};
var localize41 = {
  ordinalNumber: ordinalNumber81,
  era: buildLocalizeFn({
    values: eraValues41,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues41,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback41(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues41,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues41,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues41,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues33,
    defaultFormattingWidth: "wide"
  })
};
var localize_default42 = localize41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/_lib/match/index.js
var matchOrdinalNumberPattern40 = /^第?\d+(年|四半期|月|週|日|時|分|秒)?/i;
var parseOrdinalNumberPattern40 = /\d+/i;
var matchEraPatterns40 = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(紀元[前後]|西暦)/i,
  wide: /^(紀元[前後]|西暦)/i
};
var parseEraPatterns40 = {
  narrow: [/^B/i, /^A/i],
  any: [/^(紀元前)/i, /^(西暦|紀元後)/i]
};
var matchQuarterPatterns40 = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^第[1234一二三四１２３４]四半期/i
};
var parseQuarterPatterns40 = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
var matchMonthPatterns40 = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])月/i,
  wide: /^([123456789]|1[012])月/i
};
var parseMonthPatterns40 = {
  any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns40 = {
  narrow: /^[日月火水木金土]/,
  short: /^[日月火水木金土]/,
  abbreviated: /^[日月火水木金土]/,
  wide: /^[日月火水木金土]曜日/
};
var parseDayPatterns40 = {
  any: [/^日/, /^月/, /^火/, /^水/, /^木/, /^金/, /^土/]
};
var matchDayPeriodPatterns40 = {
  any: /^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i
};
var parseDayPeriodPatterns40 = {
  any: {
    am: /^(A|午前)/i,
    pm: /^(P|午後)/i,
    midnight: /^深夜|真夜中/i,
    noon: /^正午/i,
    morning: /^朝/i,
    afternoon: /^午後/i,
    evening: /^夜/i,
    night: /^深夜/i
  }
};
var match40 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern40,
    parsePattern: parseOrdinalNumberPattern40,
    valueCallback: function valueCallback78(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns40,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns40,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns40,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns40,
    defaultParseWidth: "any",
    valueCallback: function valueCallback79(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns40,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns40,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns40,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns40,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns40,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns40,
    defaultParseWidth: "any"
  })
};
var match_default41 = match40;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja/index.js
var locale51 = {
  code: "ja",
  formatDistance: formatDistance_default42,
  formatLong: formatLong_default49,
  formatRelative: formatRelative_default42,
  localize: localize_default42,
  match: match_default41,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ja_default = locale51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/_lib/formatDistance/index.js
var formatDistanceLocale41 = {
  lessThanXSeconds: {
    one: "1びょうみまん",
    other: "{{count}}びょうみまん",
    oneWithSuffix: "やく1びょう",
    otherWithSuffix: "やく{{count}}びょう"
  },
  xSeconds: {
    one: "1びょう",
    other: "{{count}}びょう"
  },
  halfAMinute: "30びょう",
  lessThanXMinutes: {
    one: "1ぷんみまん",
    other: "{{count}}ふんみまん",
    oneWithSuffix: "やく1ぷん",
    otherWithSuffix: "やく{{count}}ふん"
  },
  xMinutes: {
    one: "1ぷん",
    other: "{{count}}ふん"
  },
  aboutXHours: {
    one: "やく1じかん",
    other: "やく{{count}}じかん"
  },
  xHours: {
    one: "1じかん",
    other: "{{count}}じかん"
  },
  xDays: {
    one: "1にち",
    other: "{{count}}にち"
  },
  aboutXWeeks: {
    one: "やく1しゅうかん",
    other: "やく{{count}}しゅうかん"
  },
  xWeeks: {
    one: "1しゅうかん",
    other: "{{count}}しゅうかん"
  },
  aboutXMonths: {
    one: "やく1かげつ",
    other: "やく{{count}}かげつ"
  },
  xMonths: {
    one: "1かげつ",
    other: "{{count}}かげつ"
  },
  aboutXYears: {
    one: "やく1ねん",
    other: "やく{{count}}ねん"
  },
  xYears: {
    one: "1ねん",
    other: "{{count}}ねん"
  },
  overXYears: {
    one: "1ねんいじょう",
    other: "{{count}}ねんいじょう"
  },
  almostXYears: {
    one: "1ねんちかく",
    other: "{{count}}ねんちかく"
  }
};
var formatDistance83 = function formatDistance84(token, count, options) {
  options = options || {};
  var result;
  var tokenValue = formatDistanceLocale41[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options.addSuffix && tokenValue.oneWithSuffix) {
      result = tokenValue.oneWithSuffix;
    } else {
      result = tokenValue.one;
    }
  } else {
    if (options.addSuffix && tokenValue.otherWithSuffix) {
      result = tokenValue.otherWithSuffix.replace("{{count}}", String(count));
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
  }
  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "あと";
    } else {
      return result + "まえ";
    }
  }
  return result;
};
var formatDistance_default43 = formatDistance83;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/_lib/formatLong/index.js
var dateFormats50 = {
  full: "yねんMがつdにちEEEE",
  long: "yねんMがつdにち",
  medium: "y/MM/dd",
  short: "y/MM/dd"
};
var timeFormats50 = {
  full: "Hじmmふんssびょう zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats50 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong50 = {
  date: buildFormatLongFn({
    formats: dateFormats50,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats50,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats50,
    defaultWidth: "full"
  })
};
var formatLong_default50 = formatLong50;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/_lib/formatRelative/index.js
var formatRelativeLocale42 = {
  lastWeek: "せんしゅうのeeeeのp",
  yesterday: "きのうのp",
  today: "きょうのp",
  tomorrow: "あしたのp",
  nextWeek: "よくしゅうのeeeeのp",
  other: "P"
};
var formatRelative83 = function formatRelative84(token, _date, _baseDate, _options) {
  return formatRelativeLocale42[token];
};
var formatRelative_default43 = formatRelative83;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/_lib/localize/index.js
var eraValues42 = {
  narrow: ["BC", "AC"],
  abbreviated: ["きげんぜん", "せいれき"],
  wide: ["きげんぜん", "せいれき"]
};
var quarterValues42 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["だい1しはんき", "だい2しはんき", "だい3しはんき", "だい4しはんき"]
};
var monthValues42 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1がつ", "2がつ", "3がつ", "4がつ", "5がつ", "6がつ", "7がつ", "8がつ", "9がつ", "10がつ", "11がつ", "12がつ"],
  wide: ["1がつ", "2がつ", "3がつ", "4がつ", "5がつ", "6がつ", "7がつ", "8がつ", "9がつ", "10がつ", "11がつ", "12がつ"]
};
var dayValues42 = {
  narrow: ["にち", "げつ", "か", "すい", "もく", "きん", "ど"],
  short: ["にち", "げつ", "か", "すい", "もく", "きん", "ど"],
  abbreviated: ["にち", "げつ", "か", "すい", "もく", "きん", "ど"],
  wide: ["にちようび", "げつようび", "かようび", "すいようび", "もくようび", "きんようび", "どようび"]
};
var dayPeriodValues42 = {
  narrow: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  },
  abbreviated: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  },
  wide: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  }
};
var formattingDayPeriodValues34 = {
  narrow: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  },
  abbreviated: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  },
  wide: {
    am: "ごぜん",
    pm: "ごご",
    midnight: "しんや",
    noon: "しょうご",
    morning: "あさ",
    afternoon: "ごご",
    evening: "よる",
    night: "しんや"
  }
};
var ordinalNumber83 = function ordinalNumber84(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  switch (unit) {
    case "year":
      return "".concat(number, "ねん");
    case "quarter":
      return "だい".concat(number, "しはんき");
    case "month":
      return "".concat(number, "がつ");
    case "week":
      return "だい".concat(number, "しゅう");
    case "date":
      return "".concat(number, "にち");
    case "hour":
      return "".concat(number, "じ");
    case "minute":
      return "".concat(number, "ふん");
    case "second":
      return "".concat(number, "びょう");
    default:
      return "".concat(number);
  }
};
var localize42 = {
  ordinalNumber: ordinalNumber83,
  era: buildLocalizeFn({
    values: eraValues42,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues42,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback42(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues42,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues42,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues42,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues34,
    defaultFormattingWidth: "wide"
  })
};
var localize_default43 = localize42;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/_lib/match/index.js
var matchOrdinalNumberPattern41 = /^だ?い?\d+(ねん|しはんき|がつ|しゅう|にち|じ|ふん|びょう)?/i;
var parseOrdinalNumberPattern41 = /\d+/i;
var matchEraPatterns41 = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(きげん[前後]|せいれき)/i,
  wide: /^(きげん[前後]|せいれき)/i
};
var parseEraPatterns41 = {
  narrow: [/^B/i, /^A/i],
  any: [/^(きげんぜん)/i, /^(せいれき|きげんご)/i]
};
var matchQuarterPatterns41 = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^だい[1234一二三四１２３４]しはんき/i
};
var parseQuarterPatterns41 = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
var matchMonthPatterns41 = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])がつ/i,
  wide: /^([123456789]|1[012])がつ/i
};
var parseMonthPatterns41 = {
  any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns41 = {
  narrow: /^(にち|げつ|か|すい|もく|きん|ど)/,
  short: /^(にち|げつ|か|すい|もく|きん|ど)/,
  abbreviated: /^(にち|げつ|か|すい|もく|きん|ど)/,
  wide: /^(にち|げつ|か|すい|もく|きん|ど)ようび/
};
var parseDayPatterns41 = {
  any: [/^にち/, /^げつ/, /^か/, /^すい/, /^もく/, /^きん/, /^ど/]
};
var matchDayPeriodPatterns41 = {
  any: /^(AM|PM|ごぜん|ごご|しょうご|しんや|まよなか|よる|あさ)/i
};
var parseDayPeriodPatterns41 = {
  any: {
    am: /^(A|ごぜん)/i,
    pm: /^(P|ごご)/i,
    midnight: /^しんや|まよなか/i,
    noon: /^しょうご/i,
    morning: /^あさ/i,
    afternoon: /^ごご/i,
    evening: /^よる/i,
    night: /^しんや/i
  }
};
var match41 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern41,
    parsePattern: parseOrdinalNumberPattern41,
    valueCallback: function valueCallback80(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns41,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns41,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns41,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns41,
    defaultParseWidth: "any",
    valueCallback: function valueCallback81(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns41,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns41,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns41,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns41,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns41,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns41,
    defaultParseWidth: "any"
  })
};
var match_default42 = match41;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ja-Hira/index.js
var locale52 = {
  code: "ja-Hira",
  formatDistance: formatDistance_default43,
  formatLong: formatLong_default50,
  formatRelative: formatRelative_default43,
  localize: localize_default43,
  match: match_default42,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ja_Hira_default = locale52;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/_lib/formatDistance/index.js
var formatDistanceLocale42 = {
  lessThanXSeconds: {
    past: "{{count}} წამზე ნაკლები ხნის წინ",
    present: "{{count}} წამზე ნაკლები",
    future: "{{count}} წამზე ნაკლებში"
  },
  xSeconds: {
    past: "{{count}} წამის წინ",
    present: "{{count}} წამი",
    future: "{{count}} წამში"
  },
  halfAMinute: {
    past: "ნახევარი წუთის წინ",
    present: "ნახევარი წუთი",
    future: "ნახევარი წუთში"
  },
  lessThanXMinutes: {
    past: "{{count}} წუთზე ნაკლები ხნის წინ",
    present: "{{count}} წუთზე ნაკლები",
    future: "{{count}} წუთზე ნაკლებში"
  },
  xMinutes: {
    past: "{{count}} წუთის წინ",
    present: "{{count}} წუთი",
    future: "{{count}} წუთში"
  },
  aboutXHours: {
    past: "დაახლოებით {{count}} საათის წინ",
    present: "დაახლოებით {{count}} საათი",
    future: "დაახლოებით {{count}} საათში"
  },
  xHours: {
    past: "{{count}} საათის წინ",
    present: "{{count}} საათი",
    future: "{{count}} საათში"
  },
  xDays: {
    past: "{{count}} დღის წინ",
    present: "{{count}} დღე",
    future: "{{count}} დღეში"
  },
  aboutXWeeks: {
    past: "დაახლოებით {{count}} კვირას წინ",
    present: "დაახლოებით {{count}} კვირა",
    future: "დაახლოებით {{count}} კვირაში"
  },
  xWeeks: {
    past: "{{count}} კვირას კვირა",
    present: "{{count}} კვირა",
    future: "{{count}} კვირაში"
  },
  aboutXMonths: {
    past: "დაახლოებით {{count}} თვის წინ",
    present: "დაახლოებით {{count}} თვე",
    future: "დაახლოებით {{count}} თვეში"
  },
  xMonths: {
    past: "{{count}} თვის წინ",
    present: "{{count}} თვე",
    future: "{{count}} თვეში"
  },
  aboutXYears: {
    past: "დაახლოებით {{count}} წლის წინ",
    present: "დაახლოებით {{count}} წელი",
    future: "დაახლოებით {{count}} წელში"
  },
  xYears: {
    past: "{{count}} წლის წინ",
    present: "{{count}} წელი",
    future: "{{count}} წელში"
  },
  overXYears: {
    past: "{{count}} წელზე მეტი ხნის წინ",
    present: "{{count}} წელზე მეტი",
    future: "{{count}} წელზე მეტი ხნის შემდეგ"
  },
  almostXYears: {
    past: "თითქმის {{count}} წლის წინ",
    present: "თითქმის {{count}} წელი",
    future: "თითქმის {{count}} წელში"
  }
};
var formatDistance85 = function formatDistance86(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale42[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (options !== null && options !== void 0 && options.addSuffix && options.comparison && options.comparison > 0) {
    result = tokenValue.future.replace("{{count}}", String(count));
  } else if (options !== null && options !== void 0 && options.addSuffix) {
    result = tokenValue.past.replace("{{count}}", String(count));
  } else {
    result = tokenValue.present.replace("{{count}}", String(count));
  }
  return result;
};
var formatDistance_default44 = formatDistance85;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/_lib/formatLong/index.js
var dateFormats51 = {
  full: "EEEE, do MMMM, y",
  long: "do, MMMM, y",
  medium: "d, MMM, y",
  short: "dd/MM/yyyy"
};
var timeFormats51 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats51 = {
  full: "{{date}} {{time}}'-ზე'",
  long: "{{date}} {{time}}'-ზე'",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong51 = {
  date: buildFormatLongFn({
    formats: dateFormats51,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats51,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats51,
    defaultWidth: "full"
  })
};
var formatLong_default51 = formatLong51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/_lib/formatRelative/index.js
var formatRelativeLocale43 = {
  lastWeek: "'წინა' eeee p'-ზე'",
  yesterday: "'გუშინ' p'-ზე'",
  today: "'დღეს' p'-ზე'",
  tomorrow: "'ხვალ' p'-ზე'",
  nextWeek: "'შემდეგი' eeee p'-ზე'",
  other: "P"
};
var formatRelative85 = function formatRelative86(token, _date, _baseDate, _options) {
  return formatRelativeLocale43[token];
};
var formatRelative_default44 = formatRelative85;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/_lib/localize/index.js
var eraValues43 = {
  narrow: ["ჩ.წ-მდე", "ჩ.წ"],
  abbreviated: ["ჩვ.წ-მდე", "ჩვ.წ"],
  wide: ["ჩვენს წელთაღრიცხვამდე", "ჩვენი წელთაღრიცხვით"]
};
var quarterValues43 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-ლი კვ", "2-ე კვ", "3-ე კვ", "4-ე კვ"],
  wide: ["1-ლი კვარტალი", "2-ე კვარტალი", "3-ე კვარტალი", "4-ე კვარტალი"]
};
var monthValues43 = {
  narrow: ["ია", "თე", "მა", "აპ", "მს", "ვნ", "ვლ", "აგ", "სე", "ოქ", "ნო", "დე"],
  abbreviated: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
  wide: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
};
var dayValues43 = {
  narrow: ["კვ", "ორ", "სა", "ოთ", "ხუ", "პა", "შა"],
  short: ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
  abbreviated: ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
  wide: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
};
var dayPeriodValues43 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "შუაღამე",
    noon: "შუადღე",
    morning: "დილა",
    afternoon: "საღამო",
    evening: "საღამო",
    night: "ღამე"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "შუაღამე",
    noon: "შუადღე",
    morning: "დილა",
    afternoon: "საღამო",
    evening: "საღამო",
    night: "ღამე"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "შუაღამე",
    noon: "შუადღე",
    morning: "დილა",
    afternoon: "საღამო",
    evening: "საღამო",
    night: "ღამე"
  }
};
var formattingDayPeriodValues35 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "შუაღამით",
    noon: "შუადღისას",
    morning: "დილით",
    afternoon: "ნაშუადღევს",
    evening: "საღამოს",
    night: "ღამით"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "შუაღამით",
    noon: "შუადღისას",
    morning: "დილით",
    afternoon: "ნაშუადღევს",
    evening: "საღამოს",
    night: "ღამით"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "შუაღამით",
    noon: "შუადღისას",
    morning: "დილით",
    afternoon: "ნაშუადღევს",
    evening: "საღამოს",
    night: "ღამით"
  }
};
var ordinalNumber85 = function ordinalNumber86(dirtyNumber) {
  var number = Number(dirtyNumber);
  if (number === 1) {
    return number + "-ლი";
  }
  return number + "-ე";
};
var localize43 = {
  ordinalNumber: ordinalNumber85,
  era: buildLocalizeFn({
    values: eraValues43,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues43,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback43(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues43,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues43,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues43,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues35,
    defaultFormattingWidth: "wide"
  })
};
var localize_default44 = localize43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/_lib/match/index.js
var matchOrdinalNumberPattern42 = /^(\d+)(-ლი|-ე)?/i;
var parseOrdinalNumberPattern42 = /\d+/i;
var matchEraPatterns42 = {
  narrow: /^(ჩვ?\.წ)/i,
  abbreviated: /^(ჩვ?\.წ)/i,
  wide: /^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე|ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i
};
var parseEraPatterns42 = {
  any: [/^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე)/i, /^(ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i]
};
var matchQuarterPatterns42 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-(ლი|ე)? კვ/i,
  wide: /^[1234]-(ლი|ე)? კვარტალი/i
};
var parseQuarterPatterns42 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns42 = {
  any: /^(ია|თე|მა|აპ|მს|ვნ|ვლ|აგ|სე|ოქ|ნო|დე)/i
};
var parseMonthPatterns42 = {
  any: [/^ია/i, /^თ/i, /^მარ/i, /^აპ/i, /^მაი/i, /^ი?ვნ/i, /^ი?ვლ/i, /^აგ/i, /^ს/i, /^ო/i, /^ნ/i, /^დ/i]
};
var matchDayPatterns42 = {
  narrow: /^(კვ|ორ|სა|ოთ|ხუ|პა|შა)/i,
  short: /^(კვი|ორშ|სამ|ოთხ|ხუთ|პარ|შაბ)/i,
  wide: /^(კვირა|ორშაბათი|სამშაბათი|ოთხშაბათი|ხუთშაბათი|პარასკევი|შაბათი)/i
};
var parseDayPatterns42 = {
  any: [/^კვ/i, /^ორ/i, /^სა/i, /^ოთ/i, /^ხუ/i, /^პა/i, /^შა/i]
};
var matchDayPeriodPatterns42 = {
  any: /^([ap]\.?\s?m\.?|შუაღ|დილ)/i
};
var parseDayPeriodPatterns42 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^შუაღ/i,
    noon: /^შუადღ/i,
    morning: /^დილ/i,
    afternoon: /ნაშუადღევს/i,
    evening: /საღამო/i,
    night: /ღამ/i
  }
};
var match42 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern42,
    parsePattern: parseOrdinalNumberPattern42,
    valueCallback: function valueCallback82(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns42,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns42,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns42,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns42,
    defaultParseWidth: "any",
    valueCallback: function valueCallback83(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns42,
    defaultMatchWidth: "any",
    parsePatterns: parseMonthPatterns42,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns42,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns42,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns42,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns42,
    defaultParseWidth: "any"
  })
};
var match_default43 = match42;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ka/index.js
var locale53 = {
  code: "ka",
  formatDistance: formatDistance_default44,
  formatLong: formatLong_default51,
  formatRelative: formatRelative_default44,
  localize: localize_default44,
  match: match_default43,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ka_default = locale53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/_lib/formatDistance/index.js
var formatDistanceLocale43 = {
  lessThanXSeconds: {
    regular: {
      one: "1 секундтан аз",
      singularNominative: "{{count}} секундтан аз",
      singularGenitive: "{{count}} секундтан аз",
      pluralGenitive: "{{count}} секундтан аз"
    },
    future: {
      one: "бір секундтан кейін",
      singularNominative: "{{count}} секундтан кейін",
      singularGenitive: "{{count}} секундтан кейін",
      pluralGenitive: "{{count}} секундтан кейін"
    }
  },
  xSeconds: {
    regular: {
      singularNominative: "{{count}} секунд",
      singularGenitive: "{{count}} секунд",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунд бұрын",
      singularGenitive: "{{count}} секунд бұрын",
      pluralGenitive: "{{count}} секунд бұрын"
    },
    future: {
      singularNominative: "{{count}} секундтан кейін",
      singularGenitive: "{{count}} секундтан кейін",
      pluralGenitive: "{{count}} секундтан кейін"
    }
  },
  halfAMinute: function halfAMinute5(options) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "жарты минут ішінде";
      } else {
        return "жарты минут бұрын";
      }
    }
    return "жарты минут";
  },
  lessThanXMinutes: {
    regular: {
      one: "1 минуттан аз",
      singularNominative: "{{count}} минуттан аз",
      singularGenitive: "{{count}} минуттан аз",
      pluralGenitive: "{{count}} минуттан аз"
    },
    future: {
      one: "минуттан кем ",
      singularNominative: "{{count}} минуттан кем",
      singularGenitive: "{{count}} минуттан кем",
      pluralGenitive: "{{count}} минуттан кем"
    }
  },
  xMinutes: {
    regular: {
      singularNominative: "{{count}} минут",
      singularGenitive: "{{count}} минут",
      pluralGenitive: "{{count}} минут"
    },
    past: {
      singularNominative: "{{count}} минут бұрын",
      singularGenitive: "{{count}} минут бұрын",
      pluralGenitive: "{{count}} минут бұрын"
    },
    future: {
      singularNominative: "{{count}} минуттан кейін",
      singularGenitive: "{{count}} минуттан кейін",
      pluralGenitive: "{{count}} минуттан кейін"
    }
  },
  aboutXHours: {
    regular: {
      singularNominative: "шамамен {{count}} сағат",
      singularGenitive: "шамамен {{count}} сағат",
      pluralGenitive: "шамамен {{count}} сағат"
    },
    future: {
      singularNominative: "шамамен {{count}} сағаттан кейін",
      singularGenitive: "шамамен {{count}} сағаттан кейін",
      pluralGenitive: "шамамен {{count}} сағаттан кейін"
    }
  },
  xHours: {
    regular: {
      singularNominative: "{{count}} сағат",
      singularGenitive: "{{count}} сағат",
      pluralGenitive: "{{count}} сағат"
    }
  },
  xDays: {
    regular: {
      singularNominative: "{{count}} күн",
      singularGenitive: "{{count}} күн",
      pluralGenitive: "{{count}} күн"
    },
    future: {
      singularNominative: "{{count}} күннен кейін",
      singularGenitive: "{{count}} күннен кейін",
      pluralGenitive: "{{count}} күннен кейін"
    }
  },
  aboutXWeeks: {
    type: "weeks",
    one: "шамамен 1 апта",
    other: "шамамен {{count}} апта"
  },
  xWeeks: {
    type: "weeks",
    one: "1 апта",
    other: "{{count}} апта"
  },
  aboutXMonths: {
    regular: {
      singularNominative: "шамамен {{count}} ай",
      singularGenitive: "шамамен {{count}} ай",
      pluralGenitive: "шамамен {{count}} ай"
    },
    future: {
      singularNominative: "шамамен {{count}} айдан кейін",
      singularGenitive: "шамамен {{count}} айдан кейін",
      pluralGenitive: "шамамен {{count}} айдан кейін"
    }
  },
  xMonths: {
    regular: {
      singularNominative: "{{count}} ай",
      singularGenitive: "{{count}} ай",
      pluralGenitive: "{{count}} ай"
    }
  },
  aboutXYears: {
    regular: {
      singularNominative: "шамамен {{count}} жыл",
      singularGenitive: "шамамен {{count}} жыл",
      pluralGenitive: "шамамен {{count}} жыл"
    },
    future: {
      singularNominative: "шамамен {{count}} жылдан кейін",
      singularGenitive: "шамамен {{count}} жылдан кейін",
      pluralGenitive: "шамамен {{count}} жылдан кейін"
    }
  },
  xYears: {
    regular: {
      singularNominative: "{{count}} жыл",
      singularGenitive: "{{count}} жыл",
      pluralGenitive: "{{count}} жыл"
    },
    future: {
      singularNominative: "{{count}} жылдан кейін",
      singularGenitive: "{{count}} жылдан кейін",
      pluralGenitive: "{{count}} жылдан кейін"
    }
  },
  overXYears: {
    regular: {
      singularNominative: "{{count}} жылдан астам",
      singularGenitive: "{{count}} жылдан астам",
      pluralGenitive: "{{count}} жылдан астам"
    },
    future: {
      singularNominative: "{{count}} жылдан астам",
      singularGenitive: "{{count}} жылдан астам",
      pluralGenitive: "{{count}} жылдан астам"
    }
  },
  almostXYears: {
    regular: {
      singularNominative: "{{count}} жылға жақын",
      singularGenitive: "{{count}} жылға жақын",
      pluralGenitive: "{{count}} жылға жақын"
    },
    future: {
      singularNominative: "{{count}} жылдан кейін",
      singularGenitive: "{{count}} жылдан кейін",
      pluralGenitive: "{{count}} жылдан кейін"
    }
  }
};
function declension3(scheme, count) {
  if (scheme.one && count === 1)
    return scheme.one;
  var rem10 = count % 10;
  var rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
var formatDistance87 = function formatDistance88(token, count, options) {
  var tokenValue = formatDistanceLocale43[token];
  if (typeof tokenValue === "function")
    return tokenValue(options);
  if (tokenValue.type === "weeks") {
    return count === 1 ? tokenValue.one : tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      if (tokenValue.future) {
        return declension3(tokenValue.future, count);
      } else {
        return declension3(tokenValue.regular, count) + " кейін";
      }
    } else {
      if (tokenValue.past) {
        return declension3(tokenValue.past, count);
      } else {
        return declension3(tokenValue.regular, count) + " бұрын";
      }
    }
  } else {
    return declension3(tokenValue.regular, count);
  }
};
var formatDistance_default45 = formatDistance87;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/_lib/formatLong/index.js
var dateFormats52 = {
  full: "EEEE, do MMMM y 'ж.'",
  long: "do MMMM y 'ж.'",
  medium: "d MMM y 'ж.'",
  short: "dd.MM.yyyy"
};
var timeFormats52 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats52 = {
  any: "{{date}}, {{time}}"
};
var formatLong52 = {
  date: buildFormatLongFn({
    formats: dateFormats52,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats52,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats52,
    defaultWidth: "any"
  })
};
var formatLong_default52 = formatLong52;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/_lib/formatRelative/index.js
var accusativeWeekdays5 = ["жексенбіде", "дүйсенбіде", "сейсенбіде", "сәрсенбіде", "бейсенбіде", "жұмада", "сенбіде"];
function _lastWeek2(day) {
  var weekday = accusativeWeekdays5[day];
  return "'өткен " + weekday + " сағат' p'-де'";
}
function thisWeek5(day) {
  var weekday = accusativeWeekdays5[day];
  return "'" + weekday + " сағат' p'-де'";
}
function _nextWeek2(day) {
  var weekday = accusativeWeekdays5[day];
  return "'келесі " + weekday + " сағат' p'-де'";
}
var formatRelativeLocale44 = {
  lastWeek: function lastWeek8(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek5(day);
    } else {
      return _lastWeek2(day);
    }
  },
  yesterday: "'кеше сағат' p'-де'",
  today: "'бүгін сағат' p'-де'",
  tomorrow: "'ертең сағат' p'-де'",
  nextWeek: function nextWeek8(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek5(day);
    } else {
      return _nextWeek2(day);
    }
  },
  other: "P"
};
var formatRelative87 = function formatRelative88(token, date, baseDate, options) {
  var format = formatRelativeLocale44[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default45 = formatRelative87;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/_lib/localize/index.js
var eraValues44 = {
  narrow: ["б.з.д.", "б.з."],
  abbreviated: ["б.з.д.", "б.з."],
  wide: ["біздің заманымызға дейін", "біздің заманымыз"]
};
var quarterValues44 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-ші тоқ.", "2-ші тоқ.", "3-ші тоқ.", "4-ші тоқ."],
  wide: ["1-ші тоқсан", "2-ші тоқсан", "3-ші тоқсан", "4-ші тоқсан"]
};
var monthValues44 = {
  narrow: ["Қ", "А", "Н", "С", "М", "М", "Ш", "Т", "Қ", "Қ", "Қ", "Ж"],
  abbreviated: ["қаң", "ақп", "нау", "сәу", "мам", "мау", "шіл", "там", "қыр", "қаз", "қар", "жел"],
  wide: ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"]
};
var formattingMonthValues10 = {
  narrow: ["Қ", "А", "Н", "С", "М", "М", "Ш", "Т", "Қ", "Қ", "Қ", "Ж"],
  abbreviated: ["қаң", "ақп", "нау", "сәу", "мам", "мау", "шіл", "там", "қыр", "қаз", "қар", "жел"],
  wide: ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"]
};
var dayValues44 = {
  narrow: ["Ж", "Д", "С", "С", "Б", "Ж", "С"],
  short: ["жс", "дс", "сс", "ср", "бс", "жм", "сб"],
  abbreviated: ["жс", "дс", "сс", "ср", "бс", "жм", "сб"],
  wide: ["жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі"]
};
var dayPeriodValues44 = {
  narrow: {
    am: "ТД",
    pm: "ТК",
    midnight: "түн ортасы",
    noon: "түс",
    morning: "таң",
    afternoon: "күндіз",
    evening: "кеш",
    night: "түн"
  },
  wide: {
    am: "ТД",
    pm: "ТК",
    midnight: "түн ортасы",
    noon: "түс",
    morning: "таң",
    afternoon: "күндіз",
    evening: "кеш",
    night: "түн"
  }
};
var formattingDayPeriodValues36 = {
  narrow: {
    am: "ТД",
    pm: "ТК",
    midnight: "түн ортасында",
    noon: "түс",
    morning: "таң",
    afternoon: "күн",
    evening: "кеш",
    night: "түн"
  },
  wide: {
    am: "ТД",
    pm: "ТК",
    midnight: "түн ортасында",
    noon: "түсте",
    morning: "таңертең",
    afternoon: "күндіз",
    evening: "кеште",
    night: "түнде"
  }
};
var suffixes2 = {
  0: "-ші",
  1: "-ші",
  2: "-ші",
  3: "-ші",
  4: "-ші",
  5: "-ші",
  6: "-шы",
  7: "-ші",
  8: "-ші",
  9: "-шы",
  10: "-шы",
  20: "-шы",
  30: "-шы",
  40: "-шы",
  50: "-ші",
  60: "-шы",
  70: "-ші",
  80: "-ші",
  90: "-шы",
  100: "-ші"
};
var ordinalNumber87 = function ordinalNumber88(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var mod10 = number % 10;
  var b = number >= 100 ? 100 : null;
  var suffix = suffixes2[number] || suffixes2[mod10] || b && suffixes2[b] || "";
  return number + suffix;
};
var localize44 = {
  ordinalNumber: ordinalNumber87,
  era: buildLocalizeFn({
    values: eraValues44,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues44,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback44(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues44,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues10,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues44,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues44,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues36,
    defaultFormattingWidth: "wide"
  })
};
var localize_default45 = localize44;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/_lib/match/index.js
var matchOrdinalNumberPattern43 = /^(\d+)(-?(ші|шы))?/i;
var parseOrdinalNumberPattern43 = /\d+/i;
var matchEraPatterns43 = {
  narrow: /^((б )?з\.?\s?д\.?)/i,
  abbreviated: /^((б )?з\.?\s?д\.?)/i,
  wide: /^(біздің заманымызға дейін|біздің заманымыз|біздің заманымыздан)/i
};
var parseEraPatterns43 = {
  any: [/^б/i, /^з/i]
};
var matchQuarterPatterns43 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?ші)? тоқ.?/i,
  wide: /^[1234](-?ші)? тоқсан/i
};
var parseQuarterPatterns43 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns43 = {
  narrow: /^(қ|а|н|с|м|мау|ш|т|қыр|қаз|қар|ж)/i,
  abbreviated: /^(қаң|ақп|нау|сәу|мам|мау|шіл|там|қыр|қаз|қар|жел)/i,
  wide: /^(қаңтар|ақпан|наурыз|сәуір|мамыр|маусым|шілде|тамыз|қыркүйек|қазан|қараша|желтоқсан)/i
};
var parseMonthPatterns43 = {
  narrow: [/^қ/i, /^а/i, /^н/i, /^с/i, /^м/i, /^м/i, /^ш/i, /^т/i, /^қ/i, /^қ/i, /^қ/i, /^ж/i],
  abbreviated: [/^қаң/i, /^ақп/i, /^нау/i, /^сәу/i, /^мам/i, /^мау/i, /^шіл/i, /^там/i, /^қыр/i, /^қаз/i, /^қар/i, /^жел/i],
  any: [/^қ/i, /^а/i, /^н/i, /^с/i, /^м/i, /^м/i, /^ш/i, /^т/i, /^қ/i, /^қ/i, /^қ/i, /^ж/i]
};
var matchDayPatterns43 = {
  narrow: /^(ж|д|с|с|б|ж|с)/i,
  short: /^(жс|дс|сс|ср|бс|жм|сб)/i,
  wide: /^(жексенбі|дүйсенбі|сейсенбі|сәрсенбі|бейсенбі|жұма|сенбі)/i
};
var parseDayPatterns43 = {
  narrow: [/^ж/i, /^д/i, /^с/i, /^с/i, /^б/i, /^ж/i, /^с/i],
  short: [/^жс/i, /^дс/i, /^сс/i, /^ср/i, /^бс/i, /^жм/i, /^сб/i],
  any: [/^ж[ек]/i, /^д[үй]/i, /^сe[й]/i, /^сә[р]/i, /^б[ей]/i, /^ж[ұм]/i, /^се[н]/i]
};
var matchDayPeriodPatterns43 = {
  narrow: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
  wide: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
  any: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i
};
var parseDayPeriodPatterns43 = {
  any: {
    am: /^ТД/i,
    pm: /^ТК/i,
    midnight: /^түн орта/i,
    noon: /^күндіз/i,
    morning: /таң/i,
    afternoon: /түс/i,
    evening: /кеш/i,
    night: /түн/i
  }
};
var match43 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern43,
    parsePattern: parseOrdinalNumberPattern43,
    valueCallback: function valueCallback84(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns43,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns43,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns43,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns43,
    defaultParseWidth: "any",
    valueCallback: function valueCallback85(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns43,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns43,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns43,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns43,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns43,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns43,
    defaultParseWidth: "any"
  })
};
var match_default44 = match43;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kk/index.js
var locale54 = {
  code: "kk",
  formatDistance: formatDistance_default45,
  formatLong: formatLong_default52,
  formatRelative: formatRelative_default45,
  localize: localize_default45,
  match: match_default44,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var kk_default = locale54;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/_lib/formatDistance/index.js
var formatDistanceLocale44 = {
  lessThanXSeconds: "តិចជាង {{count}} វិនាទី",
  xSeconds: "{{count}} វិនាទី",
  halfAMinute: "កន្លះនាទី",
  lessThanXMinutes: "តិចជាង {{count}} នាទី",
  xMinutes: "{{count}} នាទី",
  aboutXHours: "ប្រហែល {{count}} ម៉ោង",
  xHours: "{{count}} ម៉ោង",
  xDays: "{{count}} ថ្ងៃ",
  aboutXWeeks: "ប្រហែល {{count}} សប្តាហ៍",
  xWeeks: "{{count}} សប្តាហ៍",
  aboutXMonths: "ប្រហែល {{count}} ខែ",
  xMonths: "{{count}} ខែ",
  aboutXYears: "ប្រហែល {{count}} ឆ្នាំ",
  xYears: "{{count}} ឆ្នាំ",
  overXYears: "ជាង {{count}} ឆ្នាំ",
  almostXYears: "ជិត {{count}} ឆ្នាំ"
};
var formatDistance89 = function formatDistance90(token, count, options) {
  var tokenValue = formatDistanceLocale44[token];
  var result = tokenValue;
  if (typeof count === "number") {
    result = result.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "ក្នុងរយៈពេល " + result;
    } else {
      return result + "មុន";
    }
  }
  return result;
};
var formatDistance_default46 = formatDistance89;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/_lib/formatLong/index.js
var dateFormats53 = {
  full: "EEEE do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats53 = {
  full: "h:mm:ss a",
  long: "h:mm:ss a",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats53 = {
  full: "{{date}} 'ម៉ោង' {{time}}",
  long: "{{date}} 'ម៉ោង' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong53 = {
  date: buildFormatLongFn({
    formats: dateFormats53,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats53,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats53,
    defaultWidth: "full"
  })
};
var formatLong_default53 = formatLong53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/_lib/formatRelative/index.js
var formatRelativeLocale45 = {
  lastWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​មុនម៉ោង' p",
  yesterday: "'ម្សិលមិញនៅម៉ោង' p",
  today: "'ថ្ងៃនេះម៉ោង' p",
  tomorrow: "'ថ្ងៃស្អែកម៉ោង' p",
  nextWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​ក្រោយម៉ោង' p",
  other: "P"
};
var formatRelative89 = function formatRelative90(token, _date, _baseDate, _options) {
  return formatRelativeLocale45[token];
};
var formatRelative_default46 = formatRelative89;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/_lib/localize/index.js
var eraValues45 = {
  narrow: ["ម.គស", "គស"],
  abbreviated: ["មុនគ.ស", "គ.ស"],
  wide: ["មុនគ្រិស្តសករាជ", "នៃគ្រិស្តសករាជ"]
};
var quarterValues45 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["ត្រីមាសទី 1", "ត្រីមាសទី 2", "ត្រីមាសទី 3", "ត្រីមាសទី 4"]
};
var monthValues45 = {
  narrow: ["ម.ក", "ក.ម", "មិ", "ម.ស", "ឧ.ស", "ម.ថ", "ក.ដ", "សី", "កញ", "តុ", "វិ", "ធ"],
  abbreviated: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
  wide: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
};
var dayValues45 = {
  narrow: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  short: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  abbreviated: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  wide: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"]
};
var dayPeriodValues45 = {
  narrow: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  abbreviated: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  wide: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  }
};
var formattingDayPeriodValues37 = {
  narrow: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  abbreviated: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  },
  wide: {
    am: "ព្រឹក",
    pm: "ល្ងាច",
    midnight: "​ពេលកណ្ដាលអធ្រាត្រ",
    noon: "ពេលថ្ងៃត្រង់",
    morning: "ពេលព្រឹក",
    afternoon: "ពេលរសៀល",
    evening: "ពេលល្ងាច",
    night: "ពេលយប់"
  }
};
var ordinalNumber89 = function ordinalNumber90(dirtyNumber, _) {
  var number = Number(dirtyNumber);
  return number.toString();
};
var localize45 = {
  ordinalNumber: ordinalNumber89,
  era: buildLocalizeFn({
    values: eraValues45,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues45,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback45(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues45,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues45,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues45,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues37,
    defaultFormattingWidth: "wide"
  })
};
var localize_default46 = localize45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/_lib/match/index.js
var matchOrdinalNumberPattern44 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern44 = /\d+/i;
var matchEraPatterns44 = {
  narrow: /^(ម\.)?គស/i,
  abbreviated: /^(មុន)?គ\.ស/i,
  wide: /^(មុន|នៃ)គ្រិស្តសករាជ/i
};
var parseEraPatterns44 = {
  any: [/^(ម|មុន)គ\.?ស/i, /^(នៃ)?គ\.?ស/i]
};
var matchQuarterPatterns44 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^(ត្រីមាស)(ទី)?\s?[1234]/i
};
var parseQuarterPatterns44 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns44 = {
  narrow: /^(ម\.ក|ក\.ម|មិ|ម\.ស|ឧ\.ស|ម\.ថ|ក\.ដ|សី|កញ|តុ|វិ|ធ)/i,
  abbreviated: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i,
  wide: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i
};
var parseMonthPatterns44 = {
  narrow: [/^ម\.ក/i, /^ក\.ម/i, /^មិ/i, /^ម\.ស/i, /^ឧ\.ស/i, /^ម\.ថ/i, /^ក\.ដ/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិ/i, /^ធ/i],
  any: [/^មក/i, /^កុ/i, /^មីន/i, /^មេ/i, /^ឧស/i, /^មិថ/i, /^កក/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិច/i, /^ធ/i]
};
var matchDayPatterns44 = {
  narrow: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  short: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  abbreviated: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  wide: /^(អាទិត្យ|ចន្ទ|អង្គារ|ពុធ|ព្រហស្បតិ៍|សុក្រ|សៅរ៍)/i
};
var parseDayPatterns44 = {
  narrow: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^ស/i],
  any: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^សៅ/i]
};
var matchDayPeriodPatterns44 = {
  narrow: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i,
  any: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i
};
var parseDayPeriodPatterns44 = {
  any: {
    am: /^ព្រឹក/i,
    pm: /^ល្ងាច/i,
    midnight: /^ពេលកណ្ដាលអធ្រាត្រ/i,
    noon: /^ពេលថ្ងៃត្រង់/i,
    morning: /ពេលព្រឹក/i,
    afternoon: /ពេលរសៀល/i,
    evening: /ពេលល្ងាច/i,
    night: /ពេលយប់/i
  }
};
var match44 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern44,
    parsePattern: parseOrdinalNumberPattern44,
    valueCallback: function valueCallback86(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns44,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns44,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns44,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns44,
    defaultParseWidth: "any",
    valueCallback: function valueCallback87(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns44,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns44,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns44,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns44,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns44,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns44,
    defaultParseWidth: "any"
  })
};
var match_default45 = match44;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/km/index.js
var locale55 = {
  code: "km",
  formatDistance: formatDistance_default46,
  formatLong: formatLong_default53,
  formatRelative: formatRelative_default46,
  localize: localize_default46,
  match: match_default45,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var km_default = locale55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/_lib/formatDistance/index.js
var formatDistanceLocale45 = {
  lessThanXSeconds: {
    one: {
      default: "1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ",
      future: "1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ",
      past: "1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ"
    },
    other: {
      default: "{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ",
      future: "{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ",
      past: "{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ"
    }
  },
  xSeconds: {
    one: {
      default: "1 ಸೆಕೆಂಡ್",
      future: "1 ಸೆಕೆಂಡ್‌ನಲ್ಲಿ",
      past: "1 ಸೆಕೆಂಡ್ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ಸೆಕೆಂಡುಗಳು",
      future: "{{count}} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ",
      past: "{{count}} ಸೆಕೆಂಡ್ ಹಿಂದೆ"
    }
  },
  halfAMinute: {
    other: {
      default: "ಅರ್ಧ ನಿಮಿಷ",
      future: "ಅರ್ಧ ನಿಮಿಷದಲ್ಲಿ",
      past: "ಅರ್ಧ ನಿಮಿಷದ ಹಿಂದೆ"
    }
  },
  lessThanXMinutes: {
    one: {
      default: "1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ",
      future: "1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ",
      past: "1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ"
    },
    other: {
      default: "{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ",
      future: "{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ",
      past: "{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ"
    }
  },
  xMinutes: {
    one: {
      default: "1 ನಿಮಿಷ",
      future: "1 ನಿಮಿಷದಲ್ಲಿ",
      past: "1 ನಿಮಿಷದ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ನಿಮಿಷಗಳು",
      future: "{{count}} ನಿಮಿಷಗಳಲ್ಲಿ",
      past: "{{count}} ನಿಮಿಷಗಳ ಹಿಂದೆ"
    }
  },
  aboutXHours: {
    one: {
      default: "ಸುಮಾರು 1 ಗಂಟೆ",
      future: "ಸುಮಾರು 1 ಗಂಟೆಯಲ್ಲಿ",
      past: "ಸುಮಾರು 1 ಗಂಟೆ ಹಿಂದೆ"
    },
    other: {
      default: "ಸುಮಾರು {{count}} ಗಂಟೆಗಳು",
      future: "ಸುಮಾರು {{count}} ಗಂಟೆಗಳಲ್ಲಿ",
      past: "ಸುಮಾರು {{count}} ಗಂಟೆಗಳ ಹಿಂದೆ"
    }
  },
  xHours: {
    one: {
      default: "1 ಗಂಟೆ",
      future: "1 ಗಂಟೆಯಲ್ಲಿ",
      past: "1 ಗಂಟೆ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ಗಂಟೆಗಳು",
      future: "{{count}} ಗಂಟೆಗಳಲ್ಲಿ",
      past: "{{count}} ಗಂಟೆಗಳ ಹಿಂದೆ"
    }
  },
  xDays: {
    one: {
      default: "1 ದಿನ",
      future: "1 ದಿನದಲ್ಲಿ",
      past: "1 ದಿನದ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ದಿನಗಳು",
      future: "{{count}} ದಿನಗಳಲ್ಲಿ",
      past: "{{count}} ದಿನಗಳ ಹಿಂದೆ"
    }
  },
  // TODO
  // aboutXWeeks: {},
  // TODO
  // xWeeks: {},
  aboutXMonths: {
    one: {
      default: "ಸುಮಾರು 1 ತಿಂಗಳು",
      future: "ಸುಮಾರು 1 ತಿಂಗಳಲ್ಲಿ",
      past: "ಸುಮಾರು 1 ತಿಂಗಳ ಹಿಂದೆ"
    },
    other: {
      default: "ಸುಮಾರು {{count}} ತಿಂಗಳು",
      future: "ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳಲ್ಲಿ",
      past: "ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ"
    }
  },
  xMonths: {
    one: {
      default: "1 ತಿಂಗಳು",
      future: "1 ತಿಂಗಳಲ್ಲಿ",
      past: "1 ತಿಂಗಳ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ತಿಂಗಳು",
      future: "{{count}} ತಿಂಗಳುಗಳಲ್ಲಿ",
      past: "{{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ"
    }
  },
  aboutXYears: {
    one: {
      default: "ಸುಮಾರು 1 ವರ್ಷ",
      future: "ಸುಮಾರು 1 ವರ್ಷದಲ್ಲಿ",
      past: "ಸುಮಾರು 1 ವರ್ಷದ ಹಿಂದೆ"
    },
    other: {
      default: "ಸುಮಾರು {{count}} ವರ್ಷಗಳು",
      future: "ಸುಮಾರು {{count}} ವರ್ಷಗಳಲ್ಲಿ",
      past: "ಸುಮಾರು {{count}} ವರ್ಷಗಳ ಹಿಂದೆ"
    }
  },
  xYears: {
    one: {
      default: "1 ವರ್ಷ",
      future: "1 ವರ್ಷದಲ್ಲಿ",
      past: "1 ವರ್ಷದ ಹಿಂದೆ"
    },
    other: {
      default: "{{count}} ವರ್ಷಗಳು",
      future: "{{count}} ವರ್ಷಗಳಲ್ಲಿ",
      past: "{{count}} ವರ್ಷಗಳ ಹಿಂದೆ"
    }
  },
  overXYears: {
    one: {
      default: "1 ವರ್ಷದ ಮೇಲೆ",
      future: "1 ವರ್ಷದ ಮೇಲೆ",
      past: "1 ವರ್ಷದ ಮೇಲೆ"
    },
    other: {
      default: "{{count}} ವರ್ಷಗಳ ಮೇಲೆ",
      future: "{{count}} ವರ್ಷಗಳ ಮೇಲೆ",
      past: "{{count}} ವರ್ಷಗಳ ಮೇಲೆ"
    }
  },
  almostXYears: {
    one: {
      default: "ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ",
      future: "ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ",
      past: "ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ"
    },
    other: {
      default: "ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ",
      future: "ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ",
      past: "ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ"
    }
  }
};
function getResultByTense(parentToken, options) {
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return parentToken.future;
    } else {
      return parentToken.past;
    }
  }
  return parentToken.default;
}
var formatDistance91 = function formatDistance92(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale45[token];
  if (tokenValue.one && count === 1) {
    result = getResultByTense(tokenValue.one, options);
  } else {
    result = getResultByTense(tokenValue.other, options);
  }
  return result.replace("{{count}}", String(count));
};
var formatDistance_default47 = formatDistance91;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/_lib/formatLong/index.js
var dateFormats54 = {
  full: "EEEE, MMMM d, y",
  // CLDR 1816
  long: "MMMM d, y",
  // CLDR 1817
  medium: "MMM d, y",
  // CLDR 1818
  short: "d/M/yy"
  // CLDR 1819
};
var timeFormats54 = {
  full: "hh:mm:ss a zzzz",
  // CLDR 1820
  long: "hh:mm:ss a z",
  // CLDR 1821
  medium: "hh:mm:ss a",
  // CLDR 1822
  short: "hh:mm a"
  // CLDR 1823
};
var dateTimeFormats54 = {
  full: "{{date}} {{time}}",
  // CLDR 1824
  long: "{{date}} {{time}}",
  // CLDR 1825
  medium: "{{date}} {{time}}",
  // CLDR 1826
  short: "{{date}} {{time}}"
  // CLDR 1827
};
var formatLong54 = {
  date: buildFormatLongFn({
    formats: dateFormats54,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats54,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats54,
    defaultWidth: "full"
  })
};
var formatLong_default54 = formatLong54;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/_lib/formatRelative/index.js
var formatRelativeLocale46 = {
  lastWeek: "'ಕಳೆದ' eeee p 'ಕ್ಕೆ'",
  yesterday: "'ನಿನ್ನೆ' p 'ಕ್ಕೆ'",
  today: "'ಇಂದು' p 'ಕ್ಕೆ'",
  tomorrow: "'ನಾಳೆ' p 'ಕ್ಕೆ'",
  nextWeek: "eeee p 'ಕ್ಕೆ'",
  other: "P"
};
var formatRelative91 = function formatRelative92(token, _date, _baseDate, _options) {
  return formatRelativeLocale46[token];
};
var formatRelative_default47 = formatRelative91;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/_lib/localize/index.js
var eraValues46 = {
  narrow: ["ಕ್ರಿ.ಪೂ", "ಕ್ರಿ.ಶ"],
  abbreviated: ["ಕ್ರಿ.ಪೂ", "ಕ್ರಿ.ಶ"],
  // CLDR #1618, #1620
  wide: ["ಕ್ರಿಸ್ತ ಪೂರ್ವ", "ಕ್ರಿಸ್ತ ಶಕ"]
  // CLDR #1614, #1616
};
var quarterValues46 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["ತ್ರೈ 1", "ತ್ರೈ 2", "ತ್ರೈ 3", "ತ್ರೈ 4"],
  // CLDR #1630 - #1638
  wide: ["1ನೇ ತ್ರೈಮಾಸಿಕ", "2ನೇ ತ್ರೈಮಾಸಿಕ", "3ನೇ ತ್ರೈಮಾಸಿಕ", "4ನೇ ತ್ರೈಮಾಸಿಕ"]
  // CLDR #1622 - #1629
};
var monthValues46 = {
  narrow: ["ಜ", "ಫೆ", "ಮಾ", "ಏ", "ಮೇ", "ಜೂ", "ಜು", "ಆ", "ಸೆ", "ಅ", "ನ", "ಡಿ"],
  abbreviated: ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"],
  wide: ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"]
};
var dayValues46 = {
  narrow: ["ಭಾ", "ಸೋ", "ಮಂ", "ಬು", "ಗು", "ಶು", "ಶ"],
  short: ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"],
  abbreviated: ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"],
  wide: ["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"]
};
var dayPeriodValues46 = {
  narrow: {
    am: "ಪೂರ್ವಾಹ್ನ",
    pm: "ಅಪರಾಹ್ನ",
    midnight: "ಮಧ್ಯರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾಹ್ನ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾಹ್ನ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  },
  abbreviated: {
    am: "ಪೂರ್ವಾಹ್ನ",
    pm: "ಅಪರಾಹ್ನ",
    midnight: "ಮಧ್ಯರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾನ್ಹ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾನ್ಹ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  },
  wide: {
    am: "ಪೂರ್ವಾಹ್ನ",
    pm: "ಅಪರಾಹ್ನ",
    midnight: "ಮಧ್ಯರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾನ್ಹ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾನ್ಹ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  }
};
var formattingDayPeriodValues38 = {
  narrow: {
    am: "ಪೂ",
    pm: "ಅ",
    midnight: "ಮಧ್ಯರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾನ್ಹ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾನ್ಹ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  },
  abbreviated: {
    am: "ಪೂರ್ವಾಹ್ನ",
    pm: "ಅಪರಾಹ್ನ",
    midnight: "ಮಧ್ಯ ರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾನ್ಹ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾನ್ಹ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  },
  wide: {
    am: "ಪೂರ್ವಾಹ್ನ",
    pm: "ಅಪರಾಹ್ನ",
    midnight: "ಮಧ್ಯ ರಾತ್ರಿ",
    noon: "ಮಧ್ಯಾನ್ಹ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾನ್ಹ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ"
  }
};
var ordinalNumber91 = function ordinalNumber92(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "ನೇ";
};
var localize46 = {
  ordinalNumber: ordinalNumber91,
  era: buildLocalizeFn({
    values: eraValues46,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues46,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback46(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues46,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues46,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues46,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues38,
    defaultFormattingWidth: "wide"
  })
};
var localize_default47 = localize46;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/_lib/match/index.js
var matchOrdinalNumberPattern45 = /^(\d+)(ನೇ|ನೆ)?/i;
var parseOrdinalNumberPattern45 = /\d+/i;
var matchEraPatterns45 = {
  narrow: /^(ಕ್ರಿ.ಪೂ|ಕ್ರಿ.ಶ)/i,
  abbreviated: /^(ಕ್ರಿ\.?\s?ಪೂ\.?|ಕ್ರಿ\.?\s?ಶ\.?|ಪ್ರ\.?\s?ಶ\.?)/i,
  wide: /^(ಕ್ರಿಸ್ತ ಪೂರ್ವ|ಕ್ರಿಸ್ತ ಶಕ|ಪ್ರಸಕ್ತ ಶಕ)/i
};
var parseEraPatterns45 = {
  any: [/^ಪೂ/i, /^(ಶ|ಪ್ರ)/i]
};
var matchQuarterPatterns45 = {
  narrow: /^[1234]/i,
  abbreviated: /^ತ್ರೈ[1234]|ತ್ರೈ [1234]| [1234]ತ್ರೈ/i,
  wide: /^[1234](ನೇ)? ತ್ರೈಮಾಸಿಕ/i
};
var parseQuarterPatterns45 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns45 = {
  narrow: /^(ಜೂ|ಜು|ಜ|ಫೆ|ಮಾ|ಏ|ಮೇ|ಆ|ಸೆ|ಅ|ನ|ಡಿ)/i,
  abbreviated: /^(ಜನ|ಫೆಬ್ರ|ಮಾರ್ಚ್|ಏಪ್ರಿ|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗ|ಸೆಪ್ಟೆಂ|ಅಕ್ಟೋ|ನವೆಂ|ಡಿಸೆಂ)/i,
  wide: /^(ಜನವರಿ|ಫೆಬ್ರವರಿ|ಮಾರ್ಚ್|ಏಪ್ರಿಲ್|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗಸ್ಟ್|ಸೆಪ್ಟೆಂಬರ್|ಅಕ್ಟೋಬರ್|ನವೆಂಬರ್|ಡಿಸೆಂಬರ್)/i
};
var parseMonthPatterns45 = {
  narrow: [/^ಜ$/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂ/i, /^ಜು$/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i],
  any: [/^ಜನ/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂನ್/i, /^ಜುಲೈ/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i]
};
var matchDayPatterns45 = {
  narrow: /^(ಭಾ|ಸೋ|ಮ|ಬು|ಗು|ಶು|ಶ)/i,
  short: /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  abbreviated: /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  wide: /^(ಭಾನುವಾರ|ಸೋಮವಾರ|ಮಂಗಳವಾರ|ಬುಧವಾರ|ಗುರುವಾರ|ಶುಕ್ರವಾರ|ಶನಿವಾರ)/i
};
var parseDayPatterns45 = {
  narrow: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i],
  any: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i]
};
var matchDayPeriodPatterns45 = {
  narrow: /^(ಪೂ|ಅ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i,
  any: /^(ಪೂರ್ವಾಹ್ನ|ಅಪರಾಹ್ನ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i
};
var parseDayPeriodPatterns45 = {
  any: {
    am: /^ಪೂ/i,
    pm: /^ಅ/i,
    midnight: /ಮಧ್ಯರಾತ್ರಿ/i,
    noon: /ಮಧ್ಯಾನ್ಹ/i,
    morning: /ಬೆಳಗ್ಗೆ/i,
    afternoon: /ಮಧ್ಯಾನ್ಹ/i,
    evening: /ಸಂಜೆ/i,
    night: /ರಾತ್ರಿ/i
  }
};
var match45 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern45,
    parsePattern: parseOrdinalNumberPattern45,
    valueCallback: function valueCallback88(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns45,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns45,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns45,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns45,
    defaultParseWidth: "any",
    valueCallback: function valueCallback89(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns45,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns45,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns45,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns45,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns45,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns45,
    defaultParseWidth: "any"
  })
};
var match_default46 = match45;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/kn/index.js
var locale56 = {
  code: "kn",
  formatDistance: formatDistance_default47,
  formatLong: formatLong_default54,
  formatRelative: formatRelative_default47,
  localize: localize_default47,
  match: match_default46,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var kn_default = locale56;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/_lib/formatDistance/index.js
var formatDistanceLocale46 = {
  lessThanXSeconds: {
    one: "1초 미만",
    other: "{{count}}초 미만"
  },
  xSeconds: {
    one: "1초",
    other: "{{count}}초"
  },
  halfAMinute: "30초",
  lessThanXMinutes: {
    one: "1분 미만",
    other: "{{count}}분 미만"
  },
  xMinutes: {
    one: "1분",
    other: "{{count}}분"
  },
  aboutXHours: {
    one: "약 1시간",
    other: "약 {{count}}시간"
  },
  xHours: {
    one: "1시간",
    other: "{{count}}시간"
  },
  xDays: {
    one: "1일",
    other: "{{count}}일"
  },
  aboutXWeeks: {
    one: "약 1주",
    other: "약 {{count}}주"
  },
  xWeeks: {
    one: "1주",
    other: "{{count}}주"
  },
  aboutXMonths: {
    one: "약 1개월",
    other: "약 {{count}}개월"
  },
  xMonths: {
    one: "1개월",
    other: "{{count}}개월"
  },
  aboutXYears: {
    one: "약 1년",
    other: "약 {{count}}년"
  },
  xYears: {
    one: "1년",
    other: "{{count}}년"
  },
  overXYears: {
    one: "1년 이상",
    other: "{{count}}년 이상"
  },
  almostXYears: {
    one: "거의 1년",
    other: "거의 {{count}}년"
  }
};
var formatDistance93 = function formatDistance94(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale46[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " 후";
    } else {
      return result + " 전";
    }
  }
  return result;
};
var formatDistance_default48 = formatDistance93;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/_lib/formatLong/index.js
var dateFormats55 = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
};
var timeFormats55 = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats55 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong55 = {
  date: buildFormatLongFn({
    formats: dateFormats55,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats55,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats55,
    defaultWidth: "full"
  })
};
var formatLong_default55 = formatLong55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/_lib/formatRelative/index.js
var formatRelativeLocale47 = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
};
var formatRelative93 = function formatRelative94(token, _date, _baseDate, _options) {
  return formatRelativeLocale47[token];
};
var formatRelative_default48 = formatRelative93;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/_lib/localize/index.js
var eraValues47 = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
};
var quarterValues47 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
};
var monthValues47 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  wide: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
};
var dayValues47 = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
};
var dayPeriodValues47 = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
var formattingDayPeriodValues39 = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
var ordinalNumber93 = function ordinalNumber94(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  switch (unit) {
    case "minute":
    case "second":
      return String(number);
    case "date":
      return number + "일";
    default:
      return number + "번째";
  }
};
var localize47 = {
  ordinalNumber: ordinalNumber93,
  era: buildLocalizeFn({
    values: eraValues47,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues47,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback47(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues47,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues47,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues47,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues39,
    defaultFormattingWidth: "wide"
  })
};
var localize_default48 = localize47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/_lib/match/index.js
var matchOrdinalNumberPattern46 = /^(\d+)(일|번째)?/i;
var parseOrdinalNumberPattern46 = /\d+/i;
var matchEraPatterns46 = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
};
var parseEraPatterns46 = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
};
var matchQuarterPatterns46 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
};
var parseQuarterPatterns46 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns46 = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
};
var parseMonthPatterns46 = {
  any: [/^1월?$/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns46 = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
};
var parseDayPatterns46 = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
};
var matchDayPeriodPatterns46 = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
};
var parseDayPeriodPatterns46 = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
};
var match46 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern46,
    parsePattern: parseOrdinalNumberPattern46,
    valueCallback: function valueCallback90(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns46,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns46,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns46,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns46,
    defaultParseWidth: "any",
    valueCallback: function valueCallback91(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns46,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns46,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns46,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns46,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns46,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns46,
    defaultParseWidth: "any"
  })
};
var match_default47 = match46;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ko/index.js
var locale57 = {
  code: "ko",
  formatDistance: formatDistance_default48,
  formatLong: formatLong_default55,
  formatRelative: formatRelative_default48,
  localize: localize_default48,
  match: match_default47,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ko_default = locale57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/_lib/formatDistance/index.js
var formatDistanceLocale47 = {
  lessThanXSeconds: {
    standalone: {
      one: "manner wéi eng Sekonn",
      other: "manner wéi {{count}} Sekonnen"
    },
    withPreposition: {
      one: "manner wéi enger Sekonn",
      other: "manner wéi {{count}} Sekonnen"
    }
  },
  xSeconds: {
    standalone: {
      one: "eng Sekonn",
      other: "{{count}} Sekonnen"
    },
    withPreposition: {
      one: "enger Sekonn",
      other: "{{count}} Sekonnen"
    }
  },
  halfAMinute: {
    standalone: "eng hallef Minutt",
    withPreposition: "enger hallwer Minutt"
  },
  lessThanXMinutes: {
    standalone: {
      one: "manner wéi eng Minutt",
      other: "manner wéi {{count}} Minutten"
    },
    withPreposition: {
      one: "manner wéi enger Minutt",
      other: "manner wéi {{count}} Minutten"
    }
  },
  xMinutes: {
    standalone: {
      one: "eng Minutt",
      other: "{{count}} Minutten"
    },
    withPreposition: {
      one: "enger Minutt",
      other: "{{count}} Minutten"
    }
  },
  aboutXHours: {
    standalone: {
      one: "ongeféier eng Stonn",
      other: "ongeféier {{count}} Stonnen"
    },
    withPreposition: {
      one: "ongeféier enger Stonn",
      other: "ongeféier {{count}} Stonnen"
    }
  },
  xHours: {
    standalone: {
      one: "eng Stonn",
      other: "{{count}} Stonnen"
    },
    withPreposition: {
      one: "enger Stonn",
      other: "{{count}} Stonnen"
    }
  },
  xDays: {
    standalone: {
      one: "een Dag",
      other: "{{count}} Deeg"
    },
    withPreposition: {
      one: "engem Dag",
      other: "{{count}} Deeg"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "ongeféier eng Woch",
      other: "ongeféier {{count}} Wochen"
    },
    withPreposition: {
      one: "ongeféier enger Woche",
      other: "ongeféier {{count}} Wochen"
    }
  },
  xWeeks: {
    standalone: {
      one: "eng Woch",
      other: "{{count}} Wochen"
    },
    withPreposition: {
      one: "enger Woch",
      other: "{{count}} Wochen"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "ongeféier ee Mount",
      other: "ongeféier {{count}} Méint"
    },
    withPreposition: {
      one: "ongeféier engem Mount",
      other: "ongeféier {{count}} Méint"
    }
  },
  xMonths: {
    standalone: {
      one: "ee Mount",
      other: "{{count}} Méint"
    },
    withPreposition: {
      one: "engem Mount",
      other: "{{count}} Méint"
    }
  },
  aboutXYears: {
    standalone: {
      one: "ongeféier ee Joer",
      other: "ongeféier {{count}} Joer"
    },
    withPreposition: {
      one: "ongeféier engem Joer",
      other: "ongeféier {{count}} Joer"
    }
  },
  xYears: {
    standalone: {
      one: "ee Joer",
      other: "{{count}} Joer"
    },
    withPreposition: {
      one: "engem Joer",
      other: "{{count}} Joer"
    }
  },
  overXYears: {
    standalone: {
      one: "méi wéi ee Joer",
      other: "méi wéi {{count}} Joer"
    },
    withPreposition: {
      one: "méi wéi engem Joer",
      other: "méi wéi {{count}} Joer"
    }
  },
  almostXYears: {
    standalone: {
      one: "bal ee Joer",
      other: "bal {{count}} Joer"
    },
    withPreposition: {
      one: "bal engem Joer",
      other: "bal {{count}} Joer"
    }
  }
};
var EXCEPTION_CONSONANTS = ["d", "h", "n", "t", "z"];
var VOWELS = ["a,", "e", "i", "o", "u"];
var DIGITS_SPOKEN_N_NEEDED = [0, 1, 2, 3, 8, 9];
var FIRST_TWO_DIGITS_SPOKEN_NO_N_NEEDED = [40, 50, 60, 70];
function isFinalNNeeded(nextWords) {
  var firstLetter = nextWords.charAt(0).toLowerCase();
  if (VOWELS.indexOf(firstLetter) != -1 || EXCEPTION_CONSONANTS.indexOf(firstLetter) != -1) {
    return true;
  }
  var firstWord = nextWords.split(" ")[0];
  var number = parseInt(firstWord);
  if (!isNaN(number) && DIGITS_SPOKEN_N_NEEDED.indexOf(number % 10) != -1 && FIRST_TWO_DIGITS_SPOKEN_NO_N_NEEDED.indexOf(parseInt(firstWord.substring(0, 2))) == -1) {
    return true;
  }
  return false;
}
var formatDistance95 = function formatDistance96(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale47[token];
  var usageGroup = options !== null && options !== void 0 && options.addSuffix ? tokenValue.withPreposition : tokenValue.standalone;
  if (typeof usageGroup === "string") {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "a" + (isFinalNNeeded(result) ? "n" : "") + " " + result;
    } else {
      return "viru" + (isFinalNNeeded(result) ? "n" : "") + " " + result;
    }
  }
  return result;
};
var formatDistance_default49 = formatDistance95;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/_lib/formatLong/index.js
var dateFormats56 = {
  full: "EEEE, do MMMM y",
  // Méindeg, 7. Januar 2018
  long: "do MMMM y",
  // 7. Januar 2018
  medium: "do MMM y",
  // 7. Jan 2018
  short: "dd.MM.yy"
  // 07.01.18
};
var timeFormats56 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats56 = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong56 = {
  date: buildFormatLongFn({
    formats: dateFormats56,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats56,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats56,
    defaultWidth: "full"
  })
};
var formatLong_default56 = formatLong56;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/_lib/formatRelative/index.js
var formatRelativeLocale48 = {
  lastWeek: function lastWeek9(date) {
    var day = date.getUTCDay();
    var result = "'läschte";
    if (day === 2 || day === 4) {
      result += "n";
    }
    result += "' eeee 'um' p";
    return result;
  },
  yesterday: "'gëschter um' p",
  today: "'haut um' p",
  tomorrow: "'moien um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
};
var formatRelative95 = function formatRelative96(token, date, _baseDate, _options) {
  var format = formatRelativeLocale48[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default49 = formatRelative95;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/_lib/localize/index.js
var eraValues48 = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["viru Christus", "no Christus"]
};
var quarterValues48 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
};
var monthValues48 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mäe", "Abr", "Mee", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  wide: ["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
};
var dayValues48 = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mé", "Dë", "Më", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mé.", "Dë.", "Më.", "Do.", "Fr.", "Sa."],
  wide: ["Sonndeg", "Méindeg", "Dënschdeg", "Mëttwoch", "Donneschdeg", "Freideg", "Samschdeg"]
};
var dayPeriodValues48 = {
  narrow: {
    am: "mo.",
    pm: "nomë.",
    midnight: "Mëtternuecht",
    noon: "Mëtteg",
    morning: "Moien",
    afternoon: "Nomëtteg",
    evening: "Owend",
    night: "Nuecht"
  },
  abbreviated: {
    am: "moies",
    pm: "nomëttes",
    midnight: "Mëtternuecht",
    noon: "Mëtteg",
    morning: "Moien",
    afternoon: "Nomëtteg",
    evening: "Owend",
    night: "Nuecht"
  },
  wide: {
    am: "moies",
    pm: "nomëttes",
    midnight: "Mëtternuecht",
    noon: "Mëtteg",
    morning: "Moien",
    afternoon: "Nomëtteg",
    evening: "Owend",
    night: "Nuecht"
  }
};
var formattingDayPeriodValues40 = {
  narrow: {
    am: "mo.",
    pm: "nom.",
    midnight: "Mëtternuecht",
    noon: "mëttes",
    morning: "moies",
    afternoon: "nomëttes",
    evening: "owes",
    night: "nuets"
  },
  abbreviated: {
    am: "moies",
    pm: "nomëttes",
    midnight: "Mëtternuecht",
    noon: "mëttes",
    morning: "moies",
    afternoon: "nomëttes",
    evening: "owes",
    night: "nuets"
  },
  wide: {
    am: "moies",
    pm: "nomëttes",
    midnight: "Mëtternuecht",
    noon: "mëttes",
    morning: "moies",
    afternoon: "nomëttes",
    evening: "owes",
    night: "nuets"
  }
};
var ordinalNumber95 = function ordinalNumber96(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize48 = {
  ordinalNumber: ordinalNumber95,
  era: buildLocalizeFn({
    values: eraValues48,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues48,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback48(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues48,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues48,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues48,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues40,
    defaultFormattingWidth: "wide"
  })
};
var localize_default49 = localize48;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/_lib/match/index.js
var matchOrdinalNumberPattern47 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern47 = /\d+/i;
var matchEraPatterns47 = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(viru Christus|virun eiser Zäitrechnung|no Christus|eiser Zäitrechnung)/i
};
var parseEraPatterns47 = {
  any: [/^v/i, /^n/i]
};
var matchQuarterPatterns47 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
var parseQuarterPatterns47 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns47 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mäe|abr|mee|jun|jul|aug|sep|okt|nov|dez)/i,
  wide: /^(januar|februar|mäerz|abrëll|mee|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns47 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mä/i, /^ab/i, /^me/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns47 = {
  narrow: /^[smdf]/i,
  short: /^(so|mé|dë|më|do|fr|sa)/i,
  abbreviated: /^(son?|méi?|dën?|mët?|don?|fre?|sam?)\.?/i,
  wide: /^(sonndeg|méindeg|dënschdeg|mëttwoch|donneschdeg|freideg|samschdeg)/i
};
var parseDayPatterns47 = {
  any: [/^so/i, /^mé/i, /^dë/i, /^më/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns47 = {
  narrow: /^(mo\.?|nomë\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  abbreviated: /^(moi\.?|nomët\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  wide: /^(moies|nomëttes|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i
};
var parseDayPeriodPatterns47 = {
  any: {
    am: /^m/i,
    pm: /^n/i,
    midnight: /^Mëtter/i,
    noon: /^mëttes/i,
    morning: /moies/i,
    afternoon: /nomëttes/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /owes/i,
    night: /nuets/i
    // will never be matched. Night is matched by `pm`
  }
};
var match47 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern47,
    parsePattern: parseOrdinalNumberPattern47,
    valueCallback: function valueCallback92(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns47,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns47,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns47,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns47,
    defaultParseWidth: "any",
    valueCallback: function valueCallback93(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns47,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns47,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns47,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns47,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns47,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns47,
    defaultParseWidth: "any"
  })
};
var match_default48 = match47;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lb/index.js
var locale58 = {
  code: "lb",
  formatDistance: formatDistance_default49,
  formatLong: formatLong_default56,
  formatRelative: formatRelative_default49,
  localize: localize_default49,
  match: match_default48,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var lb_default = locale58;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/_lib/formatDistance/index.js
var translations2 = {
  xseconds_other: "sekundė_sekundžių_sekundes",
  xminutes_one: "minutė_minutės_minutę",
  xminutes_other: "minutės_minučių_minutes",
  xhours_one: "valanda_valandos_valandą",
  xhours_other: "valandos_valandų_valandas",
  xdays_one: "diena_dienos_dieną",
  xdays_other: "dienos_dienų_dienas",
  xweeks_one: "savaitė_savaitės_savaitę",
  xweeks_other: "savaitės_savaičių_savaites",
  xmonths_one: "mėnuo_mėnesio_mėnesį",
  xmonths_other: "mėnesiai_mėnesių_mėnesius",
  xyears_one: "metai_metų_metus",
  xyears_other: "metai_metų_metus",
  about: "apie",
  over: "daugiau nei",
  almost: "beveik",
  lessthan: "mažiau nei"
};
var translateSeconds = function translateSeconds2(_number, addSuffix, _key, isFuture) {
  if (!addSuffix) {
    return "kelios sekundės";
  } else {
    return isFuture ? "kelių sekundžių" : "kelias sekundes";
  }
};
var translateSingular = function translateSingular2(_number, addSuffix, key, isFuture) {
  return !addSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
};
var translate = function translate2(number, addSuffix, key, isFuture) {
  var result = number + " ";
  if (number === 1) {
    return result + translateSingular(number, addSuffix, key, isFuture);
  } else if (!addSuffix) {
    return result + (special(number) ? forms(key)[1] : forms(key)[0]);
  } else {
    if (isFuture) {
      return result + forms(key)[1];
    } else {
      return result + (special(number) ? forms(key)[1] : forms(key)[2]);
    }
  }
};
function special(number) {
  return number % 10 === 0 || number > 10 && number < 20;
}
function forms(key) {
  return translations2[key].split("_");
}
var formatDistanceLocale48 = {
  lessThanXSeconds: {
    one: translateSeconds,
    other: translate
  },
  xSeconds: {
    one: translateSeconds,
    other: translate
  },
  halfAMinute: "pusė minutės",
  lessThanXMinutes: {
    one: translateSingular,
    other: translate
  },
  xMinutes: {
    one: translateSingular,
    other: translate
  },
  aboutXHours: {
    one: translateSingular,
    other: translate
  },
  xHours: {
    one: translateSingular,
    other: translate
  },
  xDays: {
    one: translateSingular,
    other: translate
  },
  aboutXWeeks: {
    one: translateSingular,
    other: translate
  },
  xWeeks: {
    one: translateSingular,
    other: translate
  },
  aboutXMonths: {
    one: translateSingular,
    other: translate
  },
  xMonths: {
    one: translateSingular,
    other: translate
  },
  aboutXYears: {
    one: translateSingular,
    other: translate
  },
  xYears: {
    one: translateSingular,
    other: translate
  },
  overXYears: {
    one: translateSingular,
    other: translate
  },
  almostXYears: {
    one: translateSingular,
    other: translate
  }
};
var formatDistance97 = function formatDistance98(token, count, options) {
  var adverb = token.match(/about|over|almost|lessthan/i);
  var unit = adverb ? token.replace(adverb[0], "") : token;
  var isFuture = (options === null || options === void 0 ? void 0 : options.comparison) !== void 0 && options.comparison > 0;
  var result;
  var tokenValue = formatDistanceLocale48[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one(count, (options === null || options === void 0 ? void 0 : options.addSuffix) === true, unit.toLowerCase() + "_one", isFuture);
  } else {
    result = tokenValue.other(count, (options === null || options === void 0 ? void 0 : options.addSuffix) === true, unit.toLowerCase() + "_other", isFuture);
  }
  if (adverb) {
    var _key2 = adverb[0].toLowerCase();
    result = translations2[_key2] + " " + result;
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "po " + result;
    } else {
      return "prieš " + result;
    }
  }
  return result;
};
var formatDistance_default50 = formatDistance97;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/_lib/formatLong/index.js
var dateFormats57 = {
  full: "y 'm'. MMMM d 'd'., EEEE",
  long: "y 'm'. MMMM d 'd'.",
  medium: "y-MM-dd",
  short: "y-MM-dd"
};
var timeFormats57 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats57 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong57 = {
  date: buildFormatLongFn({
    formats: dateFormats57,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats57,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats57,
    defaultWidth: "full"
  })
};
var formatLong_default57 = formatLong57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/_lib/formatRelative/index.js
var formatRelativeLocale49 = {
  lastWeek: "'Praėjusį' eeee p",
  yesterday: "'Vakar' p",
  today: "'Šiandien' p",
  tomorrow: "'Rytoj' p",
  nextWeek: "eeee p",
  other: "P"
};
var formatRelative97 = function formatRelative98(token, _date, _baseDate, _options) {
  return formatRelativeLocale49[token];
};
var formatRelative_default50 = formatRelative97;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/_lib/localize/index.js
var eraValues49 = {
  narrow: ["pr. Kr.", "po Kr."],
  abbreviated: ["pr. Kr.", "po Kr."],
  wide: ["prieš Kristų", "po Kristaus"]
};
var quarterValues49 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["I ketv.", "II ketv.", "III ketv.", "IV ketv."],
  wide: ["I ketvirtis", "II ketvirtis", "III ketvirtis", "IV ketvirtis"]
};
var formattingQuarterValues2 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["I k.", "II k.", "III k.", "IV k."],
  wide: ["I ketvirtis", "II ketvirtis", "III ketvirtis", "IV ketvirtis"]
};
var monthValues49 = {
  narrow: ["S", "V", "K", "B", "G", "B", "L", "R", "R", "S", "L", "G"],
  abbreviated: ["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod."],
  wide: ["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis"]
};
var formattingMonthValues11 = {
  narrow: ["S", "V", "K", "B", "G", "B", "L", "R", "R", "S", "L", "G"],
  abbreviated: ["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod."],
  wide: ["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"]
};
var dayValues49 = {
  narrow: ["S", "P", "A", "T", "K", "P", "Š"],
  short: ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"],
  abbreviated: ["sk", "pr", "an", "tr", "kt", "pn", "št"],
  wide: ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"]
};
var formattingDayValues2 = {
  narrow: ["S", "P", "A", "T", "K", "P", "Š"],
  short: ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"],
  abbreviated: ["sk", "pr", "an", "tr", "kt", "pn", "št"],
  wide: ["sekmadienį", "pirmadienį", "antradienį", "trečiadienį", "ketvirtadienį", "penktadienį", "šeštadienį"]
};
var dayPeriodValues49 = {
  narrow: {
    am: "pr. p.",
    pm: "pop.",
    midnight: "vidurnaktis",
    noon: "vidurdienis",
    morning: "rytas",
    afternoon: "diena",
    evening: "vakaras",
    night: "naktis"
  },
  abbreviated: {
    am: "priešpiet",
    pm: "popiet",
    midnight: "vidurnaktis",
    noon: "vidurdienis",
    morning: "rytas",
    afternoon: "diena",
    evening: "vakaras",
    night: "naktis"
  },
  wide: {
    am: "priešpiet",
    pm: "popiet",
    midnight: "vidurnaktis",
    noon: "vidurdienis",
    morning: "rytas",
    afternoon: "diena",
    evening: "vakaras",
    night: "naktis"
  }
};
var formattingDayPeriodValues41 = {
  narrow: {
    am: "pr. p.",
    pm: "pop.",
    midnight: "vidurnaktis",
    noon: "perpiet",
    morning: "rytas",
    afternoon: "popietė",
    evening: "vakaras",
    night: "naktis"
  },
  abbreviated: {
    am: "priešpiet",
    pm: "popiet",
    midnight: "vidurnaktis",
    noon: "perpiet",
    morning: "rytas",
    afternoon: "popietė",
    evening: "vakaras",
    night: "naktis"
  },
  wide: {
    am: "priešpiet",
    pm: "popiet",
    midnight: "vidurnaktis",
    noon: "perpiet",
    morning: "rytas",
    afternoon: "popietė",
    evening: "vakaras",
    night: "naktis"
  }
};
var ordinalNumber97 = function ordinalNumber98(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "-oji";
};
var localize49 = {
  ordinalNumber: ordinalNumber97,
  era: buildLocalizeFn({
    values: eraValues49,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues49,
    defaultWidth: "wide",
    formattingValues: formattingQuarterValues2,
    defaultFormattingWidth: "wide",
    argumentCallback: function argumentCallback49(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues49,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues11,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues49,
    defaultWidth: "wide",
    formattingValues: formattingDayValues2,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues49,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues41,
    defaultFormattingWidth: "wide"
  })
};
var localize_default50 = localize49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/_lib/match/index.js
var matchOrdinalNumberPattern48 = /^(\d+)(-oji)?/i;
var parseOrdinalNumberPattern48 = /\d+/i;
var matchEraPatterns48 = {
  narrow: /^p(r|o)\.?\s?(kr\.?|me)/i,
  abbreviated: /^(pr\.\s?(kr\.|m\.\s?e\.)|po\s?kr\.|mūsų eroje)/i,
  wide: /^(prieš Kristų|prieš mūsų erą|po Kristaus|mūsų eroje)/i
};
var parseEraPatterns48 = {
  wide: [/prieš/i, /(po|mūsų)/i],
  any: [/^pr/i, /^(po|m)/i]
};
var matchQuarterPatterns48 = {
  narrow: /^([1234])/i,
  abbreviated: /^(I|II|III|IV)\s?ketv?\.?/i,
  wide: /^(I|II|III|IV)\s?ketvirtis/i
};
var parseQuarterPatterns48 = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/I$/i, /II$/i, /III/i, /IV/i]
};
var matchMonthPatterns48 = {
  narrow: /^[svkbglr]/i,
  abbreviated: /^(saus\.|vas\.|kov\.|bal\.|geg\.|birž\.|liep\.|rugp\.|rugs\.|spal\.|lapkr\.|gruod\.)/i,
  wide: /^(sausi(s|o)|vasari(s|o)|kov(a|o)s|balandž?i(s|o)|gegužės?|birželi(s|o)|liep(a|os)|rugpjū(t|č)i(s|o)|rugsėj(is|o)|spali(s|o)|lapkri(t|č)i(s|o)|gruodž?i(s|o))/i
};
var parseMonthPatterns48 = {
  narrow: [/^s/i, /^v/i, /^k/i, /^b/i, /^g/i, /^b/i, /^l/i, /^r/i, /^r/i, /^s/i, /^l/i, /^g/i],
  any: [/^saus/i, /^vas/i, /^kov/i, /^bal/i, /^geg/i, /^birž/i, /^liep/i, /^rugp/i, /^rugs/i, /^spal/i, /^lapkr/i, /^gruod/i]
};
var matchDayPatterns48 = {
  narrow: /^[spatkš]/i,
  short: /^(sk|pr|an|tr|kt|pn|št)/i,
  abbreviated: /^(sk|pr|an|tr|kt|pn|št)/i,
  wide: /^(sekmadien(is|į)|pirmadien(is|į)|antradien(is|į)|trečiadien(is|į)|ketvirtadien(is|į)|penktadien(is|į)|šeštadien(is|į))/i
};
var parseDayPatterns48 = {
  narrow: [/^s/i, /^p/i, /^a/i, /^t/i, /^k/i, /^p/i, /^š/i],
  wide: [/^se/i, /^pi/i, /^an/i, /^tr/i, /^ke/i, /^pe/i, /^še/i],
  any: [/^sk/i, /^pr/i, /^an/i, /^tr/i, /^kt/i, /^pn/i, /^št/i]
};
var matchDayPeriodPatterns48 = {
  narrow: /^(pr.\s?p.|pop.|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i,
  any: /^(priešpiet|popiet$|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i
};
var parseDayPeriodPatterns48 = {
  narrow: {
    am: /^pr/i,
    pm: /^pop./i,
    midnight: /^vidurnaktis/i,
    noon: /^(vidurdienis|perp)/i,
    morning: /rytas/i,
    afternoon: /(die|popietė)/i,
    evening: /vakaras/i,
    night: /naktis/i
  },
  any: {
    am: /^pr/i,
    pm: /^popiet$/i,
    midnight: /^vidurnaktis/i,
    noon: /^(vidurdienis|perp)/i,
    morning: /rytas/i,
    afternoon: /(die|popietė)/i,
    evening: /vakaras/i,
    night: /naktis/i
  }
};
var match48 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern48,
    parsePattern: parseOrdinalNumberPattern48,
    valueCallback: function valueCallback94(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns48,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns48,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns48,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns48,
    defaultParseWidth: "any",
    valueCallback: function valueCallback95(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns48,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns48,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns48,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns48,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns48,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns48,
    defaultParseWidth: "any"
  })
};
var match_default49 = match48;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lt/index.js
var locale59 = {
  code: "lt",
  formatDistance: formatDistance_default50,
  formatLong: formatLong_default57,
  formatRelative: formatRelative_default50,
  localize: localize_default50,
  match: match_default49,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var lt_default = locale59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/_lib/formatDistance/index.js
function buildLocalizeTokenFn3(schema) {
  return function(count, options) {
    if (count === 1) {
      if (options !== null && options !== void 0 && options.addSuffix) {
        return schema.one[0].replace("{{time}}", schema.one[2]);
      } else {
        return schema.one[0].replace("{{time}}", schema.one[1]);
      }
    } else {
      var rem = count % 10 === 1 && count % 100 !== 11;
      if (options !== null && options !== void 0 && options.addSuffix) {
        return schema.other[0].replace("{{time}}", rem ? schema.other[3] : schema.other[4]).replace("{{count}}", String(count));
      } else {
        return schema.other[0].replace("{{time}}", rem ? schema.other[1] : schema.other[2]).replace("{{count}}", String(count));
      }
    }
  };
}
var formatDistanceLocale49 = {
  lessThanXSeconds: buildLocalizeTokenFn3({
    one: ["mazāk par {{time}}", "sekundi", "sekundi"],
    other: ["mazāk nekā {{count}} {{time}}", "sekunde", "sekundes", "sekundes", "sekundēm"]
  }),
  xSeconds: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "sekunde", "sekundes"],
    other: ["{{count}} {{time}}", "sekunde", "sekundes", "sekundes", "sekundēm"]
  }),
  halfAMinute: function halfAMinute6(_count, options) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      return "pusminūtes";
    } else {
      return "pusminūte";
    }
  },
  lessThanXMinutes: buildLocalizeTokenFn3({
    one: ["mazāk par {{time}}", "minūti", "minūti"],
    other: ["mazāk nekā {{count}} {{time}}", "minūte", "minūtes", "minūtes", "minūtēm"]
  }),
  xMinutes: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "minūte", "minūtes"],
    other: ["{{count}} {{time}}", "minūte", "minūtes", "minūtes", "minūtēm"]
  }),
  aboutXHours: buildLocalizeTokenFn3({
    one: ["apmēram 1 {{time}}", "stunda", "stundas"],
    other: ["apmēram {{count}} {{time}}", "stunda", "stundas", "stundas", "stundām"]
  }),
  xHours: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "stunda", "stundas"],
    other: ["{{count}} {{time}}", "stunda", "stundas", "stundas", "stundām"]
  }),
  xDays: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "diena", "dienas"],
    other: ["{{count}} {{time}}", "diena", "dienas", "dienas", "dienām"]
  }),
  aboutXWeeks: buildLocalizeTokenFn3({
    one: ["apmēram 1 {{time}}", "nedēļa", "nedēļas"],
    other: ["apmēram {{count}} {{time}}", "nedēļa", "nedēļu", "nedēļas", "nedēļām"]
  }),
  xWeeks: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "nedēļa", "nedēļas"],
    other: [
      "{{count}} {{time}}",
      // TODO
      "nedēļa",
      "nedēļu",
      "nedēļas",
      "nedēļām"
    ]
  }),
  aboutXMonths: buildLocalizeTokenFn3({
    one: ["apmēram 1 {{time}}", "mēnesis", "mēneša"],
    other: ["apmēram {{count}} {{time}}", "mēnesis", "mēneši", "mēneša", "mēnešiem"]
  }),
  xMonths: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "mēnesis", "mēneša"],
    other: ["{{count}} {{time}}", "mēnesis", "mēneši", "mēneša", "mēnešiem"]
  }),
  aboutXYears: buildLocalizeTokenFn3({
    one: ["apmēram 1 {{time}}", "gads", "gada"],
    other: ["apmēram {{count}} {{time}}", "gads", "gadi", "gada", "gadiem"]
  }),
  xYears: buildLocalizeTokenFn3({
    one: ["1 {{time}}", "gads", "gada"],
    other: ["{{count}} {{time}}", "gads", "gadi", "gada", "gadiem"]
  }),
  overXYears: buildLocalizeTokenFn3({
    one: ["ilgāk par 1 {{time}}", "gadu", "gadu"],
    other: ["vairāk nekā {{count}} {{time}}", "gads", "gadi", "gada", "gadiem"]
  }),
  almostXYears: buildLocalizeTokenFn3({
    one: ["gandrīz 1 {{time}}", "gads", "gada"],
    other: ["vairāk nekā {{count}} {{time}}", "gads", "gadi", "gada", "gadiem"]
  })
};
var formatDistance99 = function formatDistance100(token, count, options) {
  var result = formatDistanceLocale49[token](count, options);
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "pēc " + result;
    } else {
      return "pirms " + result;
    }
  }
  return result;
};
var formatDistance_default51 = formatDistance99;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/_lib/formatLong/index.js
var dateFormats58 = {
  full: "EEEE, y. 'gada' d. MMMM",
  long: "y. 'gada' d. MMMM",
  medium: "dd.MM.y.",
  short: "dd.MM.y."
};
var timeFormats58 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats58 = {
  full: "{{date}} 'plkst.' {{time}}",
  long: "{{date}} 'plkst.' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong58 = {
  date: buildFormatLongFn({
    formats: dateFormats58,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats58,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats58,
    defaultWidth: "full"
  })
};
var formatLong_default58 = formatLong58;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/_lib/formatRelative/index.js
var weekdays3 = ["svētdienā", "pirmdienā", "otrdienā", "trešdienā", "ceturtdienā", "piektdienā", "sestdienā"];
var formatRelativeLocale50 = {
  lastWeek: function lastWeek10(date, baseDate, options) {
    if (isSameUTCWeek(date, baseDate, options)) {
      return "eeee 'plkst.' p";
    }
    var weekday = weekdays3[date.getUTCDay()];
    return "'Pagājušā " + weekday + " plkst.' p";
  },
  yesterday: "'Vakar plkst.' p",
  today: "'Šodien plkst.' p",
  tomorrow: "'Rīt plkst.' p",
  nextWeek: function nextWeek9(date, baseDate, options) {
    if (isSameUTCWeek(date, baseDate, options)) {
      return "eeee 'plkst.' p";
    }
    var weekday = weekdays3[date.getUTCDay()];
    return "'Nākamajā " + weekday + " plkst.' p";
  },
  other: "P"
};
var formatRelative99 = function formatRelative100(token, date, baseDate, options) {
  var format = formatRelativeLocale50[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default51 = formatRelative99;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/_lib/localize/index.js
var eraValues50 = {
  narrow: ["p.m.ē", "m.ē"],
  abbreviated: ["p. m. ē.", "m. ē."],
  wide: ["pirms mūsu ēras", "mūsu ērā"]
};
var quarterValues50 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. cet.", "2. cet.", "3. cet.", "4. cet."],
  wide: ["pirmais ceturksnis", "otrais ceturksnis", "trešais ceturksnis", "ceturtais ceturksnis"]
};
var formattingQuarterValues3 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. cet.", "2. cet.", "3. cet.", "4. cet."],
  wide: ["pirmajā ceturksnī", "otrajā ceturksnī", "trešajā ceturksnī", "ceturtajā ceturksnī"]
};
var monthValues50 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec."],
  wide: ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"]
};
var formattingMonthValues12 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "febr.", "martā", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec."],
  wide: ["janvārī", "februārī", "martā", "aprīlī", "maijā", "jūnijā", "jūlijā", "augustā", "septembrī", "oktobrī", "novembrī", "decembrī"]
};
var dayValues50 = {
  narrow: ["S", "P", "O", "T", "C", "P", "S"],
  short: ["Sv", "P", "O", "T", "C", "Pk", "S"],
  abbreviated: ["svētd.", "pirmd.", "otrd.", "trešd.", "ceturtd.", "piektd.", "sestd."],
  wide: ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"]
};
var formattingDayValues3 = {
  narrow: ["S", "P", "O", "T", "C", "P", "S"],
  short: ["Sv", "P", "O", "T", "C", "Pk", "S"],
  abbreviated: ["svētd.", "pirmd.", "otrd.", "trešd.", "ceturtd.", "piektd.", "sestd."],
  wide: ["svētdienā", "pirmdienā", "otrdienā", "trešdienā", "ceturtdienā", "piektdienā", "sestdienā"]
};
var dayPeriodValues50 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "pusn.",
    noon: "pusd.",
    morning: "rīts",
    afternoon: "diena",
    evening: "vakars",
    night: "nakts"
  },
  abbreviated: {
    am: "am",
    pm: "pm",
    midnight: "pusn.",
    noon: "pusd.",
    morning: "rīts",
    afternoon: "pēcpusd.",
    evening: "vakars",
    night: "nakts"
  },
  wide: {
    am: "am",
    pm: "pm",
    midnight: "pusnakts",
    noon: "pusdienlaiks",
    morning: "rīts",
    afternoon: "pēcpusdiena",
    evening: "vakars",
    night: "nakts"
  }
};
var formattingDayPeriodValues42 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "pusn.",
    noon: "pusd.",
    morning: "rītā",
    afternoon: "dienā",
    evening: "vakarā",
    night: "naktī"
  },
  abbreviated: {
    am: "am",
    pm: "pm",
    midnight: "pusn.",
    noon: "pusd.",
    morning: "rītā",
    afternoon: "pēcpusd.",
    evening: "vakarā",
    night: "naktī"
  },
  wide: {
    am: "am",
    pm: "pm",
    midnight: "pusnaktī",
    noon: "pusdienlaikā",
    morning: "rītā",
    afternoon: "pēcpusdienā",
    evening: "vakarā",
    night: "naktī"
  }
};
var ordinalNumber99 = function ordinalNumber100(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize50 = {
  ordinalNumber: ordinalNumber99,
  era: buildLocalizeFn({
    values: eraValues50,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues50,
    defaultWidth: "wide",
    formattingValues: formattingQuarterValues3,
    defaultFormattingWidth: "wide",
    argumentCallback: function argumentCallback50(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues50,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues12,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues50,
    defaultWidth: "wide",
    formattingValues: formattingDayValues3,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues50,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues42,
    defaultFormattingWidth: "wide"
  })
};
var localize_default51 = localize50;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/_lib/match/index.js
var matchOrdinalNumberPattern49 = /^(\d+)\./i;
var parseOrdinalNumberPattern49 = /\d+/i;
var matchEraPatterns49 = {
  narrow: /^(p\.m\.ē|m\.ē)/i,
  abbreviated: /^(p\. m\. ē\.|m\. ē\.)/i,
  wide: /^(pirms mūsu ēras|mūsu ērā)/i
};
var parseEraPatterns49 = {
  any: [/^p/i, /^m/i]
};
var matchQuarterPatterns49 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](\. cet\.)/i,
  wide: /^(pirma(is|jā)|otra(is|jā)|treša(is|jā)|ceturta(is|jā)) ceturksn(is|ī)/i
};
var parseQuarterPatterns49 = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i],
  abbreviated: [/^1/i, /^2/i, /^3/i, /^4/i],
  wide: [/^p/i, /^o/i, /^t/i, /^c/i]
};
var matchMonthPatterns49 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv\.|febr\.|marts|apr\.|maijs|jūn\.|jūl\.|aug\.|sept\.|okt\.|nov\.|dec\.)/i,
  wide: /^(janvār(is|ī)|februār(is|ī)|mart[sā]|aprīl(is|ī)|maij[sā]|jūnij[sā]|jūlij[sā]|august[sā]|septembr(is|ī)|oktobr(is|ī)|novembr(is|ī)|decembr(is|ī))/i
};
var parseMonthPatterns49 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jūn/i, /^jūl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns49 = {
  narrow: /^[spotc]/i,
  short: /^(sv|pi|o|t|c|pk|s)/i,
  abbreviated: /^(svētd\.|pirmd\.|otrd.\|trešd\.|ceturtd\.|piektd\.|sestd\.)/i,
  wide: /^(svētdien(a|ā)|pirmdien(a|ā)|otrdien(a|ā)|trešdien(a|ā)|ceturtdien(a|ā)|piektdien(a|ā)|sestdien(a|ā))/i
};
var parseDayPatterns49 = {
  narrow: [/^s/i, /^p/i, /^o/i, /^t/i, /^c/i, /^p/i, /^s/i],
  any: [/^sv/i, /^pi/i, /^o/i, /^t/i, /^c/i, /^p/i, /^se/i]
};
var matchDayPeriodPatterns49 = {
  narrow: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|dien(a|ā)|vakar(s|ā)|nakt(s|ī))/,
  abbreviated: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|pēcpusd\.|vakar(s|ā)|nakt(s|ī))/,
  wide: /^(am|pm|pusnakt(s|ī)|pusdienlaik(s|ā)|rīt(s|ā)|pēcpusdien(a|ā)|vakar(s|ā)|nakt(s|ī))/i
};
var parseDayPeriodPatterns49 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^pusn/i,
    noon: /^pusd/i,
    morning: /^r/i,
    afternoon: /^(d|pēc)/i,
    evening: /^v/i,
    night: /^n/i
  }
};
var match49 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern49,
    parsePattern: parseOrdinalNumberPattern49,
    valueCallback: function valueCallback96(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns49,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns49,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns49,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns49,
    defaultParseWidth: "wide",
    valueCallback: function valueCallback97(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns49,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns49,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns49,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns49,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns49,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns49,
    defaultParseWidth: "any"
  })
};
var match_default50 = match49;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/lv/index.js
var locale60 = {
  code: "lv",
  formatDistance: formatDistance_default51,
  formatLong: formatLong_default58,
  formatRelative: formatRelative_default51,
  localize: localize_default51,
  match: match_default50,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var lv_default = locale60;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/_lib/formatDistance/index.js
var formatDistanceLocale50 = {
  lessThanXSeconds: {
    one: "помалку од секунда",
    other: "помалку од {{count}} секунди"
  },
  xSeconds: {
    one: "1 секунда",
    other: "{{count}} секунди"
  },
  halfAMinute: "половина минута",
  lessThanXMinutes: {
    one: "помалку од минута",
    other: "помалку од {{count}} минути"
  },
  xMinutes: {
    one: "1 минута",
    other: "{{count}} минути"
  },
  aboutXHours: {
    one: "околу 1 час",
    other: "околу {{count}} часа"
  },
  xHours: {
    one: "1 час",
    other: "{{count}} часа"
  },
  xDays: {
    one: "1 ден",
    other: "{{count}} дена"
  },
  aboutXWeeks: {
    one: "околу 1 недела",
    other: "околу {{count}} месеци"
  },
  xWeeks: {
    one: "1 недела",
    other: "{{count}} недели"
  },
  aboutXMonths: {
    one: "околу 1 месец",
    other: "околу {{count}} недели"
  },
  xMonths: {
    one: "1 месец",
    other: "{{count}} месеци"
  },
  aboutXYears: {
    one: "околу 1 година",
    other: "околу {{count}} години"
  },
  xYears: {
    one: "1 година",
    other: "{{count}} години"
  },
  overXYears: {
    one: "повеќе од 1 година",
    other: "повеќе од {{count}} години"
  },
  almostXYears: {
    one: "безмалку 1 година",
    other: "безмалку {{count}} години"
  }
};
var formatDistance101 = function formatDistance102(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale50[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "за " + result;
    } else {
      return "пред " + result;
    }
  }
  return result;
};
var formatDistance_default52 = formatDistance101;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/_lib/formatLong/index.js
var dateFormats59 = {
  full: "EEEE, dd MMMM yyyy",
  long: "dd MMMM yyyy",
  medium: "dd MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats59 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "H:mm"
};
var dateTimeFormats59 = {
  any: "{{date}} {{time}}"
};
var formatLong59 = {
  date: buildFormatLongFn({
    formats: dateFormats59,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats59,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats59,
    defaultWidth: "any"
  })
};
var formatLong_default59 = formatLong59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/_lib/formatRelative/index.js
var weekdays4 = ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"];
function _lastWeek3(day) {
  var weekday = weekdays4[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'минатата " + weekday + " во' p";
    case 1:
    case 2:
    case 4:
    case 5:
      return "'минатиот " + weekday + " во' p";
  }
}
function thisWeek6(day) {
  var weekday = weekdays4[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'ова " + weekday + " вo' p";
    case 1:
    case 2:
    case 4:
    case 5:
      return "'овој " + weekday + " вo' p";
  }
}
function _nextWeek3(day) {
  var weekday = weekdays4[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'следната " + weekday + " вo' p";
    case 1:
    case 2:
    case 4:
    case 5:
      return "'следниот " + weekday + " вo' p";
  }
}
var formatRelativeLocale51 = {
  lastWeek: function lastWeek11(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek6(day);
    } else {
      return _lastWeek3(day);
    }
  },
  yesterday: "'вчера во' p",
  today: "'денес во' p",
  tomorrow: "'утре во' p",
  nextWeek: function nextWeek10(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek6(day);
    } else {
      return _nextWeek3(day);
    }
  },
  other: "P"
};
var formatRelative101 = function formatRelative102(token, date, baseDate, options) {
  var format = formatRelativeLocale51[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default52 = formatRelative101;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/_lib/localize/index.js
var eraValues51 = {
  narrow: ["пр.н.е.", "н.е."],
  abbreviated: ["пред н. е.", "н. е."],
  wide: ["пред нашата ера", "нашата ера"]
};
var quarterValues51 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-ви кв.", "2-ри кв.", "3-ти кв.", "4-ти кв."],
  wide: ["1-ви квартал", "2-ри квартал", "3-ти квартал", "4-ти квартал"]
};
var monthValues51 = {
  abbreviated: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "септ", "окт", "ноем", "дек"],
  wide: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"]
};
var dayValues51 = {
  narrow: ["Н", "П", "В", "С", "Ч", "П", "С"],
  short: ["не", "по", "вт", "ср", "че", "пе", "са"],
  abbreviated: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
  wide: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"]
};
var dayPeriodValues51 = {
  wide: {
    am: "претпладне",
    pm: "попладне",
    midnight: "полноќ",
    noon: "напладне",
    morning: "наутро",
    afternoon: "попладне",
    evening: "навечер",
    night: "ноќе"
  }
};
var ordinalNumber101 = function ordinalNumber102(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "-ви";
      case 2:
        return number + "-ри";
      case 7:
      case 8:
        return number + "-ми";
    }
  }
  return number + "-ти";
};
var localize51 = {
  ordinalNumber: ordinalNumber101,
  era: buildLocalizeFn({
    values: eraValues51,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues51,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback51(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues51,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues51,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues51,
    defaultWidth: "wide"
  })
};
var localize_default52 = localize51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/_lib/match/index.js
var matchOrdinalNumberPattern50 = /^(\d+)(-?[врмт][и])?/i;
var parseOrdinalNumberPattern50 = /\d+/i;
var matchEraPatterns50 = {
  narrow: /^((пр)?н\.?\s?е\.?)/i,
  abbreviated: /^((пр)?н\.?\s?е\.?)/i,
  wide: /^(пред нашата ера|нашата ера)/i
};
var parseEraPatterns50 = {
  any: [/^п/i, /^н/i]
};
var matchQuarterPatterns50 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[врт]?и?)? кв.?/i,
  wide: /^[1234](-?[врт]?и?)? квартал/i
};
var parseQuarterPatterns50 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchDayPatterns50 = {
  narrow: /^[нпвсч]/i,
  short: /^(не|по|вт|ср|че|пе|са)/i,
  abbreviated: /^(нед|пон|вто|сре|чет|пет|саб)/i,
  wide: /^(недела|понеделник|вторник|среда|четврток|петок|сабота)/i
};
var parseDayPatterns50 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н[ед]/i, /^п[он]/i, /^вт/i, /^ср/i, /^ч[ет]/i, /^п[ет]/i, /^с[аб]/i]
};
var matchMonthPatterns50 = {
  abbreviated: /^(јан|фев|мар|апр|мај|јун|јул|авг|сеп|окт|ноем|дек)/i,
  wide: /^(јануари|февруари|март|април|мај|јуни|јули|август|септември|октомври|ноември|декември)/i
};
var parseMonthPatterns50 = {
  any: [/^ја/i, /^Ф/i, /^мар/i, /^ап/i, /^мај/i, /^јун/i, /^јул/i, /^ав/i, /^се/i, /^окт/i, /^но/i, /^де/i]
};
var matchDayPeriodPatterns50 = {
  any: /^(претп|попл|полноќ|утро|пладне|вечер|ноќ)/i
};
var parseDayPeriodPatterns50 = {
  any: {
    am: /претпладне/i,
    pm: /попладне/i,
    midnight: /полноќ/i,
    noon: /напладне/i,
    morning: /наутро/i,
    afternoon: /попладне/i,
    evening: /навечер/i,
    night: /ноќе/i
  }
};
var match50 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern50,
    parsePattern: parseOrdinalNumberPattern50,
    valueCallback: function valueCallback98(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns50,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns50,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns50,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns50,
    defaultParseWidth: "any",
    valueCallback: function valueCallback99(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns50,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns50,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns50,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns50,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns50,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns50,
    defaultParseWidth: "any"
  })
};
var match_default51 = match50;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mk/index.js
var locale61 = {
  code: "mk",
  formatDistance: formatDistance_default52,
  formatLong: formatLong_default59,
  formatRelative: formatRelative_default52,
  localize: localize_default52,
  match: match_default51,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var mk_default = locale61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/_lib/formatDistance/index.js
var formatDistanceLocale51 = {
  lessThanXSeconds: {
    one: "секунд хүрэхгүй",
    other: "{{count}} секунд хүрэхгүй"
  },
  xSeconds: {
    one: "1 секунд",
    other: "{{count}} секунд"
  },
  halfAMinute: "хагас минут",
  lessThanXMinutes: {
    one: "минут хүрэхгүй",
    other: "{{count}} минут хүрэхгүй"
  },
  xMinutes: {
    one: "1 минут",
    other: "{{count}} минут"
  },
  aboutXHours: {
    one: "ойролцоогоор 1 цаг",
    other: "ойролцоогоор {{count}} цаг"
  },
  xHours: {
    one: "1 цаг",
    other: "{{count}} цаг"
  },
  xDays: {
    one: "1 өдөр",
    other: "{{count}} өдөр"
  },
  aboutXWeeks: {
    one: "ойролцоогоор 1 долоо хоног",
    other: "ойролцоогоор {{count}} долоо хоног"
  },
  xWeeks: {
    one: "1 долоо хоног",
    other: "{{count}} долоо хоног"
  },
  aboutXMonths: {
    one: "ойролцоогоор 1 сар",
    other: "ойролцоогоор {{count}} сар"
  },
  xMonths: {
    one: "1 сар",
    other: "{{count}} сар"
  },
  aboutXYears: {
    one: "ойролцоогоор 1 жил",
    other: "ойролцоогоор {{count}} жил"
  },
  xYears: {
    one: "1 жил",
    other: "{{count}} жил"
  },
  overXYears: {
    one: "1 жил гаран",
    other: "{{count}} жил гаран"
  },
  almostXYears: {
    one: "бараг 1 жил",
    other: "бараг {{count}} жил"
  }
};
var formatDistance103 = function formatDistance104(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale51[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    var words = result.split(" ");
    var lastword = words.pop();
    result = words.join(" ");
    switch (lastword) {
      case "секунд":
        result += " секундийн";
        break;
      case "минут":
        result += " минутын";
        break;
      case "цаг":
        result += " цагийн";
        break;
      case "өдөр":
        result += " өдрийн";
        break;
      case "сар":
        result += " сарын";
        break;
      case "жил":
        result += " жилийн";
        break;
      case "хоног":
        result += " хоногийн";
        break;
      case "гаран":
        result += " гараны";
        break;
      case "хүрэхгүй":
        result += " хүрэхгүй хугацааны";
        break;
      default:
        result += lastword + "-н";
    }
    if (options.comparison && options.comparison > 0) {
      return result + " дараа";
    } else {
      return result + " өмнө";
    }
  }
  return result;
};
var formatDistance_default53 = formatDistance103;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/_lib/formatLong/index.js
var dateFormats60 = {
  full: "y 'оны' MMMM'ын' d, EEEE 'гараг'",
  long: "y 'оны' MMMM'ын' d",
  medium: "y 'оны' MMM'ын' d",
  short: "y.MM.dd"
};
var timeFormats60 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats60 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong60 = {
  date: buildFormatLongFn({
    formats: dateFormats60,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats60,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats60,
    defaultWidth: "full"
  })
};
var formatLong_default60 = formatLong60;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/_lib/formatRelative/index.js
var formatRelativeLocale52 = {
  lastWeek: "'өнгөрсөн' eeee 'гарагийн' p 'цагт'",
  yesterday: "'өчигдөр' p 'цагт'",
  today: "'өнөөдөр' p 'цагт'",
  tomorrow: "'маргааш' p 'цагт'",
  nextWeek: "'ирэх' eeee 'гарагийн' p 'цагт'",
  other: "P"
};
var formatRelative103 = function formatRelative104(token, _date, _baseDate, _options) {
  return formatRelativeLocale52[token];
};
var formatRelative_default53 = formatRelative103;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/_lib/localize/index.js
var eraValues52 = {
  narrow: ["НТӨ", "НТ"],
  abbreviated: ["НТӨ", "НТ"],
  wide: ["нийтийн тооллын өмнөх", "нийтийн тооллын"]
};
var quarterValues52 = {
  narrow: ["I", "II", "III", "IV"],
  abbreviated: ["I улирал", "II улирал", "III улирал", "IV улирал"],
  wide: ["1-р улирал", "2-р улирал", "3-р улирал", "4-р улирал"]
};
var monthValues52 = {
  narrow: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"],
  abbreviated: ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
  wide: ["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургаадугаар сар", "Долоодугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арваннэгдүгээр сар", "Арван хоёрдугаар сар"]
};
var formattingMonthValues13 = {
  narrow: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"],
  abbreviated: ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
  wide: ["нэгдүгээр сар", "хоёрдугаар сар", "гуравдугаар сар", "дөрөвдүгээр сар", "тавдугаар сар", "зургаадугаар сар", "долоодугаар сар", "наймдугаар сар", "есдүгээр сар", "аравдугаар сар", "арваннэгдүгээр сар", "арван хоёрдугаар сар"]
};
var dayValues52 = {
  narrow: ["Н", "Д", "М", "Л", "П", "Б", "Б"],
  short: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
  abbreviated: ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"],
  wide: ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"]
};
var formattingDayValues4 = {
  narrow: ["Н", "Д", "М", "Л", "П", "Б", "Б"],
  short: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
  abbreviated: ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"],
  wide: ["ням", "даваа", "мягмар", "лхагва", "пүрэв", "баасан", "бямба"]
};
var dayPeriodValues52 = {
  narrow: {
    am: "ү.ө.",
    pm: "ү.х.",
    midnight: "шөнө дунд",
    noon: "үд дунд",
    morning: "өглөө",
    afternoon: "өдөр",
    evening: "орой",
    night: "шөнө"
  },
  abbreviated: {
    am: "ү.ө.",
    pm: "ү.х.",
    midnight: "шөнө дунд",
    noon: "үд дунд",
    morning: "өглөө",
    afternoon: "өдөр",
    evening: "орой",
    night: "шөнө"
  },
  wide: {
    am: "ү.ө.",
    pm: "ү.х.",
    midnight: "шөнө дунд",
    noon: "үд дунд",
    morning: "өглөө",
    afternoon: "өдөр",
    evening: "орой",
    night: "шөнө"
  }
};
var ordinalNumber103 = function ordinalNumber104(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize52 = {
  ordinalNumber: ordinalNumber103,
  era: buildLocalizeFn({
    values: eraValues52,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues52,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback52(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues52,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues13,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues52,
    defaultWidth: "wide",
    formattingValues: formattingDayValues4,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues52,
    defaultWidth: "wide"
  })
};
var localize_default53 = localize52;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/_lib/match/index.js
var matchOrdinalNumberPattern51 = /\d+/i;
var parseOrdinalNumberPattern51 = /\d+/i;
var matchEraPatterns51 = {
  narrow: /^(нтө|нт)/i,
  abbreviated: /^(нтө|нт)/i,
  wide: /^(нийтийн тооллын өмнө|нийтийн тооллын)/i
};
var parseEraPatterns51 = {
  any: [/^(нтө|нийтийн тооллын өмнө)/i, /^(нт|нийтийн тооллын)/i]
};
var matchQuarterPatterns51 = {
  narrow: /^(iv|iii|ii|i)/i,
  abbreviated: /^(iv|iii|ii|i) улирал/i,
  wide: /^[1-4]-р улирал/i
};
var parseQuarterPatterns51 = {
  any: [/^(i(\s|$)|1)/i, /^(ii(\s|$)|2)/i, /^(iii(\s|$)|3)/i, /^(iv(\s|$)|4)/i]
};
var matchMonthPatterns51 = {
  narrow: /^(xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i)/i,
  abbreviated: /^(1-р сар|2-р сар|3-р сар|4-р сар|5-р сар|6-р сар|7-р сар|8-р сар|9-р сар|10-р сар|11-р сар|12-р сар)/i,
  wide: /^(нэгдүгээр сар|хоёрдугаар сар|гуравдугаар сар|дөрөвдүгээр сар|тавдугаар сар|зургаадугаар сар|долоодугаар сар|наймдугаар сар|есдүгээр сар|аравдугаар сар|арван нэгдүгээр сар|арван хоёрдугаар сар)/i
};
var parseMonthPatterns51 = {
  narrow: [/^i$/i, /^ii$/i, /^iii$/i, /^iv$/i, /^v$/i, /^vi$/i, /^vii$/i, /^viii$/i, /^ix$/i, /^x$/i, /^xi$/i, /^xii$/i],
  any: [/^(1|нэгдүгээр)/i, /^(2|хоёрдугаар)/i, /^(3|гуравдугаар)/i, /^(4|дөрөвдүгээр)/i, /^(5|тавдугаар)/i, /^(6|зургаадугаар)/i, /^(7|долоодугаар)/i, /^(8|наймдугаар)/i, /^(9|есдүгээр)/i, /^(10|аравдугаар)/i, /^(11|арван нэгдүгээр)/i, /^(12|арван хоёрдугаар)/i]
};
var matchDayPatterns51 = {
  narrow: /^[ндмлпбб]/i,
  short: /^(ня|да|мя|лх|пү|ба|бя)/i,
  abbreviated: /^(ням|дав|мяг|лха|пүр|баа|бям)/i,
  wide: /^(ням|даваа|мягмар|лхагва|пүрэв|баасан|бямба)/i
};
var parseDayPatterns51 = {
  narrow: [/^н/i, /^д/i, /^м/i, /^л/i, /^п/i, /^б/i, /^б/i],
  any: [/^ня/i, /^да/i, /^мя/i, /^лх/i, /^пү/i, /^ба/i, /^бя/i]
};
var matchDayPeriodPatterns51 = {
  narrow: /^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i,
  any: /^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i
};
var parseDayPeriodPatterns51 = {
  any: {
    am: /^ү\.ө\./i,
    pm: /^ү\.х\./i,
    midnight: /^шөнө дунд/i,
    noon: /^үд дунд/i,
    morning: /өглөө/i,
    afternoon: /өдөр/i,
    evening: /орой/i,
    night: /шөнө/i
  }
};
var match51 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern51,
    parsePattern: parseOrdinalNumberPattern51,
    valueCallback: function valueCallback100(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns51,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns51,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns51,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns51,
    defaultParseWidth: "any",
    valueCallback: function valueCallback101(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns51,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns51,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns51,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns51,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns51,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns51,
    defaultParseWidth: "any"
  })
};
var match_default52 = match51;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mn/index.js
var locale62 = {
  code: "mn",
  formatDistance: formatDistance_default53,
  formatLong: formatLong_default60,
  formatRelative: formatRelative_default53,
  localize: localize_default53,
  match: match_default52,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var mn_default = locale62;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/_lib/formatDistance/index.js
var formatDistanceLocale52 = {
  lessThanXSeconds: {
    one: "kurang dari 1 saat",
    other: "kurang dari {{count}} saat"
  },
  xSeconds: {
    one: "1 saat",
    other: "{{count}} saat"
  },
  halfAMinute: "setengah minit",
  lessThanXMinutes: {
    one: "kurang dari 1 minit",
    other: "kurang dari {{count}} minit"
  },
  xMinutes: {
    one: "1 minit",
    other: "{{count}} minit"
  },
  aboutXHours: {
    one: "sekitar 1 jam",
    other: "sekitar {{count}} jam"
  },
  xHours: {
    one: "1 jam",
    other: "{{count}} jam"
  },
  xDays: {
    one: "1 hari",
    other: "{{count}} hari"
  },
  aboutXWeeks: {
    one: "sekitar 1 minggu",
    other: "sekitar {{count}} minggu"
  },
  xWeeks: {
    one: "1 minggu",
    other: "{{count}} minggu"
  },
  aboutXMonths: {
    one: "sekitar 1 bulan",
    other: "sekitar {{count}} bulan"
  },
  xMonths: {
    one: "1 bulan",
    other: "{{count}} bulan"
  },
  aboutXYears: {
    one: "sekitar 1 tahun",
    other: "sekitar {{count}} tahun"
  },
  xYears: {
    one: "1 tahun",
    other: "{{count}} tahun"
  },
  overXYears: {
    one: "lebih dari 1 tahun",
    other: "lebih dari {{count}} tahun"
  },
  almostXYears: {
    one: "hampir 1 tahun",
    other: "hampir {{count}} tahun"
  }
};
var formatDistance105 = function formatDistance106(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale52[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dalam masa " + result;
    } else {
      return result + " yang lalu";
    }
  }
  return result;
};
var formatDistance_default54 = formatDistance105;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/_lib/formatLong/index.js
var dateFormats61 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "d/M/yyyy"
};
var timeFormats61 = {
  full: "HH.mm.ss",
  long: "HH.mm.ss",
  medium: "HH.mm",
  short: "HH.mm"
};
var dateTimeFormats61 = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong61 = {
  date: buildFormatLongFn({
    formats: dateFormats61,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats61,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats61,
    defaultWidth: "full"
  })
};
var formatLong_default61 = formatLong61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/_lib/formatRelative/index.js
var formatRelativeLocale53 = {
  lastWeek: "eeee 'lepas pada jam' p",
  yesterday: "'Semalam pada jam' p",
  today: "'Hari ini pada jam' p",
  tomorrow: "'Esok pada jam' p",
  nextWeek: "eeee 'pada jam' p",
  other: "P"
};
var formatRelative105 = function formatRelative106(token, _date, _baseDate, _options) {
  return formatRelativeLocale53[token];
};
var formatRelative_default54 = formatRelative105;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/_lib/localize/index.js
var eraValues53 = {
  narrow: ["SM", "M"],
  abbreviated: ["SM", "M"],
  wide: ["Sebelum Masihi", "Masihi"]
};
var quarterValues53 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["S1", "S2", "S3", "S4"],
  wide: ["Suku pertama", "Suku kedua", "Suku ketiga", "Suku keempat"]
};
var monthValues53 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "O", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
  wide: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"]
};
var dayValues53 = {
  narrow: ["A", "I", "S", "R", "K", "J", "S"],
  short: ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
  abbreviated: ["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
  wide: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"]
};
var dayPeriodValues53 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "tgh malam",
    noon: "tgh hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  }
};
var formattingDayPeriodValues43 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "tengah malam",
    noon: "tengah hari",
    morning: "pagi",
    afternoon: "tengah hari",
    evening: "petang",
    night: "malam"
  }
};
var ordinalNumber105 = function ordinalNumber106(dirtyNumber, _options) {
  return "ke-" + Number(dirtyNumber);
};
var localize53 = {
  ordinalNumber: ordinalNumber105,
  era: buildLocalizeFn({
    values: eraValues53,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues53,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback53(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues53,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues53,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues53,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues43,
    defaultFormattingWidth: "wide"
  })
};
var localize_default54 = localize53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/_lib/match/index.js
var matchOrdinalNumberPattern52 = /^ke-(\d+)?/i;
var parseOrdinalNumberPattern52 = /petama|\d+/i;
var matchEraPatterns52 = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|m\.?)/i,
  wide: /^(sebelum masihi|masihi)/i
};
var parseEraPatterns52 = {
  any: [/^s/i, /^(m)/i]
};
var matchQuarterPatterns52 = {
  narrow: /^[1234]/i,
  abbreviated: /^S[1234]/i,
  wide: /Suku (pertama|kedua|ketiga|keempat)/i
};
var parseQuarterPatterns52 = {
  any: [/pertama|1/i, /kedua|2/i, /ketiga|3/i, /keempat|4/i]
};
var matchMonthPatterns52 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mac|apr|mei|jun|jul|ogo|sep|okt|nov|dis)/i,
  wide: /^(januari|februari|mac|april|mei|jun|julai|ogos|september|oktober|november|disember)/i
};
var parseMonthPatterns52 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^o/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^og/i, /^s/i, /^ok/i, /^n/i, /^d/i]
};
var matchDayPatterns52 = {
  narrow: /^[aisrkj]/i,
  short: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
  abbreviated: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
  wide: /^(ahad|isnin|selasa|rabu|khamis|jumaat|sabtu)/i
};
var parseDayPatterns52 = {
  narrow: [/^a/i, /^i/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^a/i, /^i/i, /^se/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
var matchDayPeriodPatterns52 = {
  narrow: /^(am|pm|tengah malam|tengah hari|pagi|petang|malam)/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|pagi|petang|malam)/i
};
var parseDayPeriodPatterns52 = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pa/i,
    afternoon: /tengah h/i,
    evening: /pe/i,
    night: /m/i
  }
};
var match52 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern52,
    parsePattern: parseOrdinalNumberPattern52,
    valueCallback: function valueCallback102(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns52,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns52,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns52,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns52,
    defaultParseWidth: "any",
    valueCallback: function valueCallback103(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns52,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns52,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns52,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns52,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns52,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns52,
    defaultParseWidth: "any"
  })
};
var match_default53 = match52;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ms/index.js
var locale63 = {
  code: "ms",
  formatDistance: formatDistance_default54,
  formatLong: formatLong_default61,
  formatRelative: formatRelative_default54,
  localize: localize_default54,
  match: match_default53,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ms_default = locale63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/_lib/formatDistance/index.js
var formatDistanceLocale53 = {
  lessThanXSeconds: {
    one: "inqas minn sekonda",
    other: "inqas minn {{count}} sekondi"
  },
  xSeconds: {
    one: "sekonda",
    other: "{{count}} sekondi"
  },
  halfAMinute: "nofs minuta",
  lessThanXMinutes: {
    one: "inqas minn minuta",
    other: "inqas minn {{count}} minuti"
  },
  xMinutes: {
    one: "minuta",
    other: "{{count}} minuti"
  },
  aboutXHours: {
    one: "madwar siegħa",
    other: "madwar {{count}} siegħat"
  },
  xHours: {
    one: "siegħa",
    other: "{{count}} siegħat"
  },
  xDays: {
    one: "ġurnata",
    other: "{{count}} ġranet"
  },
  aboutXWeeks: {
    one: "madwar ġimgħa",
    other: "madwar {{count}} ġimgħat"
  },
  xWeeks: {
    one: "ġimgħa",
    other: "{{count}} ġimgħat"
  },
  aboutXMonths: {
    one: "madwar xahar",
    other: "madwar {{count}} xhur"
  },
  xMonths: {
    one: "xahar",
    other: "{{count}} xhur"
  },
  aboutXYears: {
    one: "madwar sena",
    two: "madwar sentejn",
    other: "madwar {{count}} snin"
  },
  xYears: {
    one: "sena",
    two: "sentejn",
    other: "{{count}} snin"
  },
  overXYears: {
    one: "aktar minn sena",
    two: "aktar minn sentejn",
    other: "aktar minn {{count}} snin"
  },
  almostXYears: {
    one: "kważi sena",
    two: "kważi sentejn",
    other: "kważi {{count}} snin"
  }
};
var formatDistance107 = function formatDistance108(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale53[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2 && tokenValue.two) {
    result = tokenValue.two;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "f'" + result;
    } else {
      return result + " ilu";
    }
  }
  return result;
};
var formatDistance_default55 = formatDistance107;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/_lib/formatLong/index.js
var dateFormats62 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats62 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats62 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong62 = {
  date: buildFormatLongFn({
    formats: dateFormats62,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats62,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats62,
    defaultWidth: "full"
  })
};
var formatLong_default62 = formatLong62;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/_lib/formatRelative/index.js
var formatRelativeLocale54 = {
  lastWeek: "eeee 'li għadda' 'fil-'p",
  yesterday: "'Il-bieraħ fil-'p",
  today: "'Illum fil-'p",
  tomorrow: "'Għada fil-'p",
  nextWeek: "eeee 'fil-'p",
  other: "P"
};
var formatRelative107 = function formatRelative108(token, _date, _baseDate, _options) {
  return formatRelativeLocale54[token];
};
var formatRelative_default55 = formatRelative107;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/_lib/localize/index.js
var eraValues54 = {
  narrow: ["Q", "W"],
  abbreviated: ["QK", "WK"],
  wide: ["qabel Kristu", "wara Kristu"]
};
var quarterValues54 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1. kwart", "2. kwart", "3. kwart", "4. kwart"]
};
var monthValues54 = {
  narrow: ["J", "F", "M", "A", "M", "Ġ", "L", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Fra", "Mar", "Apr", "Mej", "Ġun", "Lul", "Aww", "Set", "Ott", "Nov", "Diċ"],
  wide: ["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", "Ottubru", "Novembru", "Diċembru"]
};
var dayValues54 = {
  narrow: ["Ħ", "T", "T", "E", "Ħ", "Ġ", "S"],
  short: ["Ħa", "Tn", "Tl", "Er", "Ħa", "Ġi", "Si"],
  abbreviated: ["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"],
  wide: ["Il-Ħadd", "It-Tnejn", "It-Tlieta", "L-Erbgħa", "Il-Ħamis", "Il-Ġimgħa", "Is-Sibt"]
};
var dayPeriodValues54 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "nofsillejl",
    noon: "nofsinhar",
    morning: "għodwa",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "lejl"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "nofsillejl",
    noon: "nofsinhar",
    morning: "għodwa",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "lejl"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "nofsillejl",
    noon: "nofsinhar",
    morning: "għodwa",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "lejl"
  }
};
var formattingDayPeriodValues44 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: "filgħodu",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "billejl"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: "filgħodu",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "billejl"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: "filgħodu",
    afternoon: "wara nofsinhar",
    evening: "filgħaxija",
    night: "billejl"
  }
};
var ordinalNumber107 = function ordinalNumber108(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "º";
};
var localize54 = {
  ordinalNumber: ordinalNumber107,
  era: buildLocalizeFn({
    values: eraValues54,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues54,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback54(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues54,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues54,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues54,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues44,
    defaultFormattingWidth: "wide"
  })
};
var localize_default55 = localize54;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/_lib/match/index.js
var matchOrdinalNumberPattern53 = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern53 = /\d+/i;
var matchEraPatterns53 = {
  narrow: /^(q|w)/i,
  abbreviated: /^(q\.?\s?k\.?|b\.?\s?c\.?\s?e\.?|w\.?\s?k\.?)/i,
  wide: /^(qabel kristu|before common era|wara kristu|common era)/i
};
var parseEraPatterns53 = {
  any: [/^(q|b)/i, /^(w|c)/i]
};
var matchQuarterPatterns53 = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](\.)? kwart/i
};
var parseQuarterPatterns53 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns53 = {
  narrow: /^[jfmaglsond]/i,
  abbreviated: /^(jan|fra|mar|apr|mej|ġun|lul|aww|set|ott|nov|diċ)/i,
  wide: /^(jannar|frar|marzu|april|mejju|ġunju|lulju|awwissu|settembru|ottubru|novembru|diċembru)/i
};
var parseMonthPatterns53 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^ġ/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mej/i, /^ġ/i, /^l/i, /^aw/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns53 = {
  narrow: /^[ħteġs]/i,
  short: /^(ħa|tn|tl|er|ħa|ġi|si)/i,
  abbreviated: /^(ħad|tne|tli|erb|ħam|ġim|sib)/i,
  wide: /^(il-ħadd|it-tnejn|it-tlieta|l-erbgħa|il-ħamis|il-ġimgħa|is-sibt)/i
};
var parseDayPatterns53 = {
  narrow: [/^ħ/i, /^t/i, /^t/i, /^e/i, /^ħ/i, /^ġ/i, /^s/i],
  any: [/^(il-)?ħad/i, /^(it-)?tn/i, /^(it-)?tl/i, /^(l-)?er/i, /^(il-)?ham/i, /^(il-)?ġi/i, /^(is-)?si/i]
};
var matchDayPeriodPatterns53 = {
  narrow: /^(a|p|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i,
  any: /^([ap]\.?\s?m\.?|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i
};
var parseDayPeriodPatterns53 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^f'nofsillejl/i,
    noon: /^f'nofsinhar/i,
    morning: /għodwa/i,
    afternoon: /wara(\s.*)nofsinhar/i,
    evening: /filgħaxija/i,
    night: /lejl/i
  }
};
var match53 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern53,
    parsePattern: parseOrdinalNumberPattern53,
    valueCallback: function valueCallback104(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns53,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns53,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns53,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns53,
    defaultParseWidth: "any",
    valueCallback: function valueCallback105(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns53,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns53,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns53,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns53,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns53,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns53,
    defaultParseWidth: "any"
  })
};
var match_default54 = match53;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/mt/index.js
var locale64 = {
  code: "mt",
  formatDistance: formatDistance_default55,
  formatLong: formatLong_default62,
  formatRelative: formatRelative_default55,
  localize: localize_default55,
  match: match_default54,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var mt_default = locale64;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/_lib/formatDistance/index.js
var formatDistanceLocale54 = {
  lessThanXSeconds: {
    one: "mindre enn ett sekund",
    other: "mindre enn {{count}} sekunder"
  },
  xSeconds: {
    one: "ett sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "et halvt minutt",
  lessThanXMinutes: {
    one: "mindre enn ett minutt",
    other: "mindre enn {{count}} minutter"
  },
  xMinutes: {
    one: "ett minutt",
    other: "{{count}} minutter"
  },
  aboutXHours: {
    one: "omtrent en time",
    other: "omtrent {{count}} timer"
  },
  xHours: {
    one: "en time",
    other: "{{count}} timer"
  },
  xDays: {
    one: "en dag",
    other: "{{count}} dager"
  },
  aboutXWeeks: {
    one: "omtrent en uke",
    other: "omtrent {{count}} uker"
  },
  xWeeks: {
    one: "en uke",
    other: "{{count}} uker"
  },
  aboutXMonths: {
    one: "omtrent en måned",
    other: "omtrent {{count}} måneder"
  },
  xMonths: {
    one: "en måned",
    other: "{{count}} måneder"
  },
  aboutXYears: {
    one: "omtrent ett år",
    other: "omtrent {{count}} år"
  },
  xYears: {
    one: "ett år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over ett år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "nesten ett år",
    other: "nesten {{count}} år"
  }
};
var formatDistance109 = function formatDistance110(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale54[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " siden";
    }
  }
  return result;
};
var formatDistance_default56 = formatDistance109;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/_lib/formatLong/index.js
var dateFormats63 = {
  full: "EEEE d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd.MM.y"
};
var timeFormats63 = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats63 = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong63 = {
  date: buildFormatLongFn({
    formats: dateFormats63,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats63,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats63,
    defaultWidth: "full"
  })
};
var formatLong_default63 = formatLong63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/_lib/formatRelative/index.js
var formatRelativeLocale55 = {
  lastWeek: "'forrige' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: "P"
};
var formatRelative109 = function formatRelative110(token, _date, _baseDate, _options) {
  return formatRelativeLocale55[token];
};
var formatRelative_default56 = formatRelative109;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/_lib/localize/index.js
var eraValues55 = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["før Kristus", "etter Kristus"]
};
var quarterValues55 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues55 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."],
  wide: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
};
var dayValues55 = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
  abbreviated: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
  wide: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
};
var dayPeriodValues55 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natten"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natten"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morgenen",
    afternoon: "på ettermiddagen",
    evening: "på kvelden",
    night: "på natten"
  }
};
var ordinalNumber109 = function ordinalNumber110(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize55 = {
  ordinalNumber: ordinalNumber109,
  era: buildLocalizeFn({
    values: eraValues55,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues55,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback55(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues55,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues55,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues55,
    defaultWidth: "wide"
  })
};
var localize_default56 = localize55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/_lib/match/index.js
var matchOrdinalNumberPattern54 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern54 = /\d+/i;
var matchEraPatterns54 = {
  narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
};
var parseEraPatterns54 = {
  any: [/^f/i, /^e/i]
};
var matchQuarterPatterns54 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns54 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns54 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
  wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
};
var parseMonthPatterns54 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns54 = {
  narrow: /^[smtofl]/i,
  short: /^(sø|ma|ti|on|to|fr|lø)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
var parseDayPatterns54 = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns54 = {
  narrow: /^(midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten)|[ap])/i,
  any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten))/i
};
var parseDayPeriodPatterns54 = {
  any: {
    am: /^a(\.?\s?m\.?)?$/i,
    pm: /^p(\.?\s?m\.?)?$/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgen/i,
    afternoon: /ettermiddag/i,
    evening: /kveld/i,
    night: /natt/i
  }
};
var match54 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern54,
    parsePattern: parseOrdinalNumberPattern54,
    valueCallback: function valueCallback106(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns54,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns54,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns54,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns54,
    defaultParseWidth: "any",
    valueCallback: function valueCallback107(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns54,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns54,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns54,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns54,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns54,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns54,
    defaultParseWidth: "any"
  })
};
var match_default55 = match54;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nb/index.js
var locale65 = {
  code: "nb",
  formatDistance: formatDistance_default56,
  formatLong: formatLong_default63,
  formatRelative: formatRelative_default56,
  localize: localize_default56,
  match: match_default55,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var nb_default = locale65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/_lib/formatDistance/index.js
var formatDistanceLocale55 = {
  lessThanXSeconds: {
    one: "minder dan een seconde",
    other: "minder dan {{count}} seconden"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} seconden"
  },
  halfAMinute: "een halve minuut",
  lessThanXMinutes: {
    one: "minder dan een minuut",
    other: "minder dan {{count}} minuten"
  },
  xMinutes: {
    one: "een minuut",
    other: "{{count}} minuten"
  },
  aboutXHours: {
    one: "ongeveer 1 uur",
    other: "ongeveer {{count}} uur"
  },
  xHours: {
    one: "1 uur",
    other: "{{count}} uur"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dagen"
  },
  aboutXWeeks: {
    one: "ongeveer 1 week",
    other: "ongeveer {{count}} weken"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weken"
  },
  aboutXMonths: {
    one: "ongeveer 1 maand",
    other: "ongeveer {{count}} maanden"
  },
  xMonths: {
    one: "1 maand",
    other: "{{count}} maanden"
  },
  aboutXYears: {
    one: "ongeveer 1 jaar",
    other: "ongeveer {{count}} jaar"
  },
  xYears: {
    one: "1 jaar",
    other: "{{count}} jaar"
  },
  overXYears: {
    one: "meer dan 1 jaar",
    other: "meer dan {{count}} jaar"
  },
  almostXYears: {
    one: "bijna 1 jaar",
    other: "bijna {{count}} jaar"
  }
};
var formatDistance111 = function formatDistance112(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale55[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "over " + result;
    } else {
      return result + " geleden";
    }
  }
  return result;
};
var formatDistance_default57 = formatDistance111;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/_lib/formatLong/index.js
var dateFormats64 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd-MM-y"
};
var timeFormats64 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats64 = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong64 = {
  date: buildFormatLongFn({
    formats: dateFormats64,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats64,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats64,
    defaultWidth: "full"
  })
};
var formatLong_default64 = formatLong64;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/_lib/formatRelative/index.js
var formatRelativeLocale56 = {
  lastWeek: "'afgelopen' eeee 'om' p",
  yesterday: "'gisteren om' p",
  today: "'vandaag om' p",
  tomorrow: "'morgen om' p",
  nextWeek: "eeee 'om' p",
  other: "P"
};
var formatRelative111 = function formatRelative112(token, _date, _baseDate, _options) {
  return formatRelativeLocale56[token];
};
var formatRelative_default57 = formatRelative111;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/_lib/localize/index.js
var eraValues56 = {
  narrow: ["v.C.", "n.C."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["voor Christus", "na Christus"]
};
var quarterValues56 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1e kwartaal", "2e kwartaal", "3e kwartaal", "4e kwartaal"]
};
var monthValues56 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
};
var dayValues56 = {
  narrow: ["Z", "M", "D", "W", "D", "V", "Z"],
  short: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  abbreviated: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
  wide: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
};
var dayPeriodValues56 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middaguur",
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  }
};
var ordinalNumber111 = function ordinalNumber112(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "e";
};
var localize56 = {
  ordinalNumber: ordinalNumber111,
  era: buildLocalizeFn({
    values: eraValues56,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues56,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback56(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues56,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues56,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues56,
    defaultWidth: "wide"
  })
};
var localize_default57 = localize56;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/_lib/match/index.js
var matchOrdinalNumberPattern55 = /^(\d+)e?/i;
var parseOrdinalNumberPattern55 = /\d+/i;
var matchEraPatterns55 = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?Chr\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns55 = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns55 = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e kwartaal/i
};
var parseQuarterPatterns55 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns55 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i
};
var parseMonthPatterns55 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mei/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i]
};
var matchDayPatterns55 = {
  narrow: /^[zmdwv]/i,
  short: /^(zo|ma|di|wo|do|vr|za)/i,
  abbreviated: /^(zon|maa|din|woe|don|vri|zat)/i,
  wide: /^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i
};
var parseDayPatterns55 = {
  narrow: [/^z/i, /^m/i, /^d/i, /^w/i, /^d/i, /^v/i, /^z/i],
  any: [/^zo/i, /^ma/i, /^di/i, /^wo/i, /^do/i, /^vr/i, /^za/i]
};
var matchDayPeriodPatterns55 = {
  any: /^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i
};
var parseDayPeriodPatterns55 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^het middaguur/i,
    morning: /ochtend/i,
    afternoon: /middag/i,
    evening: /avond/i,
    night: /nacht/i
  }
};
var match55 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern55,
    parsePattern: parseOrdinalNumberPattern55,
    valueCallback: function valueCallback108(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns55,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns55,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns55,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns55,
    defaultParseWidth: "any",
    valueCallback: function valueCallback109(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns55,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns55,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns55,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns55,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns55,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns55,
    defaultParseWidth: "any"
  })
};
var match_default56 = match55;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl/index.js
var locale66 = {
  code: "nl",
  formatDistance: formatDistance_default57,
  formatLong: formatLong_default64,
  formatRelative: formatRelative_default57,
  localize: localize_default57,
  match: match_default56,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var nl_default = locale66;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/_lib/formatDistance/index.js
var formatDistanceLocale56 = {
  lessThanXSeconds: {
    one: "minder dan een seconde",
    other: "minder dan {{count}} seconden"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} seconden"
  },
  halfAMinute: "een halve minuut",
  lessThanXMinutes: {
    one: "minder dan een minuut",
    other: "minder dan {{count}} minuten"
  },
  xMinutes: {
    one: "een minuut",
    other: "{{count}} minuten"
  },
  aboutXHours: {
    one: "ongeveer 1 uur",
    other: "ongeveer {{count}} uur"
  },
  xHours: {
    one: "1 uur",
    other: "{{count}} uur"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dagen"
  },
  aboutXWeeks: {
    one: "ongeveer 1 week",
    other: "ongeveer {{count}} weken"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weken"
  },
  aboutXMonths: {
    one: "ongeveer 1 maand",
    other: "ongeveer {{count}} maanden"
  },
  xMonths: {
    one: "1 maand",
    other: "{{count}} maanden"
  },
  aboutXYears: {
    one: "ongeveer 1 jaar",
    other: "ongeveer {{count}} jaar"
  },
  xYears: {
    one: "1 jaar",
    other: "{{count}} jaar"
  },
  overXYears: {
    one: "meer dan 1 jaar",
    other: "meer dan {{count}} jaar"
  },
  almostXYears: {
    one: "bijna 1 jaar",
    other: "bijna {{count}} jaar"
  }
};
var formatDistance113 = function formatDistance114(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale56[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "over " + result;
    } else {
      return result + " geleden";
    }
  }
  return result;
};
var formatDistance_default58 = formatDistance113;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/_lib/formatLong/index.js
var dateFormats65 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd.MM.y"
};
var timeFormats65 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats65 = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong65 = {
  date: buildFormatLongFn({
    formats: dateFormats65,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats65,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats65,
    defaultWidth: "full"
  })
};
var formatLong_default65 = formatLong65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/_lib/formatRelative/index.js
var formatRelativeLocale57 = {
  lastWeek: "'vorige' eeee 'om' p",
  yesterday: "'gisteren om' p",
  today: "'vandaag om' p",
  tomorrow: "'morgen om' p",
  nextWeek: "eeee 'om' p",
  other: "P"
};
var formatRelative113 = function formatRelative114(token, _date, _baseDate, _options) {
  return formatRelativeLocale57[token];
};
var formatRelative_default58 = formatRelative113;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/_lib/localize/index.js
var eraValues57 = {
  narrow: ["v.C.", "n.C."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["voor Christus", "na Christus"]
};
var quarterValues57 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["1e kwartaal", "2e kwartaal", "3e kwartaal", "4e kwartaal"]
};
var monthValues57 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
};
var dayValues57 = {
  narrow: ["Z", "M", "D", "W", "D", "V", "Z"],
  short: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  abbreviated: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
  wide: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
};
var dayPeriodValues57 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middag",
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middag",
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "middernacht",
    noon: "het middag",
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  }
};
var ordinalNumber113 = function ordinalNumber114(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "e";
};
var localize57 = {
  ordinalNumber: ordinalNumber113,
  era: buildLocalizeFn({
    values: eraValues57,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues57,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback57(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues57,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues57,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues57,
    defaultWidth: "wide"
  })
};
var localize_default58 = localize57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/_lib/match/index.js
var matchOrdinalNumberPattern56 = /^(\d+)e?/i;
var parseOrdinalNumberPattern56 = /\d+/i;
var matchEraPatterns56 = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?Chr\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns56 = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns56 = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e kwartaal/i
};
var parseQuarterPatterns56 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns56 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i
};
var parseMonthPatterns56 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mei/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i]
};
var matchDayPatterns56 = {
  narrow: /^[zmdwv]/i,
  short: /^(zo|ma|di|wo|do|vr|za)/i,
  abbreviated: /^(zon|maa|din|woe|don|vri|zat)/i,
  wide: /^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i
};
var parseDayPatterns56 = {
  narrow: [/^z/i, /^m/i, /^d/i, /^w/i, /^d/i, /^v/i, /^z/i],
  any: [/^zo/i, /^ma/i, /^di/i, /^wo/i, /^do/i, /^vr/i, /^za/i]
};
var matchDayPeriodPatterns56 = {
  any: /^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i
};
var parseDayPeriodPatterns56 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^het middaguur/i,
    morning: /ochtend/i,
    afternoon: /middag/i,
    evening: /avond/i,
    night: /nacht/i
  }
};
var match56 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern56,
    parsePattern: parseOrdinalNumberPattern56,
    valueCallback: function valueCallback110(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns56,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns56,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns56,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns56,
    defaultParseWidth: "any",
    valueCallback: function valueCallback111(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns56,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns56,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns56,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns56,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns56,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns56,
    defaultParseWidth: "any"
  })
};
var match_default57 = match56;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nl-BE/index.js
var locale67 = {
  code: "nl-BE",
  formatDistance: formatDistance_default58,
  formatLong: formatLong_default65,
  formatRelative: formatRelative_default58,
  localize: localize_default58,
  match: match_default57,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var nl_BE_default = locale67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/_lib/formatDistance/index.js
var formatDistanceLocale57 = {
  lessThanXSeconds: {
    one: "mindre enn eitt sekund",
    other: "mindre enn {{count}} sekund"
  },
  xSeconds: {
    one: "eitt sekund",
    other: "{{count}} sekund"
  },
  halfAMinute: "eit halvt minutt",
  lessThanXMinutes: {
    one: "mindre enn eitt minutt",
    other: "mindre enn {{count}} minutt"
  },
  xMinutes: {
    one: "eitt minutt",
    other: "{{count}} minutt"
  },
  aboutXHours: {
    one: "omtrent ein time",
    other: "omtrent {{count}} timar"
  },
  xHours: {
    one: "ein time",
    other: "{{count}} timar"
  },
  xDays: {
    one: "ein dag",
    other: "{{count}} dagar"
  },
  aboutXWeeks: {
    one: "omtrent ei veke",
    other: "omtrent {{count}} veker"
  },
  xWeeks: {
    one: "ei veke",
    other: "{{count}} veker"
  },
  aboutXMonths: {
    one: "omtrent ein månad",
    other: "omtrent {{count}} månader"
  },
  xMonths: {
    one: "ein månad",
    other: "{{count}} månader"
  },
  aboutXYears: {
    one: "omtrent eitt år",
    other: "omtrent {{count}} år"
  },
  xYears: {
    one: "eitt år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over eitt år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "nesten eitt år",
    other: "nesten {{count}} år"
  }
};
var wordMapping = ["null", "ein", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni", "ti", "elleve", "tolv"];
var formatDistance115 = function formatDistance116(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale57[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    if (options && options.onlyNumeric) {
      result = tokenValue.other.replace("{{count}}", String(count));
    } else {
      result = tokenValue.other.replace("{{count}}", count < 13 ? wordMapping[count] : String(count));
    }
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " sidan";
    }
  }
  return result;
};
var formatDistance_default59 = formatDistance115;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/_lib/formatLong/index.js
var dateFormats66 = {
  full: "EEEE d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd.MM.y"
};
var timeFormats66 = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats66 = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong66 = {
  date: buildFormatLongFn({
    formats: dateFormats66,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats66,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats66,
    defaultWidth: "full"
  })
};
var formatLong_default66 = formatLong66;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/_lib/formatRelative/index.js
var formatRelativeLocale58 = {
  lastWeek: "'førre' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgon kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: "P"
};
var formatRelative115 = function formatRelative116(token, _date, _baseDate, _options) {
  return formatRelativeLocale58[token];
};
var formatRelative_default59 = formatRelative115;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/_lib/localize/index.js
var eraValues58 = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["før Kristus", "etter Kristus"]
};
var quarterValues58 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues58 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."],
  wide: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
};
var dayValues58 = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["su", "må", "ty", "on", "to", "fr", "lau"],
  abbreviated: ["sun", "mån", "tys", "ons", "tor", "fre", "laur"],
  wide: ["sundag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"]
};
var dayPeriodValues58 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natta"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på etterm.",
    evening: "på kvelden",
    night: "på natta"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morgonen",
    afternoon: "på ettermiddagen",
    evening: "på kvelden",
    night: "på natta"
  }
};
var ordinalNumber115 = function ordinalNumber116(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize58 = {
  ordinalNumber: ordinalNumber115,
  era: buildLocalizeFn({
    values: eraValues58,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues58,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback58(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues58,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues58,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues58,
    defaultWidth: "wide"
  })
};
var localize_default59 = localize58;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/_lib/match/index.js
var matchOrdinalNumberPattern57 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern57 = /\d+/i;
var matchEraPatterns57 = {
  narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
};
var parseEraPatterns57 = {
  any: [/^f/i, /^e/i]
};
var matchQuarterPatterns57 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns57 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns57 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
  wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
};
var parseMonthPatterns57 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns57 = {
  narrow: /^[smtofl]/i,
  short: /^(su|må|ty|on|to|fr|la)/i,
  abbreviated: /^(sun|mån|tys|ons|tor|fre|laur)/i,
  wide: /^(sundag|måndag|tysdag|onsdag|torsdag|fredag|laurdag)/i
};
var parseDayPatterns57 = {
  any: [/^s/i, /^m/i, /^ty/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns57 = {
  narrow: /^(midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta)|[ap])/i,
  any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta))/i
};
var parseDayPeriodPatterns57 = {
  any: {
    am: /^a(\.?\s?m\.?)?$/i,
    pm: /^p(\.?\s?m\.?)?$/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgon/i,
    afternoon: /ettermiddag/i,
    evening: /kveld/i,
    night: /natt/i
  }
};
var match57 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern57,
    parsePattern: parseOrdinalNumberPattern57,
    valueCallback: function valueCallback112(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns57,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns57,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns57,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns57,
    defaultParseWidth: "any",
    valueCallback: function valueCallback113(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns57,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns57,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns57,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns57,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns57,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns57,
    defaultParseWidth: "any"
  })
};
var match_default58 = match57;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/nn/index.js
var locale68 = {
  code: "nn",
  formatDistance: formatDistance_default59,
  formatLong: formatLong_default66,
  formatRelative: formatRelative_default59,
  localize: localize_default59,
  match: match_default58,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var nn_default = locale68;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/_lib/formatDistance/index.js
var formatDistanceLocale58 = {
  lessThanXSeconds: {
    one: "mens d’una segonda",
    other: "mens de {{count}} segondas"
  },
  xSeconds: {
    one: "1 segonda",
    other: "{{count}} segondas"
  },
  halfAMinute: "30 segondas",
  lessThanXMinutes: {
    one: "mens d’una minuta",
    other: "mens de {{count}} minutas"
  },
  xMinutes: {
    one: "1 minuta",
    other: "{{count}} minutas"
  },
  aboutXHours: {
    one: "environ 1 ora",
    other: "environ {{count}} oras"
  },
  xHours: {
    one: "1 ora",
    other: "{{count}} oras"
  },
  xDays: {
    one: "1 jorn",
    other: "{{count}} jorns"
  },
  aboutXWeeks: {
    one: "environ 1 setmana",
    other: "environ {{count}} setmanas"
  },
  xWeeks: {
    one: "1 setmana",
    other: "{{count}} setmanas"
  },
  aboutXMonths: {
    one: "environ 1 mes",
    other: "environ {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "mai d’un an",
    other: "mai de {{count}} ans"
  },
  almostXYears: {
    one: "gaireben un an",
    other: "gaireben {{count}} ans"
  }
};
var formatDistance117 = function formatDistance118(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale58[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "d’aquí " + result;
    } else {
      return "fa " + result;
    }
  }
  return result;
};
var formatDistance_default60 = formatDistance117;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/_lib/formatLong/index.js
var dateFormats67 = {
  full: "EEEE d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats67 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats67 = {
  full: "{{date}} 'a' {{time}}",
  long: "{{date}} 'a' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong67 = {
  date: buildFormatLongFn({
    formats: dateFormats67,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats67,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats67,
    defaultWidth: "full"
  })
};
var formatLong_default67 = formatLong67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/_lib/formatRelative/index.js
var formatRelativeLocale59 = {
  lastWeek: "eeee 'passat a' p",
  yesterday: "'ièr a' p",
  today: "'uèi a' p",
  tomorrow: "'deman a' p",
  nextWeek: "eeee 'a' p",
  other: "P"
};
var formatRelative117 = function formatRelative118(token, _date, _baseDate, _options) {
  return formatRelativeLocale59[token];
};
var formatRelative_default60 = formatRelative117;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/_lib/localize/index.js
var eraValues59 = {
  narrow: ["ab. J.C.", "apr. J.C."],
  abbreviated: ["ab. J.C.", "apr. J.C."],
  wide: ["abans Jèsus-Crist", "après Jèsus-Crist"]
};
var quarterValues59 = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1èr trim.", "2nd trim.", "3en trim.", "4en trim."],
  wide: ["1èr trimèstre", "2nd trimèstre", "3en trimèstre", "4en trimèstre"]
};
var monthValues59 = {
  narrow: ["GN", "FB", "MÇ", "AB", "MA", "JN", "JL", "AG", "ST", "OC", "NV", "DC"],
  abbreviated: ["gen.", "febr.", "març", "abr.", "mai", "junh", "jul.", "ag.", "set.", "oct.", "nov.", "dec."],
  wide: ["genièr", "febrièr", "març", "abril", "mai", "junh", "julhet", "agost", "setembre", "octòbre", "novembre", "decembre"]
};
var dayValues59 = {
  narrow: ["dg.", "dl.", "dm.", "dc.", "dj.", "dv.", "ds."],
  short: ["dg.", "dl.", "dm.", "dc.", "dj.", "dv.", "ds."],
  abbreviated: ["dg.", "dl.", "dm.", "dc.", "dj.", "dv.", "ds."],
  wide: ["dimenge", "diluns", "dimars", "dimècres", "dijòus", "divendres", "dissabte"]
};
var dayPeriodValues59 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "matin",
    afternoon: "aprèp-miègjorn",
    evening: "vèspre",
    night: "nuèch"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "matin",
    afternoon: "aprèp-miègjorn",
    evening: "vèspre",
    night: "nuèch"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "matin",
    afternoon: "aprèp-miègjorn",
    evening: "vèspre",
    night: "nuèch"
  }
};
var formattingDayPeriodValues45 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "del matin",
    afternoon: "de l’aprèp-miègjorn",
    evening: "del ser",
    night: "de la nuèch"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "del matin",
    afternoon: "de l’aprèp-miègjorn",
    evening: "del ser",
    night: "de la nuèch"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "mièjanuèch",
    noon: "miègjorn",
    morning: "del matin",
    afternoon: "de l’aprèp-miègjorn",
    evening: "del ser",
    night: "de la nuèch"
  }
};
var ordinalNumber117 = function ordinalNumber118(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  var ordinal;
  switch (number) {
    case 1:
      ordinal = "èr";
      break;
    case 2:
      ordinal = "nd";
      break;
    default:
      ordinal = "en";
  }
  if (unit === "year" || unit === "week" || unit === "hour" || unit === "minute" || unit === "second") {
    ordinal += "a";
  }
  return number + ordinal;
};
var localize59 = {
  ordinalNumber: ordinalNumber117,
  era: buildLocalizeFn({
    values: eraValues59,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues59,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback59(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues59,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues59,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues59,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues45,
    defaultFormattingWidth: "wide"
  })
};
var localize_default60 = localize59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/_lib/match/index.js
var matchOrdinalNumberPattern58 = /^(\d+)(èr|nd|en)?[a]?/i;
var parseOrdinalNumberPattern58 = /\d+/i;
var matchEraPatterns58 = {
  narrow: /^(ab\.J\.C|apr\.J\.C|apr\.J\.-C)/i,
  abbreviated: /^(ab\.J\.-C|ab\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(abans Jèsus-Crist|après Jèsus-Crist)/i
};
var parseEraPatterns58 = {
  any: [/^ab/i, /^ap/i]
};
var matchQuarterPatterns58 = {
  narrow: /^T[1234]/i,
  abbreviated: /^[1234](èr|nd|en)? trim\.?/i,
  wide: /^[1234](èr|nd|en)? trimèstre/i
};
var parseQuarterPatterns58 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns58 = {
  narrow: /^(GN|FB|MÇ|AB|MA|JN|JL|AG|ST|OC|NV|DC)/i,
  abbreviated: /^(gen|febr|març|abr|mai|junh|jul|ag|set|oct|nov|dec)\.?/i,
  wide: /^(genièr|febrièr|març|abril|mai|junh|julhet|agost|setembre|octòbre|novembre|decembre)/i
};
var parseMonthPatterns58 = {
  any: [/^g/i, /^f/i, /^ma[r?]|MÇ/i, /^ab/i, /^ma[i?]/i, /^ju[n?]|JN/i, /^ju[l?]|JL/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns58 = {
  narrow: /^d[glmcjvs]\.?/i,
  short: /^d[glmcjvs]\.?/i,
  abbreviated: /^d[glmcjvs]\.?/i,
  wide: /^(dimenge|diluns|dimars|dimècres|dijòus|divendres|dissabte)/i
};
var parseDayPatterns58 = {
  narrow: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  short: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  abbreviated: [/^dg/i, /^dl/i, /^dm/i, /^dc/i, /^dj/i, /^dv/i, /^ds/i],
  any: [/^dg|dime/i, /^dl|dil/i, /^dm|dima/i, /^dc|dimè/i, /^dj|dij/i, /^dv|div/i, /^ds|dis/i]
};
var matchDayPeriodPatterns58 = {
  any: /(^(a\.?m|p\.?m))|(ante meridiem|post meridiem)|((del |de la |de l’)(matin|aprèp-miègjorn|vèspre|ser|nuèch))/i
};
var parseDayPeriodPatterns58 = {
  any: {
    am: /(^a)|ante meridiem/i,
    pm: /(^p)|post meridiem/i,
    midnight: /^mièj/i,
    noon: /^mièg/i,
    morning: /matin/i,
    afternoon: /aprèp-miègjorn/i,
    evening: /vèspre|ser/i,
    night: /nuèch/i
  }
};
var match58 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern58,
    parsePattern: parseOrdinalNumberPattern58,
    valueCallback: function valueCallback114(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns58,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns58,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns58,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns58,
    defaultParseWidth: "any",
    valueCallback: function valueCallback115(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns58,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns58,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns58,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns58,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns58,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns58,
    defaultParseWidth: "any"
  })
};
var match_default59 = match58;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/oc/index.js
var locale69 = {
  code: "oc",
  formatDistance: formatDistance_default60,
  formatLong: formatLong_default67,
  formatRelative: formatRelative_default60,
  localize: localize_default60,
  match: match_default59,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var oc_default = locale69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/_lib/formatDistance/index.js
var formatDistanceLocale59 = {
  lessThanXSeconds: {
    one: {
      regular: "mniej niż sekunda",
      past: "mniej niż sekundę",
      future: "mniej niż sekundę"
    },
    twoFour: "mniej niż {{count}} sekundy",
    other: "mniej niż {{count}} sekund"
  },
  xSeconds: {
    one: {
      regular: "sekunda",
      past: "sekundę",
      future: "sekundę"
    },
    twoFour: "{{count}} sekundy",
    other: "{{count}} sekund"
  },
  halfAMinute: {
    one: "pół minuty",
    twoFour: "pół minuty",
    other: "pół minuty"
  },
  lessThanXMinutes: {
    one: {
      regular: "mniej niż minuta",
      past: "mniej niż minutę",
      future: "mniej niż minutę"
    },
    twoFour: "mniej niż {{count}} minuty",
    other: "mniej niż {{count}} minut"
  },
  xMinutes: {
    one: {
      regular: "minuta",
      past: "minutę",
      future: "minutę"
    },
    twoFour: "{{count}} minuty",
    other: "{{count}} minut"
  },
  aboutXHours: {
    one: {
      regular: "około godziny",
      past: "około godziny",
      future: "około godzinę"
    },
    twoFour: "około {{count}} godziny",
    other: "około {{count}} godzin"
  },
  xHours: {
    one: {
      regular: "godzina",
      past: "godzinę",
      future: "godzinę"
    },
    twoFour: "{{count}} godziny",
    other: "{{count}} godzin"
  },
  xDays: {
    one: {
      regular: "dzień",
      past: "dzień",
      future: "1 dzień"
    },
    twoFour: "{{count}} dni",
    other: "{{count}} dni"
  },
  aboutXWeeks: {
    one: "około tygodnia",
    twoFour: "około {{count}} tygodni",
    other: "około {{count}} tygodni"
  },
  xWeeks: {
    one: "tydzień",
    twoFour: "{{count}} tygodnie",
    other: "{{count}} tygodni"
  },
  aboutXMonths: {
    one: "około miesiąc",
    twoFour: "około {{count}} miesiące",
    other: "około {{count}} miesięcy"
  },
  xMonths: {
    one: "miesiąc",
    twoFour: "{{count}} miesiące",
    other: "{{count}} miesięcy"
  },
  aboutXYears: {
    one: "około rok",
    twoFour: "około {{count}} lata",
    other: "około {{count}} lat"
  },
  xYears: {
    one: "rok",
    twoFour: "{{count}} lata",
    other: "{{count}} lat"
  },
  overXYears: {
    one: "ponad rok",
    twoFour: "ponad {{count}} lata",
    other: "ponad {{count}} lat"
  },
  almostXYears: {
    one: "prawie rok",
    twoFour: "prawie {{count}} lata",
    other: "prawie {{count}} lat"
  }
};
function declensionGroup(scheme, count) {
  if (count === 1) {
    return scheme.one;
  }
  var rem100 = count % 100;
  if (rem100 <= 20 && rem100 > 10) {
    return scheme.other;
  }
  var rem10 = rem100 % 10;
  if (rem10 >= 2 && rem10 <= 4) {
    return scheme.twoFour;
  }
  return scheme.other;
}
function declension4(scheme, count, time) {
  var group = declensionGroup(scheme, count);
  var finalText = typeof group === "string" ? group : group[time];
  return finalText.replace("{{count}}", String(count));
}
var formatDistance119 = function formatDistance120(token, count, options) {
  var scheme = formatDistanceLocale59[token];
  if (!(options !== null && options !== void 0 && options.addSuffix)) {
    return declension4(scheme, count, "regular");
  }
  if (options.comparison && options.comparison > 0) {
    return "za " + declension4(scheme, count, "future");
  } else {
    return declension4(scheme, count, "past") + " temu";
  }
};
var formatDistance_default61 = formatDistance119;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/_lib/formatLong/index.js
var dateFormats68 = {
  full: "EEEE, do MMMM y",
  long: "do MMMM y",
  medium: "do MMM y",
  short: "dd.MM.y"
};
var timeFormats68 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats68 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong68 = {
  date: buildFormatLongFn({
    formats: dateFormats68,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats68,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats68,
    defaultWidth: "full"
  })
};
var formatLong_default68 = formatLong68;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/_lib/formatRelative/index.js
var adjectivesLastWeek = {
  masculine: "ostatni",
  feminine: "ostatnia"
};
var adjectivesThisWeek = {
  masculine: "ten",
  feminine: "ta"
};
var adjectivesNextWeek = {
  masculine: "następny",
  feminine: "następna"
};
var dayGrammaticalGender = {
  0: "feminine",
  1: "masculine",
  2: "masculine",
  3: "feminine",
  4: "masculine",
  5: "masculine",
  6: "feminine"
};
function dayAndTimeWithAdjective(token, date, baseDate, options) {
  var adjectives;
  if (isSameUTCWeek(date, baseDate, options)) {
    adjectives = adjectivesThisWeek;
  } else if (token === "lastWeek") {
    adjectives = adjectivesLastWeek;
  } else if (token === "nextWeek") {
    adjectives = adjectivesNextWeek;
  } else {
    throw new Error("Cannot determine adjectives for token ".concat(token));
  }
  var day = date.getUTCDay();
  var grammaticalGender = dayGrammaticalGender[day];
  var adjective = adjectives[grammaticalGender];
  return "'".concat(adjective, "' eeee 'o' p");
}
var formatRelativeLocale60 = {
  lastWeek: dayAndTimeWithAdjective,
  yesterday: "'wczoraj o' p",
  today: "'dzisiaj o' p",
  tomorrow: "'jutro o' p",
  nextWeek: dayAndTimeWithAdjective,
  other: "P"
};
var formatRelative119 = function formatRelative120(token, date, baseDate, options) {
  var format = formatRelativeLocale60[token];
  if (typeof format === "function") {
    return format(token, date, baseDate, options);
  }
  return format;
};
var formatRelative_default61 = formatRelative119;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/_lib/localize/index.js
var eraValues60 = {
  narrow: ["p.n.e.", "n.e."],
  abbreviated: ["p.n.e.", "n.e."],
  wide: ["przed naszą erą", "naszej ery"]
};
var quarterValues60 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["I kw.", "II kw.", "III kw.", "IV kw."],
  wide: ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"]
};
var monthValues60 = {
  narrow: ["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"],
  abbreviated: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
  wide: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
};
var monthFormattingValues = {
  narrow: ["s", "l", "m", "k", "m", "c", "l", "s", "w", "p", "l", "g"],
  abbreviated: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
  wide: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]
};
var dayValues60 = {
  narrow: ["N", "P", "W", "Ś", "C", "P", "S"],
  short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
  abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  wide: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
};
var dayFormattingValues = {
  narrow: ["n", "p", "w", "ś", "c", "p", "s"],
  short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
  abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  wide: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
};
var dayPeriodValues60 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "półn.",
    noon: "poł",
    morning: "rano",
    afternoon: "popoł.",
    evening: "wiecz.",
    night: "noc"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "północ",
    noon: "południe",
    morning: "rano",
    afternoon: "popołudnie",
    evening: "wieczór",
    night: "noc"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "północ",
    noon: "południe",
    morning: "rano",
    afternoon: "popołudnie",
    evening: "wieczór",
    night: "noc"
  }
};
var dayPeriodFormattingValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "o półn.",
    noon: "w poł.",
    morning: "rano",
    afternoon: "po poł.",
    evening: "wiecz.",
    night: "w nocy"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "o północy",
    noon: "w południe",
    morning: "rano",
    afternoon: "po południu",
    evening: "wieczorem",
    night: "w nocy"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "o północy",
    noon: "w południe",
    morning: "rano",
    afternoon: "po południu",
    evening: "wieczorem",
    night: "w nocy"
  }
};
var ordinalNumber119 = function ordinalNumber120(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize60 = {
  ordinalNumber: ordinalNumber119,
  era: buildLocalizeFn({
    values: eraValues60,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues60,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback60(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues60,
    defaultWidth: "wide",
    formattingValues: monthFormattingValues,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues60,
    defaultWidth: "wide",
    formattingValues: dayFormattingValues,
    defaultFormattingWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues60,
    defaultWidth: "wide",
    formattingValues: dayPeriodFormattingValues,
    defaultFormattingWidth: "wide"
  })
};
var localize_default61 = localize60;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/_lib/match/index.js
var matchOrdinalNumberPattern59 = /^(\d+)?/i;
var parseOrdinalNumberPattern59 = /\d+/i;
var matchEraPatterns59 = {
  narrow: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  abbreviated: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  wide: /^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i
};
var parseEraPatterns59 = {
  any: [/^p/i, /^n/i]
};
var matchQuarterPatterns59 = {
  narrow: /^[1234]/i,
  abbreviated: /^(I|II|III|IV)\s*kw\.?/i,
  wide: /^(I|II|III|IV)\s*kwarta(ł|l)/i
};
var parseQuarterPatterns59 = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/^I kw/i, /^II kw/i, /^III kw/i, /^IV kw/i]
};
var matchMonthPatterns59 = {
  narrow: /^[slmkcwpg]/i,
  abbreviated: /^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,
  wide: /^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i
};
var parseMonthPatterns59 = {
  narrow: [/^s/i, /^l/i, /^m/i, /^k/i, /^m/i, /^c/i, /^l/i, /^s/i, /^w/i, /^p/i, /^l/i, /^g/i],
  any: [/^st/i, /^lu/i, /^mar/i, /^k/i, /^maj/i, /^c/i, /^lip/i, /^si/i, /^w/i, /^p/i, /^lis/i, /^g/i]
};
var matchDayPatterns59 = {
  narrow: /^[npwścs]/i,
  short: /^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,
  abbreviated: /^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,
  wide: /^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i
};
var parseDayPatterns59 = {
  narrow: [/^n/i, /^p/i, /^w/i, /^ś/i, /^c/i, /^p/i, /^s/i],
  abbreviated: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pt/i, /^so/i],
  any: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pi/i, /^so/i]
};
var matchDayPeriodPatterns59 = {
  narrow: /^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,
  any: /^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i
};
var parseDayPeriodPatterns59 = {
  narrow: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
  },
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
  }
};
var match59 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern59,
    parsePattern: parseOrdinalNumberPattern59,
    valueCallback: function valueCallback116(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns59,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns59,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns59,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns59,
    defaultParseWidth: "any",
    valueCallback: function valueCallback117(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns59,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns59,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns59,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns59,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns59,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns59,
    defaultParseWidth: "any"
  })
};
var match_default60 = match59;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pl/index.js
var locale70 = {
  code: "pl",
  formatDistance: formatDistance_default61,
  formatLong: formatLong_default68,
  formatRelative: formatRelative_default61,
  localize: localize_default61,
  match: match_default60,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var pl_default = locale70;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/_lib/formatDistance/index.js
var formatDistanceLocale60 = {
  lessThanXSeconds: {
    one: "menos de um segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "meio minuto",
  lessThanXMinutes: {
    one: "menos de um minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "aproximadamente 1 hora",
    other: "aproximadamente {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dias"
  },
  aboutXWeeks: {
    one: "aproximadamente 1 semana",
    other: "aproximadamente {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "aproximadamente 1 mês",
    other: "aproximadamente {{count}} meses"
  },
  xMonths: {
    one: "1 mês",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "aproximadamente 1 ano",
    other: "aproximadamente {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "mais de 1 ano",
    other: "mais de {{count}} anos"
  },
  almostXYears: {
    one: "quase 1 ano",
    other: "quase {{count}} anos"
  }
};
var formatDistance121 = function formatDistance122(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale60[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "daqui a " + result;
    } else {
      return "há " + result;
    }
  }
  return result;
};
var formatDistance_default62 = formatDistance121;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/_lib/formatLong/index.js
var dateFormats69 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d 'de' MMM 'de' y",
  short: "dd/MM/y"
};
var timeFormats69 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats69 = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong69 = {
  date: buildFormatLongFn({
    formats: dateFormats69,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats69,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats69,
    defaultWidth: "full"
  })
};
var formatLong_default69 = formatLong69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/_lib/formatRelative/index.js
var formatRelativeLocale61 = {
  lastWeek: function lastWeek12(date) {
    var weekday = date.getUTCDay();
    var last = weekday === 0 || weekday === 6 ? "último" : "última";
    return "'" + last + "' eeee 'às' p";
  },
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: "P"
};
var formatRelative121 = function formatRelative122(token, date, _baseDate, _options) {
  var format = formatRelativeLocale61[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default62 = formatRelative121;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/_lib/localize/index.js
var eraValues61 = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["antes de Cristo", "depois de Cristo"]
};
var quarterValues61 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues61 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  wide: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
};
var dayValues61 = {
  narrow: ["d", "s", "t", "q", "q", "s", "s"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  abbreviated: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  wide: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]
};
var dayPeriodValues61 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  }
};
var formattingDayPeriodValues46 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  }
};
var ordinalNumber121 = function ordinalNumber122(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "º";
};
var localize61 = {
  ordinalNumber: ordinalNumber121,
  era: buildLocalizeFn({
    values: eraValues61,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues61,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback61(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues61,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues61,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues61,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues46,
    defaultFormattingWidth: "wide"
  })
};
var localize_default62 = localize61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/_lib/match/index.js
var matchOrdinalNumberPattern60 = /^(\d+)(º|ª)?/i;
var parseOrdinalNumberPattern60 = /\d+/i;
var matchEraPatterns60 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era comum|depois de cristo|era comum)/i
};
var parseEraPatterns60 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era comum)/i, /^(depois de cristo|era comum)/i]
};
var matchQuarterPatterns60 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º|ª)? trimestre/i
};
var parseQuarterPatterns60 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns60 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
var parseMonthPatterns60 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ab/i, /^mai/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns60 = {
  narrow: /^[dstq]/i,
  short: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  wide: /^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i
};
var parseDayPatterns60 = {
  narrow: [/^d/i, /^s/i, /^t/i, /^q/i, /^q/i, /^s/i, /^s/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[áa]/i]
};
var matchDayPeriodPatterns60 = {
  narrow: /^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,
  any: /^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i
};
var parseDayPeriodPatterns60 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^meia/i,
    noon: /^meio/i,
    morning: /manh[ãa]/i,
    afternoon: /tarde/i,
    evening: /noite/i,
    night: /madrugada/i
  }
};
var match60 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern60,
    parsePattern: parseOrdinalNumberPattern60,
    valueCallback: function valueCallback118(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns60,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns60,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns60,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns60,
    defaultParseWidth: "any",
    valueCallback: function valueCallback119(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns60,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns60,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns60,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns60,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns60,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns60,
    defaultParseWidth: "any"
  })
};
var match_default61 = match60;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt/index.js
var locale71 = {
  code: "pt",
  formatDistance: formatDistance_default62,
  formatLong: formatLong_default69,
  formatRelative: formatRelative_default62,
  localize: localize_default62,
  match: match_default61,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var pt_default = locale71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/_lib/formatDistance/index.js
var formatDistanceLocale61 = {
  lessThanXSeconds: {
    one: "menos de um segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "meio minuto",
  lessThanXMinutes: {
    one: "menos de um minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "cerca de 1 hora",
    other: "cerca de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dias"
  },
  aboutXWeeks: {
    one: "cerca de 1 semana",
    other: "cerca de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "cerca de 1 mês",
    other: "cerca de {{count}} meses"
  },
  xMonths: {
    one: "1 mês",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "cerca de 1 ano",
    other: "cerca de {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "mais de 1 ano",
    other: "mais de {{count}} anos"
  },
  almostXYears: {
    one: "quase 1 ano",
    other: "quase {{count}} anos"
  }
};
var formatDistance123 = function formatDistance124(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale61[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "em " + result;
    } else {
      return "há " + result;
    }
  }
  return result;
};
var formatDistance_default63 = formatDistance123;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/_lib/formatLong/index.js
var dateFormats70 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats70 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats70 = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong70 = {
  date: buildFormatLongFn({
    formats: dateFormats70,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats70,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats70,
    defaultWidth: "full"
  })
};
var formatLong_default70 = formatLong70;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/_lib/formatRelative/index.js
var formatRelativeLocale62 = {
  lastWeek: function lastWeek13(date) {
    var weekday = date.getUTCDay();
    var last = weekday === 0 || weekday === 6 ? "último" : "última";
    return "'" + last + "' eeee 'às' p";
  },
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: "P"
};
var formatRelative123 = function formatRelative124(token, date, _baseDate, _options) {
  var format = formatRelativeLocale62[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default63 = formatRelative123;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/_lib/localize/index.js
var eraValues62 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "depois de cristo"]
};
var quarterValues62 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues62 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  wide: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
};
var dayValues62 = {
  narrow: ["D", "S", "T", "Q", "Q", "S", "S"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  abbreviated: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
  wide: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]
};
var dayPeriodValues62 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "tarde",
    night: "noite"
  }
};
var formattingDayPeriodValues47 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da tarde",
    night: "da noite"
  }
};
var ordinalNumber123 = function ordinalNumber124(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  if ((options === null || options === void 0 ? void 0 : options.unit) === "week") {
    return number + "ª";
  }
  return number + "º";
};
var localize62 = {
  ordinalNumber: ordinalNumber123,
  era: buildLocalizeFn({
    values: eraValues62,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues62,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback62(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues62,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues62,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues62,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues47,
    defaultFormattingWidth: "wide"
  })
};
var localize_default63 = localize62;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/_lib/match/index.js
var matchOrdinalNumberPattern61 = /^(\d+)[ºªo]?/i;
var parseOrdinalNumberPattern61 = /\d+/i;
var matchEraPatterns61 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
  wide: /^(antes de cristo|depois de cristo)/i
};
var parseEraPatterns61 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^antes de cristo/i, /^depois de cristo/i]
};
var matchQuarterPatterns61 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns61 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns61 = {
  narrow: /^[jfmajsond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
var parseMonthPatterns61 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^fev/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dez/i]
};
var matchDayPatterns61 = {
  narrow: /^(dom|[23456]ª?|s[aá]b)/i,
  short: /^(dom|[23456]ª?|s[aá]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
  wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
};
var parseDayPatterns61 = {
  short: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  narrow: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[aá]b/i]
};
var matchDayPeriodPatterns61 = {
  narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
};
var parseDayPeriodPatterns61 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn|^meia[-\s]noite/i,
    noon: /^md|^meio[-\s]dia/i,
    morning: /manhã/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noite/i
  }
};
var match61 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern61,
    parsePattern: parseOrdinalNumberPattern61,
    valueCallback: function valueCallback120(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns61,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns61,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns61,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns61,
    defaultParseWidth: "any",
    valueCallback: function valueCallback121(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns61,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns61,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns61,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns61,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns61,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns61,
    defaultParseWidth: "any"
  })
};
var match_default62 = match61;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/pt-BR/index.js
var locale72 = {
  code: "pt-BR",
  formatDistance: formatDistance_default63,
  formatLong: formatLong_default70,
  formatRelative: formatRelative_default63,
  localize: localize_default63,
  match: match_default62,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var pt_BR_default = locale72;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/_lib/formatDistance/index.js
var formatDistanceLocale62 = {
  lessThanXSeconds: {
    one: "mai puțin de o secundă",
    other: "mai puțin de {{count}} secunde"
  },
  xSeconds: {
    one: "1 secundă",
    other: "{{count}} secunde"
  },
  halfAMinute: "jumătate de minut",
  lessThanXMinutes: {
    one: "mai puțin de un minut",
    other: "mai puțin de {{count}} minute"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minute"
  },
  aboutXHours: {
    one: "circa 1 oră",
    other: "circa {{count}} ore"
  },
  xHours: {
    one: "1 oră",
    other: "{{count}} ore"
  },
  xDays: {
    one: "1 zi",
    other: "{{count}} zile"
  },
  aboutXWeeks: {
    one: "circa o săptămână",
    other: "circa {{count}} săptămâni"
  },
  xWeeks: {
    one: "1 săptămână",
    other: "{{count}} săptămâni"
  },
  aboutXMonths: {
    one: "circa 1 lună",
    other: "circa {{count}} luni"
  },
  xMonths: {
    one: "1 lună",
    other: "{{count}} luni"
  },
  aboutXYears: {
    one: "circa 1 an",
    other: "circa {{count}} ani"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ani"
  },
  overXYears: {
    one: "peste 1 an",
    other: "peste {{count}} ani"
  },
  almostXYears: {
    one: "aproape 1 an",
    other: "aproape {{count}} ani"
  }
};
var formatDistance125 = function formatDistance126(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale62[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "în " + result;
    } else {
      return result + " în urmă";
    }
  }
  return result;
};
var formatDistance_default64 = formatDistance125;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/_lib/formatLong/index.js
var dateFormats71 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd.MM.yyyy"
};
var timeFormats71 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats71 = {
  full: "{{date}} 'la' {{time}}",
  long: "{{date}} 'la' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong71 = {
  date: buildFormatLongFn({
    formats: dateFormats71,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats71,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats71,
    defaultWidth: "full"
  })
};
var formatLong_default71 = formatLong71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/_lib/formatRelative/index.js
var formatRelativeLocale63 = {
  lastWeek: "eeee 'trecută la' p",
  yesterday: "'ieri la' p",
  today: "'astăzi la' p",
  tomorrow: "'mâine la' p",
  nextWeek: "eeee 'viitoare la' p",
  other: "P"
};
var formatRelative125 = function formatRelative126(token, _date, _baseDate, _options) {
  return formatRelativeLocale63[token];
};
var formatRelative_default64 = formatRelative125;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/_lib/localize/index.js
var eraValues63 = {
  narrow: ["Î", "D"],
  abbreviated: ["Î.d.C.", "D.C."],
  wide: ["Înainte de Cristos", "După Cristos"]
};
var quarterValues63 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["primul trimestru", "al doilea trimestru", "al treilea trimestru", "al patrulea trimestru"]
};
var monthValues63 = {
  narrow: ["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"],
  abbreviated: ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"],
  wide: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"]
};
var dayValues63 = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["du", "lu", "ma", "mi", "jo", "vi", "sâ"],
  abbreviated: ["dum", "lun", "mar", "mie", "joi", "vin", "sâm"],
  wide: ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"]
};
var dayPeriodValues63 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "ami",
    morning: "dim",
    afternoon: "da",
    evening: "s",
    night: "n"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "miezul nopții",
    noon: "amiază",
    morning: "dimineață",
    afternoon: "după-amiază",
    evening: "seară",
    night: "noapte"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "miezul nopții",
    noon: "amiază",
    morning: "dimineață",
    afternoon: "după-amiază",
    evening: "seară",
    night: "noapte"
  }
};
var formattingDayPeriodValues48 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "amiază",
    morning: "dimineață",
    afternoon: "după-amiază",
    evening: "seară",
    night: "noapte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "miezul nopții",
    noon: "amiază",
    morning: "dimineață",
    afternoon: "după-amiază",
    evening: "seară",
    night: "noapte"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "miezul nopții",
    noon: "amiază",
    morning: "dimineață",
    afternoon: "după-amiază",
    evening: "seară",
    night: "noapte"
  }
};
var ordinalNumber125 = function ordinalNumber126(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize63 = {
  ordinalNumber: ordinalNumber125,
  era: buildLocalizeFn({
    values: eraValues63,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues63,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback63(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues63,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues63,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues63,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues48,
    defaultFormattingWidth: "wide"
  })
};
var localize_default64 = localize63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/_lib/match/index.js
var matchOrdinalNumberPattern62 = /^(\d+)?/i;
var parseOrdinalNumberPattern62 = /\d+/i;
var matchEraPatterns62 = {
  narrow: /^(Î|D)/i,
  abbreviated: /^(Î\.?\s?d\.?\s?C\.?|Î\.?\s?e\.?\s?n\.?|D\.?\s?C\.?|e\.?\s?n\.?)/i,
  wide: /^(Înainte de Cristos|Înaintea erei noastre|După Cristos|Era noastră)/i
};
var parseEraPatterns62 = {
  any: [/^ÎC/i, /^DC/i],
  wide: [/^(Înainte de Cristos|Înaintea erei noastre)/i, /^(După Cristos|Era noastră)/i]
};
var matchQuarterPatterns62 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^trimestrul [1234]/i
};
var parseQuarterPatterns62 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns62 = {
  narrow: /^[ifmaasond]/i,
  abbreviated: /^(ian|feb|mar|apr|mai|iun|iul|aug|sep|oct|noi|dec)/i,
  wide: /^(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)/i
};
var parseMonthPatterns62 = {
  narrow: [/^i/i, /^f/i, /^m/i, /^a/i, /^m/i, /^i/i, /^i/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ia/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^iun/i, /^iul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns62 = {
  narrow: /^[dlmjvs]/i,
  short: /^(d|l|ma|mi|j|v|s)/i,
  abbreviated: /^(dum|lun|mar|mie|jo|vi|sâ)/i,
  wide: /^(duminica|luni|marţi|miercuri|joi|vineri|sâmbătă)/i
};
var parseDayPatterns62 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^mi/i, /^j/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns62 = {
  narrow: /^(a|p|mn|a|(dimineaţa|după-amiaza|seara|noaptea))/i,
  any: /^([ap]\.?\s?m\.?|miezul nopții|amiaza|(dimineaţa|după-amiaza|seara|noaptea))/i
};
var parseDayPeriodPatterns62 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /amiaza/i,
    morning: /dimineaţa/i,
    afternoon: /după-amiaza/i,
    evening: /seara/i,
    night: /noaptea/i
  }
};
var match62 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern62,
    parsePattern: parseOrdinalNumberPattern62,
    valueCallback: function valueCallback122(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns62,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns62,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns62,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns62,
    defaultParseWidth: "any",
    valueCallback: function valueCallback123(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns62,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns62,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns62,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns62,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns62,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns62,
    defaultParseWidth: "any"
  })
};
var match_default63 = match62;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ro/index.js
var locale73 = {
  code: "ro",
  formatDistance: formatDistance_default64,
  formatLong: formatLong_default71,
  formatRelative: formatRelative_default64,
  localize: localize_default64,
  match: match_default63,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ro_default = locale73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/_lib/formatDistance/index.js
function declension5(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  var rem10 = count % 10;
  var rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn4(scheme) {
  return function(count, options) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension5(scheme.future, count);
        } else {
          return "через " + declension5(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension5(scheme.past, count);
        } else {
          return declension5(scheme.regular, count) + " назад";
        }
      }
    } else {
      return declension5(scheme.regular, count);
    }
  };
}
var formatDistanceLocale63 = {
  lessThanXSeconds: buildLocalizeTokenFn4({
    regular: {
      one: "меньше секунды",
      singularNominative: "меньше {{count}} секунды",
      singularGenitive: "меньше {{count}} секунд",
      pluralGenitive: "меньше {{count}} секунд"
    },
    future: {
      one: "меньше, чем через секунду",
      singularNominative: "меньше, чем через {{count}} секунду",
      singularGenitive: "меньше, чем через {{count}} секунды",
      pluralGenitive: "меньше, чем через {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду назад",
      singularGenitive: "{{count}} секунды назад",
      pluralGenitive: "{{count}} секунд назад"
    },
    future: {
      singularNominative: "через {{count}} секунду",
      singularGenitive: "через {{count}} секунды",
      pluralGenitive: "через {{count}} секунд"
    }
  }),
  halfAMinute: function halfAMinute7(_count, options) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "через полминуты";
      } else {
        return "полминуты назад";
      }
    }
    return "полминуты";
  },
  lessThanXMinutes: buildLocalizeTokenFn4({
    regular: {
      one: "меньше минуты",
      singularNominative: "меньше {{count}} минуты",
      singularGenitive: "меньше {{count}} минут",
      pluralGenitive: "меньше {{count}} минут"
    },
    future: {
      one: "меньше, чем через минуту",
      singularNominative: "меньше, чем через {{count}} минуту",
      singularGenitive: "меньше, чем через {{count}} минуты",
      pluralGenitive: "меньше, чем через {{count}} минут"
    }
  }),
  xMinutes: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} минута",
      singularGenitive: "{{count}} минуты",
      pluralGenitive: "{{count}} минут"
    },
    past: {
      singularNominative: "{{count}} минуту назад",
      singularGenitive: "{{count}} минуты назад",
      pluralGenitive: "{{count}} минут назад"
    },
    future: {
      singularNominative: "через {{count}} минуту",
      singularGenitive: "через {{count}} минуты",
      pluralGenitive: "через {{count}} минут"
    }
  }),
  aboutXHours: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "около {{count}} часа",
      singularGenitive: "около {{count}} часов",
      pluralGenitive: "около {{count}} часов"
    },
    future: {
      singularNominative: "приблизительно через {{count}} час",
      singularGenitive: "приблизительно через {{count}} часа",
      pluralGenitive: "приблизительно через {{count}} часов"
    }
  }),
  xHours: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} час",
      singularGenitive: "{{count}} часа",
      pluralGenitive: "{{count}} часов"
    }
  }),
  xDays: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} дня",
      pluralGenitive: "{{count}} дней"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "около {{count}} недели",
      singularGenitive: "около {{count}} недель",
      pluralGenitive: "около {{count}} недель"
    },
    future: {
      singularNominative: "приблизительно через {{count}} неделю",
      singularGenitive: "приблизительно через {{count}} недели",
      pluralGenitive: "приблизительно через {{count}} недель"
    }
  }),
  xWeeks: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} неделя",
      singularGenitive: "{{count}} недели",
      pluralGenitive: "{{count}} недель"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "около {{count}} месяца",
      singularGenitive: "около {{count}} месяцев",
      pluralGenitive: "около {{count}} месяцев"
    },
    future: {
      singularNominative: "приблизительно через {{count}} месяц",
      singularGenitive: "приблизительно через {{count}} месяца",
      pluralGenitive: "приблизительно через {{count}} месяцев"
    }
  }),
  xMonths: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяца",
      pluralGenitive: "{{count}} месяцев"
    }
  }),
  aboutXYears: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "около {{count}} года",
      singularGenitive: "около {{count}} лет",
      pluralGenitive: "около {{count}} лет"
    },
    future: {
      singularNominative: "приблизительно через {{count}} год",
      singularGenitive: "приблизительно через {{count}} года",
      pluralGenitive: "приблизительно через {{count}} лет"
    }
  }),
  xYears: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} года",
      pluralGenitive: "{{count}} лет"
    }
  }),
  overXYears: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "больше {{count}} года",
      singularGenitive: "больше {{count}} лет",
      pluralGenitive: "больше {{count}} лет"
    },
    future: {
      singularNominative: "больше, чем через {{count}} год",
      singularGenitive: "больше, чем через {{count}} года",
      pluralGenitive: "больше, чем через {{count}} лет"
    }
  }),
  almostXYears: buildLocalizeTokenFn4({
    regular: {
      singularNominative: "почти {{count}} год",
      singularGenitive: "почти {{count}} года",
      pluralGenitive: "почти {{count}} лет"
    },
    future: {
      singularNominative: "почти через {{count}} год",
      singularGenitive: "почти через {{count}} года",
      pluralGenitive: "почти через {{count}} лет"
    }
  })
};
var formatDistance127 = function formatDistance128(token, count, options) {
  return formatDistanceLocale63[token](count, options);
};
var formatDistance_default65 = formatDistance127;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/_lib/formatLong/index.js
var dateFormats72 = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y"
};
var timeFormats72 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats72 = {
  any: "{{date}}, {{time}}"
};
var formatLong72 = {
  date: buildFormatLongFn({
    formats: dateFormats72,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats72,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats72,
    defaultWidth: "any"
  })
};
var formatLong_default72 = formatLong72;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/_lib/formatRelative/index.js
var accusativeWeekdays6 = ["воскресенье", "понедельник", "вторник", "среду", "четверг", "пятницу", "субботу"];
function _lastWeek4(day) {
  var weekday = accusativeWeekdays6[day];
  switch (day) {
    case 0:
      return "'в прошлое " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в прошлый " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в прошлую " + weekday + " в' p";
  }
}
function thisWeek7(day) {
  var weekday = accusativeWeekdays6[day];
  if (day === 2) {
    return "'во " + weekday + " в' p";
  } else {
    return "'в " + weekday + " в' p";
  }
}
function _nextWeek4(day) {
  var weekday = accusativeWeekdays6[day];
  switch (day) {
    case 0:
      return "'в следующее " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в следующий " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в следующую " + weekday + " в' p";
  }
}
var formatRelativeLocale64 = {
  lastWeek: function lastWeek14(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek7(day);
    } else {
      return _lastWeek4(day);
    }
  },
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: "'завтра в' p",
  nextWeek: function nextWeek11(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek7(day);
    } else {
      return _nextWeek4(day);
    }
  },
  other: "P"
};
var formatRelative127 = function formatRelative128(token, date, baseDate, options) {
  var format = formatRelativeLocale64[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default65 = formatRelative127;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/_lib/localize/index.js
var eraValues64 = {
  narrow: ["до н.э.", "н.э."],
  abbreviated: ["до н. э.", "н. э."],
  wide: ["до нашей эры", "нашей эры"]
};
var quarterValues64 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"]
};
var monthValues64 = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: ["янв.", "фев.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."],
  wide: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
};
var formattingMonthValues14 = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: ["янв.", "фев.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."],
  wide: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
};
var dayValues64 = {
  narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
  short: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["вск", "пнд", "втр", "срд", "чтв", "птн", "суб"],
  wide: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
};
var dayPeriodValues64 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утро",
    afternoon: "день",
    evening: "вечер",
    night: "ночь"
  }
};
var formattingDayPeriodValues49 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утра",
    afternoon: "дня",
    evening: "вечера",
    night: "ночи"
  }
};
var ordinalNumber127 = function ordinalNumber128(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  var suffix;
  if (unit === "date") {
    suffix = "-е";
  } else if (unit === "week" || unit === "minute" || unit === "second") {
    suffix = "-я";
  } else {
    suffix = "-й";
  }
  return number + suffix;
};
var localize64 = {
  ordinalNumber: ordinalNumber127,
  era: buildLocalizeFn({
    values: eraValues64,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues64,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback64(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues64,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues14,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues64,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues64,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues49,
    defaultFormattingWidth: "wide"
  })
};
var localize_default65 = localize64;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/_lib/match/index.js
var matchOrdinalNumberPattern63 = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i;
var parseOrdinalNumberPattern63 = /\d+/i;
var matchEraPatterns63 = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
};
var parseEraPatterns63 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns63 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
};
var parseQuarterPatterns63 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns63 = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
};
var parseMonthPatterns63 = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^я/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns63 = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
};
var parseDayPatterns63 = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns63 = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
};
var parseDayPeriodPatterns63 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^полн/i,
    noon: /^полд/i,
    morning: /^у/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match63 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern63,
    parsePattern: parseOrdinalNumberPattern63,
    valueCallback: function valueCallback124(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns63,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns63,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns63,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns63,
    defaultParseWidth: "any",
    valueCallback: function valueCallback125(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns63,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns63,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns63,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns63,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns63,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns63,
    defaultParseWidth: "any"
  })
};
var match_default64 = match63;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ru/index.js
var locale74 = {
  code: "ru",
  formatDistance: formatDistance_default65,
  formatLong: formatLong_default72,
  formatRelative: formatRelative_default65,
  localize: localize_default65,
  match: match_default64,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var ru_default = locale74;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/_lib/formatDistance/index.js
function declensionGroup2(scheme, count) {
  if (count === 1 && scheme.one) {
    return scheme.one;
  }
  if (count >= 2 && count <= 4 && scheme.twoFour) {
    return scheme.twoFour;
  }
  return scheme.other;
}
function declension6(scheme, count, time) {
  var group = declensionGroup2(scheme, count);
  var finalText = group[time];
  return finalText.replace("{{count}}", String(count));
}
function extractPreposition(token) {
  var result = ["lessThan", "about", "over", "almost"].filter(function(preposition) {
    return !!token.match(new RegExp("^" + preposition));
  });
  return result[0];
}
function prefixPreposition(preposition) {
  var translation = "";
  if (preposition === "almost") {
    translation = "takmer";
  }
  if (preposition === "about") {
    translation = "približne";
  }
  return translation.length > 0 ? translation + " " : "";
}
function suffixPreposition(preposition) {
  var translation = "";
  if (preposition === "lessThan") {
    translation = "menej než";
  }
  if (preposition === "over") {
    translation = "viac než";
  }
  return translation.length > 0 ? translation + " " : "";
}
function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
var formatDistanceLocale64 = {
  xSeconds: {
    one: {
      present: "sekunda",
      past: "sekundou",
      future: "sekundu"
    },
    twoFour: {
      present: "{{count}} sekundy",
      past: "{{count}} sekundami",
      future: "{{count}} sekundy"
    },
    other: {
      present: "{{count}} sekúnd",
      past: "{{count}} sekundami",
      future: "{{count}} sekúnd"
    }
  },
  halfAMinute: {
    other: {
      present: "pol minúty",
      past: "pol minútou",
      future: "pol minúty"
    }
  },
  xMinutes: {
    one: {
      present: "minúta",
      past: "minútou",
      future: "minútu"
    },
    twoFour: {
      present: "{{count}} minúty",
      past: "{{count}} minútami",
      future: "{{count}} minúty"
    },
    other: {
      present: "{{count}} minút",
      past: "{{count}} minútami",
      future: "{{count}} minút"
    }
  },
  xHours: {
    one: {
      present: "hodina",
      past: "hodinou",
      future: "hodinu"
    },
    twoFour: {
      present: "{{count}} hodiny",
      past: "{{count}} hodinami",
      future: "{{count}} hodiny"
    },
    other: {
      present: "{{count}} hodín",
      past: "{{count}} hodinami",
      future: "{{count}} hodín"
    }
  },
  xDays: {
    one: {
      present: "deň",
      past: "dňom",
      future: "deň"
    },
    twoFour: {
      present: "{{count}} dni",
      past: "{{count}} dňami",
      future: "{{count}} dni"
    },
    other: {
      present: "{{count}} dní",
      past: "{{count}} dňami",
      future: "{{count}} dní"
    }
  },
  xWeeks: {
    one: {
      present: "týždeň",
      past: "týždňom",
      future: "týždeň"
    },
    twoFour: {
      present: "{{count}} týždne",
      past: "{{count}} týždňami",
      future: "{{count}} týždne"
    },
    other: {
      present: "{{count}} týždňov",
      past: "{{count}} týždňami",
      future: "{{count}} týždňov"
    }
  },
  xMonths: {
    one: {
      present: "mesiac",
      past: "mesiacom",
      future: "mesiac"
    },
    twoFour: {
      present: "{{count}} mesiace",
      past: "{{count}} mesiacmi",
      future: "{{count}} mesiace"
    },
    other: {
      present: "{{count}} mesiacov",
      past: "{{count}} mesiacmi",
      future: "{{count}} mesiacov"
    }
  },
  xYears: {
    one: {
      present: "rok",
      past: "rokom",
      future: "rok"
    },
    twoFour: {
      present: "{{count}} roky",
      past: "{{count}} rokmi",
      future: "{{count}} roky"
    },
    other: {
      present: "{{count}} rokov",
      past: "{{count}} rokmi",
      future: "{{count}} rokov"
    }
  }
};
var formatDistance129 = function formatDistance130(token, count, options) {
  var preposition = extractPreposition(token) || "";
  var key = lowercaseFirstLetter(token.substring(preposition.length));
  var scheme = formatDistanceLocale64[key];
  if (!(options !== null && options !== void 0 && options.addSuffix)) {
    return prefixPreposition(preposition) + suffixPreposition(preposition) + declension6(scheme, count, "present");
  }
  if (options.comparison && options.comparison > 0) {
    return prefixPreposition(preposition) + "o " + suffixPreposition(preposition) + declension6(scheme, count, "future");
  } else {
    return prefixPreposition(preposition) + "pred " + suffixPreposition(preposition) + declension6(scheme, count, "past");
  }
};
var formatDistance_default66 = formatDistance129;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/_lib/formatLong/index.js
var dateFormats73 = {
  full: "EEEE d. MMMM y",
  long: "d. MMMM y",
  medium: "d. M. y",
  short: "d. M. y"
};
var timeFormats73 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats73 = {
  full: "{{date}}, {{time}}",
  long: "{{date}}, {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong73 = {
  date: buildFormatLongFn({
    formats: dateFormats73,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats73,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats73,
    defaultWidth: "full"
  })
};
var formatLong_default73 = formatLong73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/_lib/formatRelative/index.js
var accusativeWeekdays7 = ["nedeľu", "pondelok", "utorok", "stredu", "štvrtok", "piatok", "sobotu"];
function _lastWeek5(day) {
  var weekday = accusativeWeekdays7[day];
  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'minulú " + weekday + " o' p";
    default:
      return "'minulý' eeee 'o' p";
  }
}
function thisWeek8(day) {
  var weekday = accusativeWeekdays7[day];
  if (day === 4) {
    return "'vo' eeee 'o' p";
  } else {
    return "'v " + weekday + " o' p";
  }
}
function _nextWeek5(day) {
  var weekday = accusativeWeekdays7[day];
  switch (day) {
    case 0:
    case 4:
    case 6:
      return "'budúcu " + weekday + " o' p";
    default:
      return "'budúci' eeee 'o' p";
  }
}
var formatRelativeLocale65 = {
  lastWeek: function lastWeek15(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek8(day);
    } else {
      return _lastWeek5(day);
    }
  },
  yesterday: "'včera o' p",
  today: "'dnes o' p",
  tomorrow: "'zajtra o' p",
  nextWeek: function nextWeek12(date, baseDate, options) {
    var day = date.getUTCDay();
    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek8(day);
    } else {
      return _nextWeek5(day);
    }
  },
  other: "P"
};
var formatRelative129 = function formatRelative130(token, date, baseDate, options) {
  var format = formatRelativeLocale65[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default66 = formatRelative129;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/_lib/localize/index.js
var eraValues65 = {
  narrow: ["pred Kr.", "po Kr."],
  abbreviated: ["pred Kr.", "po Kr."],
  wide: ["pred Kristom", "po Kristovi"]
};
var quarterValues65 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. štvrťrok", "2. štvrťrok", "3. štvrťrok", "4. štvrťrok"]
};
var monthValues65 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"],
  wide: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"]
};
var formattingMonthValues15 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"],
  wide: ["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra"]
};
var dayValues65 = {
  narrow: ["n", "p", "u", "s", "š", "p", "s"],
  short: ["ne", "po", "ut", "st", "št", "pi", "so"],
  abbreviated: ["ne", "po", "ut", "st", "št", "pi", "so"],
  wide: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"]
};
var dayPeriodValues65 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "poln.",
    noon: "pol.",
    morning: "ráno",
    afternoon: "pop.",
    evening: "več.",
    night: "noc"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "poln.",
    noon: "pol.",
    morning: "ráno",
    afternoon: "popol.",
    evening: "večer",
    night: "noc"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "polnoc",
    noon: "poludnie",
    morning: "ráno",
    afternoon: "popoludnie",
    evening: "večer",
    night: "noc"
  }
};
var formattingDayPeriodValues50 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "o poln.",
    noon: "nap.",
    morning: "ráno",
    afternoon: "pop.",
    evening: "več.",
    night: "v n."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "o poln.",
    noon: "napol.",
    morning: "ráno",
    afternoon: "popol.",
    evening: "večer",
    night: "v noci"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "o polnoci",
    noon: "napoludnie",
    morning: "ráno",
    afternoon: "popoludní",
    evening: "večer",
    night: "v noci"
  }
};
var ordinalNumber129 = function ordinalNumber130(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize65 = {
  ordinalNumber: ordinalNumber129,
  era: buildLocalizeFn({
    values: eraValues65,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues65,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback65(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues65,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues15,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues65,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues65,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues50,
    defaultFormattingWidth: "wide"
  })
};
var localize_default66 = localize65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/_lib/match/index.js
var matchOrdinalNumberPattern64 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern64 = /\d+/i;
var matchEraPatterns64 = {
  narrow: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(pred Kristom|pred na[šs][íi]m letopo[čc]tom|po Kristovi|n[áa][šs]ho letopo[čc]tu)/i
};
var parseEraPatterns64 = {
  any: [/^pr/i, /^(po|n)/i]
};
var matchQuarterPatterns64 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]\. [šs]tvr[ťt]rok/i
};
var parseQuarterPatterns64 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns64 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|m[áa]j|j[úu]n|j[úu]l|aug|sep|okt|nov|dec)/i,
  wide: /^(janu[áa]ra?|febru[áa]ra?|(marec|marca)|apr[íi]la?|m[áa]ja?|j[úu]na?|j[úu]la?|augusta?|(september|septembra)|(okt[óo]ber|okt[óo]bra)|(november|novembra)|(december|decembra))/i
};
var parseMonthPatterns64 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^m[áa]j/i, /^j[úu]n/i, /^j[úu]l/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns64 = {
  narrow: /^[npusšp]/i,
  short: /^(ne|po|ut|st|št|pi|so)/i,
  abbreviated: /^(ne|po|ut|st|št|pi|so)/i,
  wide: /^(nede[ľl]a|pondelok|utorok|streda|[šs]tvrtok|piatok|sobota])/i
};
var parseDayPatterns64 = {
  narrow: [/^n/i, /^p/i, /^u/i, /^s/i, /^š/i, /^p/i, /^s/i],
  any: [/^n/i, /^po/i, /^u/i, /^st/i, /^(št|stv)/i, /^pi/i, /^so/i]
};
var matchDayPeriodPatterns64 = {
  narrow: /^(am|pm|(o )?poln\.?|(nap\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]\.?|(v n\.?|noc))/i,
  abbreviated: /^(am|pm|(o )?poln\.?|(napol\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]er|(v )?noci?)/i,
  any: /^(am|pm|(o )?polnoci?|(na)?poludnie|r[áa]no|popoludn(ie|í|i)|ve[čc]er|(v )?noci?)/i
};
var parseDayPeriodPatterns64 = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /poln/i,
    noon: /^(nap|(na)?pol(\.|u))/i,
    morning: /^r[áa]no/i,
    afternoon: /^pop/i,
    evening: /^ve[čc]/i,
    night: /^(noc|v n\.)/i
  }
};
var match64 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern64,
    parsePattern: parseOrdinalNumberPattern64,
    valueCallback: function valueCallback126(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns64,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns64,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns64,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns64,
    defaultParseWidth: "any",
    valueCallback: function valueCallback127(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns64,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns64,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns64,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns64,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns64,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns64,
    defaultParseWidth: "any"
  })
};
var match_default65 = match64;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sk/index.js
var locale75 = {
  code: "sk",
  formatDistance: formatDistance_default66,
  formatLong: formatLong_default73,
  formatRelative: formatRelative_default66,
  localize: localize_default66,
  match: match_default65,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var sk_default = locale75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/_lib/formatDistance/index.js
function isPluralType(val) {
  return val.one !== void 0;
}
var formatDistanceLocale65 = {
  lessThanXSeconds: {
    present: {
      one: "manj kot {{count}} sekunda",
      two: "manj kot {{count}} sekundi",
      few: "manj kot {{count}} sekunde",
      other: "manj kot {{count}} sekund"
    },
    past: {
      one: "manj kot {{count}} sekundo",
      two: "manj kot {{count}} sekundama",
      few: "manj kot {{count}} sekundami",
      other: "manj kot {{count}} sekundami"
    },
    future: {
      one: "manj kot {{count}} sekundo",
      two: "manj kot {{count}} sekundi",
      few: "manj kot {{count}} sekunde",
      other: "manj kot {{count}} sekund"
    }
  },
  xSeconds: {
    present: {
      one: "{{count}} sekunda",
      two: "{{count}} sekundi",
      few: "{{count}} sekunde",
      other: "{{count}} sekund"
    },
    past: {
      one: "{{count}} sekundo",
      two: "{{count}} sekundama",
      few: "{{count}} sekundami",
      other: "{{count}} sekundami"
    },
    future: {
      one: "{{count}} sekundo",
      two: "{{count}} sekundi",
      few: "{{count}} sekunde",
      other: "{{count}} sekund"
    }
  },
  halfAMinute: "pol minute",
  lessThanXMinutes: {
    present: {
      one: "manj kot {{count}} minuta",
      two: "manj kot {{count}} minuti",
      few: "manj kot {{count}} minute",
      other: "manj kot {{count}} minut"
    },
    past: {
      one: "manj kot {{count}} minuto",
      two: "manj kot {{count}} minutama",
      few: "manj kot {{count}} minutami",
      other: "manj kot {{count}} minutami"
    },
    future: {
      one: "manj kot {{count}} minuto",
      two: "manj kot {{count}} minuti",
      few: "manj kot {{count}} minute",
      other: "manj kot {{count}} minut"
    }
  },
  xMinutes: {
    present: {
      one: "{{count}} minuta",
      two: "{{count}} minuti",
      few: "{{count}} minute",
      other: "{{count}} minut"
    },
    past: {
      one: "{{count}} minuto",
      two: "{{count}} minutama",
      few: "{{count}} minutami",
      other: "{{count}} minutami"
    },
    future: {
      one: "{{count}} minuto",
      two: "{{count}} minuti",
      few: "{{count}} minute",
      other: "{{count}} minut"
    }
  },
  aboutXHours: {
    present: {
      one: "približno {{count}} ura",
      two: "približno {{count}} uri",
      few: "približno {{count}} ure",
      other: "približno {{count}} ur"
    },
    past: {
      one: "približno {{count}} uro",
      two: "približno {{count}} urama",
      few: "približno {{count}} urami",
      other: "približno {{count}} urami"
    },
    future: {
      one: "približno {{count}} uro",
      two: "približno {{count}} uri",
      few: "približno {{count}} ure",
      other: "približno {{count}} ur"
    }
  },
  xHours: {
    present: {
      one: "{{count}} ura",
      two: "{{count}} uri",
      few: "{{count}} ure",
      other: "{{count}} ur"
    },
    past: {
      one: "{{count}} uro",
      two: "{{count}} urama",
      few: "{{count}} urami",
      other: "{{count}} urami"
    },
    future: {
      one: "{{count}} uro",
      two: "{{count}} uri",
      few: "{{count}} ure",
      other: "{{count}} ur"
    }
  },
  xDays: {
    present: {
      one: "{{count}} dan",
      two: "{{count}} dni",
      few: "{{count}} dni",
      other: "{{count}} dni"
    },
    past: {
      one: "{{count}} dnem",
      two: "{{count}} dnevoma",
      few: "{{count}} dnevi",
      other: "{{count}} dnevi"
    },
    future: {
      one: "{{count}} dan",
      two: "{{count}} dni",
      few: "{{count}} dni",
      other: "{{count}} dni"
    }
  },
  // no tenses for weeks?
  aboutXWeeks: {
    one: "približno {{count}} teden",
    two: "približno {{count}} tedna",
    few: "približno {{count}} tedne",
    other: "približno {{count}} tednov"
  },
  // no tenses for weeks?
  xWeeks: {
    one: "{{count}} teden",
    two: "{{count}} tedna",
    few: "{{count}} tedne",
    other: "{{count}} tednov"
  },
  aboutXMonths: {
    present: {
      one: "približno {{count}} mesec",
      two: "približno {{count}} meseca",
      few: "približno {{count}} mesece",
      other: "približno {{count}} mesecev"
    },
    past: {
      one: "približno {{count}} mesecem",
      two: "približno {{count}} mesecema",
      few: "približno {{count}} meseci",
      other: "približno {{count}} meseci"
    },
    future: {
      one: "približno {{count}} mesec",
      two: "približno {{count}} meseca",
      few: "približno {{count}} mesece",
      other: "približno {{count}} mesecev"
    }
  },
  xMonths: {
    present: {
      one: "{{count}} mesec",
      two: "{{count}} meseca",
      few: "{{count}} meseci",
      other: "{{count}} mesecev"
    },
    past: {
      one: "{{count}} mesecem",
      two: "{{count}} mesecema",
      few: "{{count}} meseci",
      other: "{{count}} meseci"
    },
    future: {
      one: "{{count}} mesec",
      two: "{{count}} meseca",
      few: "{{count}} mesece",
      other: "{{count}} mesecev"
    }
  },
  aboutXYears: {
    present: {
      one: "približno {{count}} leto",
      two: "približno {{count}} leti",
      few: "približno {{count}} leta",
      other: "približno {{count}} let"
    },
    past: {
      one: "približno {{count}} letom",
      two: "približno {{count}} letoma",
      few: "približno {{count}} leti",
      other: "približno {{count}} leti"
    },
    future: {
      one: "približno {{count}} leto",
      two: "približno {{count}} leti",
      few: "približno {{count}} leta",
      other: "približno {{count}} let"
    }
  },
  xYears: {
    present: {
      one: "{{count}} leto",
      two: "{{count}} leti",
      few: "{{count}} leta",
      other: "{{count}} let"
    },
    past: {
      one: "{{count}} letom",
      two: "{{count}} letoma",
      few: "{{count}} leti",
      other: "{{count}} leti"
    },
    future: {
      one: "{{count}} leto",
      two: "{{count}} leti",
      few: "{{count}} leta",
      other: "{{count}} let"
    }
  },
  overXYears: {
    present: {
      one: "več kot {{count}} leto",
      two: "več kot {{count}} leti",
      few: "več kot {{count}} leta",
      other: "več kot {{count}} let"
    },
    past: {
      one: "več kot {{count}} letom",
      two: "več kot {{count}} letoma",
      few: "več kot {{count}} leti",
      other: "več kot {{count}} leti"
    },
    future: {
      one: "več kot {{count}} leto",
      two: "več kot {{count}} leti",
      few: "več kot {{count}} leta",
      other: "več kot {{count}} let"
    }
  },
  almostXYears: {
    present: {
      one: "skoraj {{count}} leto",
      two: "skoraj {{count}} leti",
      few: "skoraj {{count}} leta",
      other: "skoraj {{count}} let"
    },
    past: {
      one: "skoraj {{count}} letom",
      two: "skoraj {{count}} letoma",
      few: "skoraj {{count}} leti",
      other: "skoraj {{count}} leti"
    },
    future: {
      one: "skoraj {{count}} leto",
      two: "skoraj {{count}} leti",
      few: "skoraj {{count}} leta",
      other: "skoraj {{count}} let"
    }
  }
};
function getFormFromCount(count) {
  switch (count % 100) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
    case 4:
      return "few";
    default:
      return "other";
  }
}
var formatDistance131 = function formatDistance132(token, count, options) {
  var result = "";
  var tense = "present";
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      tense = "future";
      result = "čez ";
    } else {
      tense = "past";
      result = "pred ";
    }
  }
  var tokenValue = formatDistanceLocale65[token];
  if (typeof tokenValue === "string") {
    result += tokenValue;
  } else {
    var form = getFormFromCount(count);
    if (isPluralType(tokenValue)) {
      result += tokenValue[form].replace("{{count}}", String(count));
    } else {
      result += tokenValue[tense][form].replace("{{count}}", String(count));
    }
  }
  return result;
};
var formatDistance_default67 = formatDistance131;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/_lib/formatLong/index.js
var dateFormats74 = {
  full: "EEEE, dd. MMMM y",
  long: "dd. MMMM y",
  medium: "d. MMM y",
  short: "d. MM. yy"
};
var timeFormats74 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats74 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong74 = {
  date: buildFormatLongFn({
    formats: dateFormats74,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats74,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats74,
    defaultWidth: "full"
  })
};
var formatLong_default74 = formatLong74;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/_lib/formatRelative/index.js
var formatRelativeLocale66 = {
  lastWeek: function lastWeek16(date) {
    var day = date.getUTCDay();
    switch (day) {
      case 0:
        return "'prejšnjo nedeljo ob' p";
      case 3:
        return "'prejšnjo sredo ob' p";
      case 6:
        return "'prejšnjo soboto ob' p";
      default:
        return "'prejšnji' EEEE 'ob' p";
    }
  },
  yesterday: "'včeraj ob' p",
  today: "'danes ob' p",
  tomorrow: "'jutri ob' p",
  nextWeek: function nextWeek13(date) {
    var day = date.getUTCDay();
    switch (day) {
      case 0:
        return "'naslednjo nedeljo ob' p";
      case 3:
        return "'naslednjo sredo ob' p";
      case 6:
        return "'naslednjo soboto ob' p";
      default:
        return "'naslednji' EEEE 'ob' p";
    }
  },
  other: "P"
};
var formatRelative131 = function formatRelative132(token, date, _baseDate, _options) {
  var format = formatRelativeLocale66[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default67 = formatRelative131;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/_lib/localize/index.js
var eraValues66 = {
  narrow: ["pr. n. št.", "po n. št."],
  abbreviated: ["pr. n. št.", "po n. št."],
  wide: ["pred našim štetjem", "po našem štetju"]
};
var quarterValues66 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. čet.", "2. čet.", "3. čet.", "4. čet."],
  wide: ["1. četrtletje", "2. četrtletje", "3. četrtletje", "4. četrtletje"]
};
var monthValues66 = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
};
var dayValues66 = {
  narrow: ["n", "p", "t", "s", "č", "p", "s"],
  short: ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],
  abbreviated: ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],
  wide: ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"]
};
var dayPeriodValues66 = {
  narrow: {
    am: "d",
    pm: "p",
    midnight: "24.00",
    noon: "12.00",
    morning: "j",
    afternoon: "p",
    evening: "v",
    night: "n"
  },
  abbreviated: {
    am: "dop.",
    pm: "pop.",
    midnight: "poln.",
    noon: "pold.",
    morning: "jut.",
    afternoon: "pop.",
    evening: "več.",
    night: "noč"
  },
  wide: {
    am: "dop.",
    pm: "pop.",
    midnight: "polnoč",
    noon: "poldne",
    morning: "jutro",
    afternoon: "popoldne",
    evening: "večer",
    night: "noč"
  }
};
var formattingDayPeriodValues51 = {
  narrow: {
    am: "d",
    pm: "p",
    midnight: "24.00",
    noon: "12.00",
    morning: "zj",
    afternoon: "p",
    evening: "zv",
    night: "po"
  },
  abbreviated: {
    am: "dop.",
    pm: "pop.",
    midnight: "opoln.",
    noon: "opold.",
    morning: "zjut.",
    afternoon: "pop.",
    evening: "zveč.",
    night: "ponoči"
  },
  wide: {
    am: "dop.",
    pm: "pop.",
    midnight: "opolnoči",
    noon: "opoldne",
    morning: "zjutraj",
    afternoon: "popoldan",
    evening: "zvečer",
    night: "ponoči"
  }
};
var ordinalNumber131 = function ordinalNumber132(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize66 = {
  ordinalNumber: ordinalNumber131,
  era: buildLocalizeFn({
    values: eraValues66,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues66,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback66(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues66,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues66,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues66,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues51,
    defaultFormattingWidth: "wide"
  })
};
var localize_default67 = localize66;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/_lib/match/index.js
var matchOrdinalNumberPattern65 = /^(\d+)\./i;
var parseOrdinalNumberPattern65 = /\d+/i;
var matchEraPatterns65 = {
  abbreviated: /^(pr\. n\. št\.|po n\. št\.)/i,
  wide: /^(pred Kristusom|pred na[sš]im [sš]tetjem|po Kristusu|po na[sš]em [sš]tetju|na[sš]ega [sš]tetja)/i
};
var parseEraPatterns65 = {
  any: [/^pr/i, /^(po|na[sš]em)/i]
};
var matchQuarterPatterns65 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?[čc]et\.?/i,
  wide: /^[1234]\. [čc]etrtletje/i
};
var parseQuarterPatterns65 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns65 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan\.|feb\.|mar\.|apr\.|maj|jun\.|jul\.|avg\.|sep\.|okt\.|nov\.|dec\.)/i,
  wide: /^(januar|februar|marec|april|maj|junij|julij|avgust|september|oktober|november|december)/i
};
var parseMonthPatterns65 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  abbreviated: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i],
  wide: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns65 = {
  narrow: /^[nptsčc]/i,
  short: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
  abbreviated: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
  wide: /^(nedelja|ponedeljek|torek|sreda|[cč]etrtek|petek|sobota)/i
};
var parseDayPatterns65 = {
  narrow: [/^n/i, /^p/i, /^t/i, /^s/i, /^[cč]/i, /^p/i, /^s/i],
  any: [/^n/i, /^po/i, /^t/i, /^sr/i, /^[cč]/i, /^pe/i, /^so/i]
};
var matchDayPeriodPatterns65 = {
  narrow: /^(d|po?|z?v|n|z?j|24\.00|12\.00)/i,
  any: /^(dop\.|pop\.|o?poln(\.|o[cč]i?)|o?pold(\.|ne)|z?ve[cč](\.|er)|(po)?no[cč]i?|popold(ne|an)|jut(\.|ro)|zjut(\.|raj))/i
};
var parseDayPeriodPatterns65 = {
  narrow: {
    am: /^d/i,
    pm: /^p/i,
    midnight: /^24/i,
    noon: /^12/i,
    morning: /^(z?j)/i,
    afternoon: /^p/i,
    evening: /^(z?v)/i,
    night: /^(n|po)/i
  },
  any: {
    am: /^dop\./i,
    pm: /^pop\./i,
    midnight: /^o?poln/i,
    noon: /^o?pold/i,
    morning: /j/i,
    afternoon: /^pop\./i,
    evening: /^z?ve/i,
    night: /(po)?no/i
  }
};
var match65 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern65,
    parsePattern: parseOrdinalNumberPattern65,
    valueCallback: function valueCallback128(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns65,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns65,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns65,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns65,
    defaultParseWidth: "any",
    valueCallback: function valueCallback129(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns65,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns65,
    defaultParseWidth: "wide"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns65,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns65,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns65,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns65,
    defaultParseWidth: "any"
  })
};
var match_default66 = match65;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sl/index.js
var locale76 = {
  code: "sl",
  formatDistance: formatDistance_default67,
  formatLong: formatLong_default74,
  formatRelative: formatRelative_default67,
  localize: localize_default67,
  match: match_default66,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var sl_default = locale76;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/_lib/formatDistance/index.js
var formatDistanceLocale66 = {
  lessThanXSeconds: {
    one: "më pak se një sekondë",
    other: "më pak se {{count}} sekonda"
  },
  xSeconds: {
    one: "1 sekondë",
    other: "{{count}} sekonda"
  },
  halfAMinute: "gjysëm minuti",
  lessThanXMinutes: {
    one: "më pak se një minute",
    other: "më pak se {{count}} minuta"
  },
  xMinutes: {
    one: "1 minutë",
    other: "{{count}} minuta"
  },
  aboutXHours: {
    one: "rreth 1 orë",
    other: "rreth {{count}} orë"
  },
  xHours: {
    one: "1 orë",
    other: "{{count}} orë"
  },
  xDays: {
    one: "1 ditë",
    other: "{{count}} ditë"
  },
  aboutXWeeks: {
    one: "rreth 1 javë",
    other: "rreth {{count}} javë"
  },
  xWeeks: {
    one: "1 javë",
    other: "{{count}} javë"
  },
  aboutXMonths: {
    one: "rreth 1 muaj",
    other: "rreth {{count}} muaj"
  },
  xMonths: {
    one: "1 muaj",
    other: "{{count}} muaj"
  },
  aboutXYears: {
    one: "rreth 1 vit",
    other: "rreth {{count}} vite"
  },
  xYears: {
    one: "1 vit",
    other: "{{count}} vite"
  },
  overXYears: {
    one: "mbi 1 vit",
    other: "mbi {{count}} vite"
  },
  almostXYears: {
    one: "pothuajse 1 vit",
    other: "pothuajse {{count}} vite"
  }
};
var formatDistance133 = function formatDistance134(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale66[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "në " + result;
    } else {
      return result + " më parë";
    }
  }
  return result;
};
var formatDistance_default68 = formatDistance133;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/_lib/formatLong/index.js
var dateFormats75 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats75 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats75 = {
  full: "{{date}} 'në' {{time}}",
  long: "{{date}} 'në' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong75 = {
  date: buildFormatLongFn({
    formats: dateFormats75,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats75,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats75,
    defaultWidth: "full"
  })
};
var formatLong_default75 = formatLong75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/_lib/formatRelative/index.js
var formatRelativeLocale67 = {
  lastWeek: "'të' eeee 'e shkuar në' p",
  yesterday: "'dje në' p",
  today: "'sot në' p",
  tomorrow: "'nesër në' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative133 = function formatRelative134(token, _date, _baseDate, _options) {
  return formatRelativeLocale67[token];
};
var formatRelative_default68 = formatRelative133;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/_lib/localize/index.js
var eraValues67 = {
  narrow: ["P", "M"],
  abbreviated: ["PK", "MK"],
  wide: ["Para Krishtit", "Mbas Krishtit"]
};
var quarterValues67 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["4-mujori I", "4-mujori II", "4-mujori III", "4-mujori IV"]
};
var monthValues67 = {
  narrow: ["J", "S", "M", "P", "M", "Q", "K", "G", "S", "T", "N", "D"],
  abbreviated: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"],
  wide: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"]
};
var dayValues67 = {
  narrow: ["D", "H", "M", "M", "E", "P", "S"],
  short: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
  abbreviated: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"],
  wide: ["Dielë", "Hënë", "Martë", "Mërkurë", "Enjte", "Premte", "Shtunë"]
};
var dayPeriodValues67 = {
  narrow: {
    am: "p",
    pm: "m",
    midnight: "m",
    noon: "d",
    morning: "mëngjes",
    afternoon: "dite",
    evening: "mbrëmje",
    night: "natë"
  },
  abbreviated: {
    am: "PD",
    pm: "MD",
    midnight: "mesnëtë",
    noon: "drek",
    morning: "mëngjes",
    afternoon: "mbasdite",
    evening: "mbrëmje",
    night: "natë"
  },
  wide: {
    am: "p.d.",
    pm: "m.d.",
    midnight: "mesnëtë",
    noon: "drek",
    morning: "mëngjes",
    afternoon: "mbasdite",
    evening: "mbrëmje",
    night: "natë"
  }
};
var formattingDayPeriodValues52 = {
  narrow: {
    am: "p",
    pm: "m",
    midnight: "m",
    noon: "d",
    morning: "në mëngjes",
    afternoon: "në mbasdite",
    evening: "në mbrëmje",
    night: "në mesnatë"
  },
  abbreviated: {
    am: "PD",
    pm: "MD",
    midnight: "mesnatë",
    noon: "drek",
    morning: "në mëngjes",
    afternoon: "në mbasdite",
    evening: "në mbrëmje",
    night: "në mesnatë"
  },
  wide: {
    am: "p.d.",
    pm: "m.d.",
    midnight: "mesnatë",
    noon: "drek",
    morning: "në mëngjes",
    afternoon: "në mbasdite",
    evening: "në mbrëmje",
    night: "në mesnatë"
  }
};
var ordinalNumber133 = function ordinalNumber134(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  if ((options === null || options === void 0 ? void 0 : options.unit) === "hour")
    return String(number);
  if (number === 1)
    return number + "-rë";
  if (number === 4)
    return number + "t";
  return number + "-të";
};
var localize67 = {
  ordinalNumber: ordinalNumber133,
  era: buildLocalizeFn({
    values: eraValues67,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues67,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback67(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues67,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues67,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues67,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues52,
    defaultFormattingWidth: "wide"
  })
};
var localize_default68 = localize67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/_lib/match/index.js
var matchOrdinalNumberPattern66 = /^(\d+)(-rë|-të|t|)?/i;
var parseOrdinalNumberPattern66 = /\d+/i;
var matchEraPatterns66 = {
  narrow: /^(p|m)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(para krishtit|mbas krishtit)/i
};
var parseEraPatterns66 = {
  any: [/^b/i, /^(p|m)/i]
};
var matchQuarterPatterns66 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]-mujori (i{1,3}|iv)/i
};
var parseQuarterPatterns66 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns66 = {
  narrow: /^[jsmpqkftnd]/i,
  abbreviated: /^(jan|shk|mar|pri|maj|qer|kor|gus|sht|tet|nën|dhj)/i,
  wide: /^(janar|shkurt|mars|prill|maj|qershor|korrik|gusht|shtator|tetor|nëntor|dhjetor)/i
};
var parseMonthPatterns66 = {
  narrow: [/^j/i, /^s/i, /^m/i, /^p/i, /^m/i, /^q/i, /^k/i, /^g/i, /^s/i, /^t/i, /^n/i, /^d/i],
  any: [/^ja/i, /^shk/i, /^mar/i, /^pri/i, /^maj/i, /^qer/i, /^kor/i, /^gu/i, /^sht/i, /^tet/i, /^n/i, /^d/i]
};
var matchDayPatterns66 = {
  narrow: /^[dhmeps]/i,
  short: /^(di|hë|ma|më|en|pr|sh)/i,
  abbreviated: /^(die|hën|mar|mër|enj|pre|sht)/i,
  wide: /^(dielë|hënë|martë|mërkurë|enjte|premte|shtunë)/i
};
var parseDayPatterns66 = {
  narrow: [/^d/i, /^h/i, /^m/i, /^m/i, /^e/i, /^p/i, /^s/i],
  any: [/^d/i, /^h/i, /^ma/i, /^më/i, /^e/i, /^p/i, /^s/i]
};
var matchDayPeriodPatterns66 = {
  narrow: /^(p|m|me|në (mëngjes|mbasdite|mbrëmje|mesnatë))/i,
  any: /^([pm]\.?\s?d\.?|drek|në (mëngjes|mbasdite|mbrëmje|mesnatë))/i
};
var parseDayPeriodPatterns66 = {
  any: {
    am: /^p/i,
    pm: /^m/i,
    midnight: /^me/i,
    noon: /^dr/i,
    morning: /mëngjes/i,
    afternoon: /mbasdite/i,
    evening: /mbrëmje/i,
    night: /natë/i
  }
};
var match66 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern66,
    parsePattern: parseOrdinalNumberPattern66,
    valueCallback: function valueCallback130(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns66,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns66,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns66,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns66,
    defaultParseWidth: "any",
    valueCallback: function valueCallback131(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns66,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns66,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns66,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns66,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns66,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns66,
    defaultParseWidth: "any"
  })
};
var match_default67 = match66;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sq/index.js
var locale77 = {
  code: "sq",
  formatDistance: formatDistance_default68,
  formatLong: formatLong_default75,
  formatRelative: formatRelative_default68,
  localize: localize_default68,
  match: match_default67,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var sq_default = locale77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/_lib/formatDistance/index.js
var formatDistanceLocale67 = {
  lessThanXSeconds: {
    one: {
      standalone: "мање од 1 секунде",
      withPrepositionAgo: "мање од 1 секунде",
      withPrepositionIn: "мање од 1 секунду"
    },
    dual: "мање од {{count}} секунде",
    other: "мање од {{count}} секунди"
  },
  xSeconds: {
    one: {
      standalone: "1 секунда",
      withPrepositionAgo: "1 секунде",
      withPrepositionIn: "1 секунду"
    },
    dual: "{{count}} секунде",
    other: "{{count}} секунди"
  },
  halfAMinute: "пола минуте",
  lessThanXMinutes: {
    one: {
      standalone: "мање од 1 минуте",
      withPrepositionAgo: "мање од 1 минуте",
      withPrepositionIn: "мање од 1 минуту"
    },
    dual: "мање од {{count}} минуте",
    other: "мање од {{count}} минута"
  },
  xMinutes: {
    one: {
      standalone: "1 минута",
      withPrepositionAgo: "1 минуте",
      withPrepositionIn: "1 минуту"
    },
    dual: "{{count}} минуте",
    other: "{{count}} минута"
  },
  aboutXHours: {
    one: {
      standalone: "око 1 сат",
      withPrepositionAgo: "око 1 сат",
      withPrepositionIn: "око 1 сат"
    },
    dual: "око {{count}} сата",
    other: "око {{count}} сати"
  },
  xHours: {
    one: {
      standalone: "1 сат",
      withPrepositionAgo: "1 сат",
      withPrepositionIn: "1 сат"
    },
    dual: "{{count}} сата",
    other: "{{count}} сати"
  },
  xDays: {
    one: {
      standalone: "1 дан",
      withPrepositionAgo: "1 дан",
      withPrepositionIn: "1 дан"
    },
    dual: "{{count}} дана",
    other: "{{count}} дана"
  },
  aboutXWeeks: {
    one: {
      standalone: "око 1 недељу",
      withPrepositionAgo: "око 1 недељу",
      withPrepositionIn: "око 1 недељу"
    },
    dual: "око {{count}} недеље",
    other: "око {{count}} недеље"
  },
  xWeeks: {
    one: {
      standalone: "1 недељу",
      withPrepositionAgo: "1 недељу",
      withPrepositionIn: "1 недељу"
    },
    dual: "{{count}} недеље",
    other: "{{count}} недеље"
  },
  aboutXMonths: {
    one: {
      standalone: "око 1 месец",
      withPrepositionAgo: "око 1 месец",
      withPrepositionIn: "око 1 месец"
    },
    dual: "око {{count}} месеца",
    other: "око {{count}} месеци"
  },
  xMonths: {
    one: {
      standalone: "1 месец",
      withPrepositionAgo: "1 месец",
      withPrepositionIn: "1 месец"
    },
    dual: "{{count}} месеца",
    other: "{{count}} месеци"
  },
  aboutXYears: {
    one: {
      standalone: "око 1 годину",
      withPrepositionAgo: "око 1 годину",
      withPrepositionIn: "око 1 годину"
    },
    dual: "око {{count}} године",
    other: "око {{count}} година"
  },
  xYears: {
    one: {
      standalone: "1 година",
      withPrepositionAgo: "1 године",
      withPrepositionIn: "1 годину"
    },
    dual: "{{count}} године",
    other: "{{count}} година"
  },
  overXYears: {
    one: {
      standalone: "преко 1 годину",
      withPrepositionAgo: "преко 1 годину",
      withPrepositionIn: "преко 1 годину"
    },
    dual: "преко {{count}} године",
    other: "преко {{count}} година"
  },
  almostXYears: {
    one: {
      standalone: "готово 1 годину",
      withPrepositionAgo: "готово 1 годину",
      withPrepositionIn: "готово 1 годину"
    },
    dual: "готово {{count}} године",
    other: "готово {{count}} година"
  }
};
var formatDistance135 = function formatDistance136(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale67[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        result = tokenValue.one.withPrepositionIn;
      } else {
        result = tokenValue.one.withPrepositionAgo;
      }
    } else {
      result = tokenValue.one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== "1") {
    result = tokenValue.dual.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "за " + result;
    } else {
      return "пре " + result;
    }
  }
  return result;
};
var formatDistance_default69 = formatDistance135;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/_lib/formatLong/index.js
var dateFormats76 = {
  full: "EEEE, d. MMMM yyyy.",
  long: "d. MMMM yyyy.",
  medium: "d. MMM yy.",
  short: "dd. MM. yy."
};
var timeFormats76 = {
  full: "HH:mm:ss (zzzz)",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats76 = {
  full: "{{date}} 'у' {{time}}",
  long: "{{date}} 'у' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong76 = {
  date: buildFormatLongFn({
    formats: dateFormats76,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats76,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats76,
    defaultWidth: "full"
  })
};
var formatLong_default76 = formatLong76;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/_lib/formatRelative/index.js
var formatRelativeLocale68 = {
  lastWeek: function lastWeek17(date) {
    var day = date.getUTCDay();
    switch (day) {
      case 0:
        return "'прошле недеље у' p";
      case 3:
        return "'прошле среде у' p";
      case 6:
        return "'прошле суботе у' p";
      default:
        return "'прошли' EEEE 'у' p";
    }
  },
  yesterday: "'јуче у' p",
  today: "'данас у' p",
  tomorrow: "'сутра у' p",
  nextWeek: function nextWeek14(date) {
    var day = date.getUTCDay();
    switch (day) {
      case 0:
        return "'следеће недеље у' p";
      case 3:
        return "'следећу среду у' p";
      case 6:
        return "'следећу суботу у' p";
      default:
        return "'следећи' EEEE 'у' p";
    }
  },
  other: "P"
};
var formatRelative135 = function formatRelative136(token, date, _baseDate, _options) {
  var format = formatRelativeLocale68[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default69 = formatRelative135;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/_lib/localize/index.js
var eraValues68 = {
  narrow: ["пр.н.е.", "АД"],
  abbreviated: ["пр. Хр.", "по. Хр."],
  wide: ["Пре Христа", "После Христа"]
};
var quarterValues68 = {
  narrow: ["1.", "2.", "3.", "4."],
  abbreviated: ["1. кв.", "2. кв.", "3. кв.", "4. кв."],
  wide: ["1. квартал", "2. квартал", "3. квартал", "4. квартал"]
};
var monthValues68 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"],
  wide: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"]
};
var formattingMonthValues16 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"],
  wide: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"]
};
var dayValues68 = {
  narrow: ["Н", "П", "У", "С", "Ч", "П", "С"],
  short: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
  abbreviated: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
  wide: ["недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота"]
};
var formattingDayPeriodValues53 = {
  narrow: {
    am: "АМ",
    pm: "ПМ",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "поподне",
    evening: "увече",
    night: "ноћу"
  },
  abbreviated: {
    am: "АМ",
    pm: "ПМ",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "поподне",
    evening: "увече",
    night: "ноћу"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "после подне",
    evening: "увече",
    night: "ноћу"
  }
};
var dayPeriodValues68 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "поподне",
    evening: "увече",
    night: "ноћу"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "поподне",
    evening: "увече",
    night: "ноћу"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "поноћ",
    noon: "подне",
    morning: "ујутру",
    afternoon: "после подне",
    evening: "увече",
    night: "ноћу"
  }
};
var ordinalNumber135 = function ordinalNumber136(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize68 = {
  ordinalNumber: ordinalNumber135,
  era: buildLocalizeFn({
    values: eraValues68,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues68,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback68(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues68,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues16,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues68,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues68,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues53,
    defaultFormattingWidth: "wide"
  })
};
var localize_default69 = localize68;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/_lib/match/index.js
var matchOrdinalNumberPattern67 = /^(\d+)\./i;
var parseOrdinalNumberPattern67 = /\d+/i;
var matchEraPatterns67 = {
  narrow: /^(пр\.н\.е\.|АД)/i,
  abbreviated: /^(пр\.\s?Хр\.|по\.\s?Хр\.)/i,
  wide: /^(Пре Христа|пре нове ере|После Христа|нова ера)/i
};
var parseEraPatterns67 = {
  any: [/^пр/i, /^(по|нова)/i]
};
var matchQuarterPatterns67 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?кв\.?/i,
  wide: /^[1234]\. квартал/i
};
var parseQuarterPatterns67 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns67 = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(јан|феб|мар|апр|мај|јун|јул|авг|сеп|окт|нов|дец)/i,
  wide: /^((јануар|јануара)|(фебруар|фебруара)|(март|марта)|(април|априла)|(мја|маја)|(јун|јуна)|(јул|јула)|(август|августа)|(септембар|септембра)|(октобар|октобра)|(новембар|новембра)|(децембар|децембра))/i
};
var parseMonthPatterns67 = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ја/i, /^ф/i, /^мар/i, /^ап/i, /^мај/i, /^јун/i, /^јул/i, /^авг/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns67 = {
  narrow: /^[пусчн]/i,
  short: /^(нед|пон|уто|сре|чет|пет|суб)/i,
  abbreviated: /^(нед|пон|уто|сре|чет|пет|суб)/i,
  wide: /^(недеља|понедељак|уторак|среда|четвртак|петак|субота)/i
};
var parseDayPatterns67 = {
  narrow: [/^п/i, /^у/i, /^с/i, /^ч/i, /^п/i, /^с/i, /^н/i],
  any: [/^нед/i, /^пон/i, /^уто/i, /^сре/i, /^чет/i, /^пет/i, /^суб/i]
};
var matchDayPeriodPatterns67 = {
  any: /^(ам|пм|поноћ|(по)?подне|увече|ноћу|после подне|ујутру)/i
};
var parseDayPeriodPatterns67 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^поно/i,
    noon: /^под/i,
    morning: /ујутру/i,
    afternoon: /(после\s|по)+подне/i,
    evening: /(увече)/i,
    night: /(ноћу)/i
  }
};
var match67 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern67,
    parsePattern: parseOrdinalNumberPattern67,
    valueCallback: function valueCallback132(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns67,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns67,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns67,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns67,
    defaultParseWidth: "any",
    valueCallback: function valueCallback133(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns67,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns67,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns67,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns67,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns67,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns67,
    defaultParseWidth: "any"
  })
};
var match_default68 = match67;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr/index.js
var locale78 = {
  code: "sr",
  formatDistance: formatDistance_default69,
  formatLong: formatLong_default76,
  formatRelative: formatRelative_default69,
  localize: localize_default69,
  match: match_default68,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var sr_default = locale78;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/_lib/formatDistance/index.js
var formatDistanceLocale68 = {
  lessThanXSeconds: {
    one: {
      standalone: "manje od 1 sekunde",
      withPrepositionAgo: "manje od 1 sekunde",
      withPrepositionIn: "manje od 1 sekundu"
    },
    dual: "manje od {{count}} sekunde",
    other: "manje od {{count}} sekundi"
  },
  xSeconds: {
    one: {
      standalone: "1 sekunda",
      withPrepositionAgo: "1 sekunde",
      withPrepositionIn: "1 sekundu"
    },
    dual: "{{count}} sekunde",
    other: "{{count}} sekundi"
  },
  halfAMinute: "pola minute",
  lessThanXMinutes: {
    one: {
      standalone: "manje od 1 minute",
      withPrepositionAgo: "manje od 1 minute",
      withPrepositionIn: "manje od 1 minutu"
    },
    dual: "manje od {{count}} minute",
    other: "manje od {{count}} minuta"
  },
  xMinutes: {
    one: {
      standalone: "1 minuta",
      withPrepositionAgo: "1 minute",
      withPrepositionIn: "1 minutu"
    },
    dual: "{{count}} minute",
    other: "{{count}} minuta"
  },
  aboutXHours: {
    one: {
      standalone: "oko 1 sat",
      withPrepositionAgo: "oko 1 sat",
      withPrepositionIn: "oko 1 sat"
    },
    dual: "oko {{count}} sata",
    other: "oko {{count}} sati"
  },
  xHours: {
    one: {
      standalone: "1 sat",
      withPrepositionAgo: "1 sat",
      withPrepositionIn: "1 sat"
    },
    dual: "{{count}} sata",
    other: "{{count}} sati"
  },
  xDays: {
    one: {
      standalone: "1 dan",
      withPrepositionAgo: "1 dan",
      withPrepositionIn: "1 dan"
    },
    dual: "{{count}} dana",
    other: "{{count}} dana"
  },
  aboutXWeeks: {
    one: {
      standalone: "oko 1 nedelju",
      withPrepositionAgo: "oko 1 nedelju",
      withPrepositionIn: "oko 1 nedelju"
    },
    dual: "oko {{count}} nedelje",
    other: "oko {{count}} nedelje"
  },
  xWeeks: {
    one: {
      standalone: "1 nedelju",
      withPrepositionAgo: "1 nedelju",
      withPrepositionIn: "1 nedelju"
    },
    dual: "{{count}} nedelje",
    other: "{{count}} nedelje"
  },
  aboutXMonths: {
    one: {
      standalone: "oko 1 mesec",
      withPrepositionAgo: "oko 1 mesec",
      withPrepositionIn: "oko 1 mesec"
    },
    dual: "oko {{count}} meseca",
    other: "oko {{count}} meseci"
  },
  xMonths: {
    one: {
      standalone: "1 mesec",
      withPrepositionAgo: "1 mesec",
      withPrepositionIn: "1 mesec"
    },
    dual: "{{count}} meseca",
    other: "{{count}} meseci"
  },
  aboutXYears: {
    one: {
      standalone: "oko 1 godinu",
      withPrepositionAgo: "oko 1 godinu",
      withPrepositionIn: "oko 1 godinu"
    },
    dual: "oko {{count}} godine",
    other: "oko {{count}} godina"
  },
  xYears: {
    one: {
      standalone: "1 godina",
      withPrepositionAgo: "1 godine",
      withPrepositionIn: "1 godinu"
    },
    dual: "{{count}} godine",
    other: "{{count}} godina"
  },
  overXYears: {
    one: {
      standalone: "preko 1 godinu",
      withPrepositionAgo: "preko 1 godinu",
      withPrepositionIn: "preko 1 godinu"
    },
    dual: "preko {{count}} godine",
    other: "preko {{count}} godina"
  },
  almostXYears: {
    one: {
      standalone: "gotovo 1 godinu",
      withPrepositionAgo: "gotovo 1 godinu",
      withPrepositionIn: "gotovo 1 godinu"
    },
    dual: "gotovo {{count}} godine",
    other: "gotovo {{count}} godina"
  }
};
var formatDistance137 = function formatDistance138(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale68[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        result = tokenValue.one.withPrepositionIn;
      } else {
        result = tokenValue.one.withPrepositionAgo;
      }
    } else {
      result = tokenValue.one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== "1") {
    result = tokenValue.dual.replace("{{count}}", String(count));
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "za " + result;
    } else {
      return "pre " + result;
    }
  }
  return result;
};
var formatDistance_default70 = formatDistance137;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/_lib/formatLong/index.js
var dateFormats77 = {
  full: "EEEE, d. MMMM yyyy.",
  long: "d. MMMM yyyy.",
  medium: "d. MMM yy.",
  short: "dd. MM. yy."
};
var timeFormats77 = {
  full: "HH:mm:ss (zzzz)",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats77 = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong77 = {
  date: buildFormatLongFn({
    formats: dateFormats77,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats77,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats77,
    defaultWidth: "full"
  })
};
var formatLong_default77 = formatLong77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/_lib/formatRelative/index.js
var formatRelativeLocale69 = {
  lastWeek: function lastWeek18(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'prošle nedelje u' p";
      case 3:
        return "'prošle srede u' p";
      case 6:
        return "'prošle subote u' p";
      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'juče u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function nextWeek15(date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'sledeće nedelje u' p";
      case 3:
        return "'sledeću sredu u' p";
      case 6:
        return "'sledeću subotu u' p";
      default:
        return "'sledeći' EEEE 'u' p";
    }
  },
  other: "P"
};
var formatRelative137 = function formatRelative138(token, date, _baseDate, _options) {
  var format = formatRelativeLocale69[token];
  if (typeof format === "function") {
    return format(date);
  }
  return format;
};
var formatRelative_default70 = formatRelative137;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/_lib/localize/index.js
var eraValues69 = {
  narrow: ["pr.n.e.", "AD"],
  abbreviated: ["pr. Hr.", "po. Hr."],
  wide: ["Pre Hrista", "Posle Hrista"]
};
var quarterValues69 = {
  narrow: ["1.", "2.", "3.", "4."],
  abbreviated: ["1. kv.", "2. kv.", "3. kv.", "4. kv."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
};
var monthValues69 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
  wide: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"]
};
var formattingMonthValues17 = {
  narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
  abbreviated: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
  wide: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"]
};
var dayValues69 = {
  narrow: ["N", "P", "U", "S", "Č", "P", "S"],
  short: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
  abbreviated: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
  wide: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"]
};
var formattingDayPeriodValues54 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "posle podne",
    evening: "uveče",
    night: "noću"
  }
};
var dayPeriodValues69 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "popodne",
    evening: "uveče",
    night: "noću"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "ponoć",
    noon: "podne",
    morning: "ujutru",
    afternoon: "posle podne",
    evening: "uveče",
    night: "noću"
  }
};
var ordinalNumber137 = function ordinalNumber138(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize69 = {
  ordinalNumber: ordinalNumber137,
  era: buildLocalizeFn({
    values: eraValues69,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues69,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback69(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues69,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues17,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues69,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues69,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues54,
    defaultFormattingWidth: "wide"
  })
};
var localize_default70 = localize69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/_lib/match/index.js
var matchOrdinalNumberPattern68 = /^(\d+)\./i;
var parseOrdinalNumberPattern68 = /\d+/i;
var matchEraPatterns68 = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Hr\.|po\.\s?Hr\.)/i,
  wide: /^(Pre Hrista|pre nove ere|Posle Hrista|nova era)/i
};
var parseEraPatterns68 = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns68 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns68 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns68 = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|avg|sep|okt|nov|dec)/i,
  wide: /^((januar|januara)|(februar|februara)|(mart|marta)|(april|aprila)|(maj|maja)|(jun|juna)|(jul|jula)|(avgust|avgusta)|(septembar|septembra)|(oktobar|oktobra)|(novembar|novembra)|(decembar|decembra))/i
};
var parseMonthPatterns68 = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^avg/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns68 = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  wide: /^(nedelja|ponedeljak|utorak|sreda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns68 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns68 = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|uvece|uveče|noću|posle podne|ujutru)/i
};
var parseDayPeriodPatterns68 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(posle\s|po)+podne/i,
    evening: /(uvece|uveče)/i,
    night: /(nocu|noću)/i
  }
};
var match68 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern68,
    parsePattern: parseOrdinalNumberPattern68,
    valueCallback: function valueCallback134(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns68,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns68,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns68,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns68,
    defaultParseWidth: "any",
    valueCallback: function valueCallback135(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns68,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns68,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns68,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns68,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns68,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns68,
    defaultParseWidth: "any"
  })
};
var match_default69 = match68;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sr-Latn/index.js
var locale79 = {
  code: "sr-Latn",
  formatDistance: formatDistance_default70,
  formatLong: formatLong_default77,
  formatRelative: formatRelative_default70,
  localize: localize_default70,
  match: match_default69,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var sr_Latn_default = locale79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/_lib/formatDistance/index.js
var formatDistanceLocale69 = {
  lessThanXSeconds: {
    one: "mindre än en sekund",
    other: "mindre än {{count}} sekunder"
  },
  xSeconds: {
    one: "en sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "en halv minut",
  lessThanXMinutes: {
    one: "mindre än en minut",
    other: "mindre än {{count}} minuter"
  },
  xMinutes: {
    one: "en minut",
    other: "{{count}} minuter"
  },
  aboutXHours: {
    one: "ungefär en timme",
    other: "ungefär {{count}} timmar"
  },
  xHours: {
    one: "en timme",
    other: "{{count}} timmar"
  },
  xDays: {
    one: "en dag",
    other: "{{count}} dagar"
  },
  aboutXWeeks: {
    one: "ungefär en vecka",
    other: "ungefär {{count}} vecka"
  },
  xWeeks: {
    one: "en vecka",
    other: "{{count}} vecka"
  },
  aboutXMonths: {
    one: "ungefär en månad",
    other: "ungefär {{count}} månader"
  },
  xMonths: {
    one: "en månad",
    other: "{{count}} månader"
  },
  aboutXYears: {
    one: "ungefär ett år",
    other: "ungefär {{count}} år"
  },
  xYears: {
    one: "ett år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "över ett år",
    other: "över {{count}} år"
  },
  almostXYears: {
    one: "nästan ett år",
    other: "nästan {{count}} år"
  }
};
var wordMapping2 = ["noll", "en", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio", "elva", "tolv"];
var formatDistance139 = function formatDistance140(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale69[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    if (options && options.onlyNumeric) {
      result = tokenValue.other.replace("{{count}}", String(count));
    } else {
      result = tokenValue.other.replace("{{count}}", count < 13 ? wordMapping2[count] : String(count));
    }
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "om " + result;
    } else {
      return result + " sedan";
    }
  }
  return result;
};
var formatDistance_default71 = formatDistance139;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/_lib/formatLong/index.js
var dateFormats78 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "y-MM-dd"
};
var timeFormats78 = {
  full: "'kl'. HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats78 = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong78 = {
  date: buildFormatLongFn({
    formats: dateFormats78,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats78,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats78,
    defaultWidth: "full"
  })
};
var formatLong_default78 = formatLong78;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/_lib/formatRelative/index.js
var formatRelativeLocale70 = {
  lastWeek: "'i' EEEE's kl.' p",
  yesterday: "'igår kl.' p",
  today: "'idag kl.' p",
  tomorrow: "'imorgon kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: "P"
};
var formatRelative139 = function formatRelative140(token, _date, _baseDate, _options) {
  return formatRelativeLocale70[token];
};
var formatRelative_default71 = formatRelative139;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/_lib/localize/index.js
var eraValues70 = {
  narrow: ["f.Kr.", "e.Kr."],
  abbreviated: ["f.Kr.", "e.Kr."],
  wide: ["före Kristus", "efter Kristus"]
};
var quarterValues70 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1:a kvartalet", "2:a kvartalet", "3:e kvartalet", "4:e kvartalet"]
};
var monthValues70 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]
};
var dayValues70 = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sö", "må", "ti", "on", "to", "fr", "lö"],
  abbreviated: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"],
  wide: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"]
};
var dayPeriodValues70 = {
  narrow: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "morg.",
    afternoon: "efterm.",
    evening: "kväll",
    night: "natt"
  },
  abbreviated: {
    am: "f.m.",
    pm: "e.m.",
    midnight: "midnatt",
    noon: "middag",
    morning: "morgon",
    afternoon: "efterm.",
    evening: "kväll",
    night: "natt"
  },
  wide: {
    am: "förmiddag",
    pm: "eftermiddag",
    midnight: "midnatt",
    noon: "middag",
    morning: "morgon",
    afternoon: "eftermiddag",
    evening: "kväll",
    night: "natt"
  }
};
var formattingDayPeriodValues55 = {
  narrow: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på efterm.",
    evening: "på kvällen",
    night: "på natten"
  },
  abbreviated: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morg.",
    afternoon: "på efterm.",
    evening: "på kvällen",
    night: "på natten"
  },
  wide: {
    am: "fm",
    pm: "em",
    midnight: "midnatt",
    noon: "middag",
    morning: "på morgonen",
    afternoon: "på eftermiddagen",
    evening: "på kvällen",
    night: "på natten"
  }
};
var ordinalNumber139 = function ordinalNumber140(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
      case 2:
        return number + ":a";
    }
  }
  return number + ":e";
};
var localize70 = {
  ordinalNumber: ordinalNumber139,
  era: buildLocalizeFn({
    values: eraValues70,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues70,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback70(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues70,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues70,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues70,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues55,
    defaultFormattingWidth: "wide"
  })
};
var localize_default71 = localize70;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/_lib/match/index.js
var matchOrdinalNumberPattern69 = /^(\d+)(:a|:e)?/i;
var parseOrdinalNumberPattern69 = /\d+/i;
var matchEraPatterns69 = {
  narrow: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  wide: /^(före Kristus|före vår tid|efter Kristus|vår tid)/i
};
var parseEraPatterns69 = {
  any: [/^f/i, /^[ev]/i]
};
var matchQuarterPatterns69 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](:a|:e)? kvartalet/i
};
var parseQuarterPatterns69 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns69 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar[s]?|apr|maj|jun[i]?|jul[i]?|aug|sep|okt|nov|dec)\.?/i,
  wide: /^(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/i
};
var parseMonthPatterns69 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns69 = {
  narrow: /^[smtofl]/i,
  short: /^(sö|må|ti|on|to|fr|lö)/i,
  abbreviated: /^(sön|mån|tis|ons|tors|fre|lör)/i,
  wide: /^(söndag|måndag|tisdag|onsdag|torsdag|fredag|lördag)/i
};
var parseDayPatterns69 = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns69 = {
  any: /^([fe]\.?\s?m\.?|midn(att)?|midd(ag)?|(på) (morgonen|eftermiddagen|kvällen|natten))/i
};
var parseDayPeriodPatterns69 = {
  any: {
    am: /^f/i,
    pm: /^e/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgon/i,
    afternoon: /eftermiddag/i,
    evening: /kväll/i,
    night: /natt/i
  }
};
var match69 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern69,
    parsePattern: parseOrdinalNumberPattern69,
    valueCallback: function valueCallback136(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns69,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns69,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns69,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns69,
    defaultParseWidth: "any",
    valueCallback: function valueCallback137(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns69,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns69,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns69,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns69,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns69,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns69,
    defaultParseWidth: "any"
  })
};
var match_default70 = match69;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/sv/index.js
var locale80 = {
  code: "sv",
  formatDistance: formatDistance_default71,
  formatLong: formatLong_default78,
  formatRelative: formatRelative_default71,
  localize: localize_default71,
  match: match_default70,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var sv_default = locale80;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/_lib/formatDistance/index.js
function isPluralType2(val) {
  return val.one !== void 0;
}
var formatDistanceLocale70 = {
  lessThanXSeconds: {
    one: {
      default: "ஒரு வினாடிக்கு குறைவாக",
      in: "ஒரு வினாடிக்குள்",
      ago: "ஒரு வினாடிக்கு முன்பு"
    },
    other: {
      default: "{{count}} வினாடிகளுக்கு குறைவாக",
      in: "{{count}} வினாடிகளுக்குள்",
      ago: "{{count}} வினாடிகளுக்கு முன்பு"
    }
  },
  xSeconds: {
    one: {
      default: "1 வினாடி",
      in: "1 வினாடியில்",
      ago: "1 வினாடி முன்பு"
    },
    other: {
      default: "{{count}} விநாடிகள்",
      in: "{{count}} வினாடிகளில்",
      ago: "{{count}} விநாடிகளுக்கு முன்பு"
    }
  },
  halfAMinute: {
    default: "அரை நிமிடம்",
    in: "அரை நிமிடத்தில்",
    ago: "அரை நிமிடம் முன்பு"
  },
  lessThanXMinutes: {
    one: {
      default: "ஒரு நிமிடத்திற்கும் குறைவாக",
      in: "ஒரு நிமிடத்திற்குள்",
      ago: "ஒரு நிமிடத்திற்கு முன்பு"
    },
    other: {
      default: "{{count}} நிமிடங்களுக்கும் குறைவாக",
      in: "{{count}} நிமிடங்களுக்குள்",
      ago: "{{count}} நிமிடங்களுக்கு முன்பு"
    }
  },
  xMinutes: {
    one: {
      default: "1 நிமிடம்",
      in: "1 நிமிடத்தில்",
      ago: "1 நிமிடம் முன்பு"
    },
    other: {
      default: "{{count}} நிமிடங்கள்",
      in: "{{count}} நிமிடங்களில்",
      ago: "{{count}} நிமிடங்களுக்கு முன்பு"
    }
  },
  aboutXHours: {
    one: {
      default: "சுமார் 1 மணி நேரம்",
      in: "சுமார் 1 மணி நேரத்தில்",
      ago: "சுமார் 1 மணி நேரத்திற்கு முன்பு"
    },
    other: {
      default: "சுமார் {{count}} மணி நேரம்",
      in: "சுமார் {{count}} மணி நேரத்திற்கு முன்பு",
      ago: "சுமார் {{count}} மணி நேரத்தில்"
    }
  },
  xHours: {
    one: {
      default: "1 மணி நேரம்",
      in: "1 மணி நேரத்தில்",
      ago: "1 மணி நேரத்திற்கு முன்பு"
    },
    other: {
      default: "{{count}} மணி நேரம்",
      in: "{{count}} மணி நேரத்தில்",
      ago: "{{count}} மணி நேரத்திற்கு முன்பு"
    }
  },
  xDays: {
    one: {
      default: "1 நாள்",
      in: "1 நாளில்",
      ago: "1 நாள் முன்பு"
    },
    other: {
      default: "{{count}} நாட்கள்",
      in: "{{count}} நாட்களில்",
      ago: "{{count}} நாட்களுக்கு முன்பு"
    }
  },
  aboutXWeeks: {
    one: {
      default: "சுமார் 1 வாரம்",
      in: "சுமார் 1 வாரத்தில்",
      ago: "சுமார் 1 வாரம் முன்பு"
    },
    other: {
      default: "சுமார் {{count}} வாரங்கள்",
      in: "சுமார் {{count}} வாரங்களில்",
      ago: "சுமார் {{count}} வாரங்களுக்கு முன்பு"
    }
  },
  xWeeks: {
    one: {
      default: "1 வாரம்",
      in: "1 வாரத்தில்",
      ago: "1 வாரம் முன்பு"
    },
    other: {
      default: "{{count}} வாரங்கள்",
      in: "{{count}} வாரங்களில்",
      ago: "{{count}} வாரங்களுக்கு முன்பு"
    }
  },
  aboutXMonths: {
    one: {
      default: "சுமார் 1 மாதம்",
      in: "சுமார் 1 மாதத்தில்",
      ago: "சுமார் 1 மாதத்திற்கு முன்பு"
    },
    other: {
      default: "சுமார் {{count}} மாதங்கள்",
      in: "சுமார் {{count}} மாதங்களில்",
      ago: "சுமார் {{count}} மாதங்களுக்கு முன்பு"
    }
  },
  xMonths: {
    one: {
      default: "1 மாதம்",
      in: "1 மாதத்தில்",
      ago: "1 மாதம் முன்பு"
    },
    other: {
      default: "{{count}} மாதங்கள்",
      in: "{{count}} மாதங்களில்",
      ago: "{{count}} மாதங்களுக்கு முன்பு"
    }
  },
  aboutXYears: {
    one: {
      default: "சுமார் 1 வருடம்",
      in: "சுமார் 1 ஆண்டில்",
      ago: "சுமார் 1 வருடம் முன்பு"
    },
    other: {
      default: "சுமார் {{count}} ஆண்டுகள்",
      in: "சுமார் {{count}} ஆண்டுகளில்",
      ago: "சுமார் {{count}} ஆண்டுகளுக்கு முன்பு"
    }
  },
  xYears: {
    one: {
      default: "1 வருடம்",
      in: "1 ஆண்டில்",
      ago: "1 வருடம் முன்பு"
    },
    other: {
      default: "{{count}} ஆண்டுகள்",
      in: "{{count}} ஆண்டுகளில்",
      ago: "{{count}} ஆண்டுகளுக்கு முன்பு"
    }
  },
  overXYears: {
    one: {
      default: "1 வருடத்திற்கு மேல்",
      in: "1 வருடத்திற்கும் மேலாக",
      ago: "1 வருடம் முன்பு"
    },
    other: {
      default: "{{count}} ஆண்டுகளுக்கும் மேலாக",
      in: "{{count}} ஆண்டுகளில்",
      ago: "{{count}} ஆண்டுகளுக்கு முன்பு"
    }
  },
  almostXYears: {
    one: {
      default: "கிட்டத்தட்ட 1 வருடம்",
      in: "கிட்டத்தட்ட 1 ஆண்டில்",
      ago: "கிட்டத்தட்ட 1 வருடம் முன்பு"
    },
    other: {
      default: "கிட்டத்தட்ட {{count}} ஆண்டுகள்",
      in: "கிட்டத்தட்ட {{count}} ஆண்டுகளில்",
      ago: "கிட்டத்தட்ட {{count}} ஆண்டுகளுக்கு முன்பு"
    }
  }
};
var formatDistance141 = function formatDistance142(token, count, options) {
  var tense = options !== null && options !== void 0 && options.addSuffix ? options.comparison && options.comparison > 0 ? "in" : "ago" : "default";
  var tokenValue = formatDistanceLocale70[token];
  if (!isPluralType2(tokenValue))
    return tokenValue[tense];
  if (count === 1) {
    return tokenValue.one[tense];
  } else {
    return tokenValue.other[tense].replace("{{count}}", String(count));
  }
};
var formatDistance_default72 = formatDistance141;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/_lib/formatLong/index.js
var dateFormats79 = {
  full: "EEEE, d MMMM, y",
  long: "d MMMM, y",
  medium: "d MMM, y",
  short: "d/M/yy"
};
var timeFormats79 = {
  full: "a h:mm:ss zzzz",
  long: "a h:mm:ss z",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats79 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong79 = {
  date: buildFormatLongFn({
    formats: dateFormats79,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats79,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats79,
    defaultWidth: "full"
  })
};
var formatLong_default79 = formatLong79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/_lib/formatRelative/index.js
var formatRelativeLocale71 = {
  lastWeek: "'கடந்த' eeee p 'மணிக்கு'",
  yesterday: "'நேற்று ' p 'மணிக்கு'",
  today: "'இன்று ' p 'மணிக்கு'",
  tomorrow: "'நாளை ' p 'மணிக்கு'",
  nextWeek: "eeee p 'மணிக்கு'",
  other: "P"
};
var formatRelative141 = function formatRelative142(token, _date, _baseDate, _options) {
  return formatRelativeLocale71[token];
};
var formatRelative_default72 = formatRelative141;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/_lib/localize/index.js
var eraValues71 = {
  narrow: ["கி.மு.", "கி.பி."],
  abbreviated: ["கி.மு.", "கி.பி."],
  // CLDR #1624, #1626
  wide: ["கிறிஸ்துவுக்கு முன்", "அன்னோ டோமினி"]
  // CLDR #1620, #1622
};
var quarterValues71 = {
  // CLDR #1644 - #1647
  narrow: ["1", "2", "3", "4"],
  // CLDR #1636 - #1639
  abbreviated: ["காலா.1", "காலா.2", "காலா.3", "காலா.4"],
  // CLDR #1628 - #1631
  wide: ["ஒன்றாம் காலாண்டு", "இரண்டாம் காலாண்டு", "மூன்றாம் காலாண்டு", "நான்காம் காலாண்டு"]
};
var monthValues71 = {
  // CLDR #700 - #711
  narrow: ["ஜ", "பி", "மா", "ஏ", "மே", "ஜூ", "ஜூ", "ஆ", "செ", "அ", "ந", "டி"],
  // CLDR #1676 - #1687
  abbreviated: ["ஜன.", "பிப்.", "மார்.", "ஏப்.", "மே", "ஜூன்", "ஜூலை", "ஆக.", "செப்.", "அக்.", "நவ.", "டிச."],
  // CLDR #1652 - #1663
  wide: [
    "ஜனவரி",
    // January
    "பிப்ரவரி",
    // February
    "மார்ச்",
    // March
    "ஏப்ரல்",
    // April
    "மே",
    // May
    "ஜூன்",
    // June
    "ஜூலை",
    // July
    "ஆகஸ்ட்",
    // August
    "செப்டம்பர்",
    // September
    "அக்டோபர்",
    // October
    "நவம்பர்",
    // November
    "டிசம்பர்"
    // December
  ]
};
var dayValues71 = {
  // CLDR #1766 - #1772
  narrow: ["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"],
  // CLDR #1752 - #1758
  short: ["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"],
  // CLDR #1738 - #1744
  abbreviated: ["ஞாயி.", "திங்.", "செவ்.", "புத.", "வியா.", "வெள்.", "சனி"],
  // CLDR #1724 - #1730
  wide: [
    "ஞாயிறு",
    // Sunday
    "திங்கள்",
    // Monday
    "செவ்வாய்",
    // Tuesday
    "புதன்",
    // Wednesday
    "வியாழன்",
    // Thursday
    "வெள்ளி",
    // Friday
    "சனி"
    // Saturday
  ]
};
var dayPeriodValues71 = {
  narrow: {
    am: "மு.ப",
    pm: "பி.ப",
    midnight: "நள்.",
    noon: "நண்.",
    morning: "கா.",
    afternoon: "மதி.",
    evening: "மா.",
    night: "இர."
  },
  abbreviated: {
    am: "முற்பகல்",
    pm: "பிற்பகல்",
    midnight: "நள்ளிரவு",
    noon: "நண்பகல்",
    morning: "காலை",
    afternoon: "மதியம்",
    evening: "மாலை",
    night: "இரவு"
  },
  wide: {
    am: "முற்பகல்",
    pm: "பிற்பகல்",
    midnight: "நள்ளிரவு",
    noon: "நண்பகல்",
    morning: "காலை",
    afternoon: "மதியம்",
    evening: "மாலை",
    night: "இரவு"
  }
};
var formattingDayPeriodValues56 = {
  narrow: {
    am: "மு.ப",
    pm: "பி.ப",
    midnight: "நள்.",
    noon: "நண்.",
    morning: "கா.",
    afternoon: "மதி.",
    evening: "மா.",
    night: "இர."
  },
  abbreviated: {
    am: "முற்பகல்",
    pm: "பிற்பகல்",
    midnight: "நள்ளிரவு",
    noon: "நண்பகல்",
    morning: "காலை",
    afternoon: "மதியம்",
    evening: "மாலை",
    night: "இரவு"
  },
  wide: {
    am: "முற்பகல்",
    pm: "பிற்பகல்",
    midnight: "நள்ளிரவு",
    noon: "நண்பகல்",
    morning: "காலை",
    afternoon: "மதியம்",
    evening: "மாலை",
    night: "இரவு"
  }
};
var ordinalNumber141 = function ordinalNumber142(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize71 = {
  ordinalNumber: ordinalNumber141,
  era: buildLocalizeFn({
    values: eraValues71,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues71,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback71(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues71,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues71,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues71,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues56,
    defaultFormattingWidth: "wide"
  })
};
var localize_default72 = localize71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/_lib/match/index.js
var matchOrdinalNumberPattern70 = /^(\d+)(வது)?/i;
var parseOrdinalNumberPattern70 = /\d+/i;
var matchEraPatterns70 = {
  narrow: /^(கி.மு.|கி.பி.)/i,
  abbreviated: /^(கி\.?\s?மு\.?|கி\.?\s?பி\.?)/,
  wide: /^(கிறிஸ்துவுக்கு\sமுன்|அன்னோ\sடோமினி)/i
};
var parseEraPatterns70 = {
  any: [/கி\.?\s?மு\.?/, /கி\.?\s?பி\.?/]
};
var matchQuarterPatterns70 = {
  narrow: /^[1234]/i,
  abbreviated: /^காலா.[1234]/i,
  wide: /^(ஒன்றாம்|இரண்டாம்|மூன்றாம்|நான்காம்) காலாண்டு/i
};
var parseQuarterPatterns70 = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/(1|காலா.1|ஒன்றாம்)/i, /(2|காலா.2|இரண்டாம்)/i, /(3|காலா.3|மூன்றாம்)/i, /(4|காலா.4|நான்காம்)/i]
};
var matchMonthPatterns70 = {
  narrow: /^(ஜ|பி|மா|ஏ|மே|ஜூ|ஆ|செ|அ|ந|டி)$/i,
  abbreviated: /^(ஜன.|பிப்.|மார்.|ஏப்.|மே|ஜூன்|ஜூலை|ஆக.|செப்.|அக்.|நவ.|டிச.)/i,
  wide: /^(ஜனவரி|பிப்ரவரி|மார்ச்|ஏப்ரல்|மே|ஜூன்|ஜூலை|ஆகஸ்ட்|செப்டம்பர்|அக்டோபர்|நவம்பர்|டிசம்பர்)/i
};
var parseMonthPatterns70 = {
  narrow: [/^ஜ$/i, /^பி/i, /^மா/i, /^ஏ/i, /^மே/i, /^ஜூ/i, /^ஜூ/i, /^ஆ/i, /^செ/i, /^அ/i, /^ந/i, /^டி/i],
  any: [/^ஜன/i, /^பி/i, /^மா/i, /^ஏ/i, /^மே/i, /^ஜூன்/i, /^ஜூலை/i, /^ஆ/i, /^செ/i, /^அ/i, /^ந/i, /^டி/i]
};
var matchDayPatterns70 = {
  narrow: /^(ஞா|தி|செ|பு|வி|வெ|ச)/i,
  short: /^(ஞா|தி|செ|பு|வி|வெ|ச)/i,
  abbreviated: /^(ஞாயி.|திங்.|செவ்.|புத.|வியா.|வெள்.|சனி)/i,
  wide: /^(ஞாயிறு|திங்கள்|செவ்வாய்|புதன்|வியாழன்|வெள்ளி|சனி)/i
};
var parseDayPatterns70 = {
  narrow: [/^ஞா/i, /^தி/i, /^செ/i, /^பு/i, /^வி/i, /^வெ/i, /^ச/i],
  any: [/^ஞா/i, /^தி/i, /^செ/i, /^பு/i, /^வி/i, /^வெ/i, /^ச/i]
};
var matchDayPeriodPatterns70 = {
  narrow: /^(மு.ப|பி.ப|நள்|நண்|காலை|மதியம்|மாலை|இரவு)/i,
  any: /^(மு.ப|பி.ப|முற்பகல்|பிற்பகல்|நள்ளிரவு|நண்பகல்|காலை|மதியம்|மாலை|இரவு)/i
};
var parseDayPeriodPatterns70 = {
  any: {
    am: /^மு/i,
    pm: /^பி/i,
    midnight: /^நள்/i,
    noon: /^நண்/i,
    morning: /காலை/i,
    afternoon: /மதியம்/i,
    evening: /மாலை/i,
    night: /இரவு/i
  }
};
var match70 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern70,
    parsePattern: parseOrdinalNumberPattern70,
    valueCallback: function valueCallback138(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns70,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns70,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns70,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns70,
    defaultParseWidth: "any",
    valueCallback: function valueCallback139(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns70,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns70,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns70,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns70,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns70,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns70,
    defaultParseWidth: "any"
  })
};
var match_default71 = match70;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ta/index.js
var locale81 = {
  code: "ta",
  formatDistance: formatDistance_default72,
  formatLong: formatLong_default79,
  formatRelative: formatRelative_default72,
  localize: localize_default72,
  match: match_default71,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var ta_default = locale81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/_lib/formatDistance/index.js
var formatDistanceLocale71 = {
  lessThanXSeconds: {
    standalone: {
      one: "సెకను కన్నా తక్కువ",
      other: "{{count}} సెకన్ల కన్నా తక్కువ"
    },
    withPreposition: {
      one: "సెకను",
      other: "{{count}} సెకన్ల"
    }
  },
  xSeconds: {
    standalone: {
      one: "ఒక సెకను",
      // CLDR #1314
      other: "{{count}} సెకన్ల"
    },
    withPreposition: {
      one: "ఒక సెకను",
      other: "{{count}} సెకన్ల"
    }
  },
  halfAMinute: {
    standalone: "అర నిమిషం",
    withPreposition: "అర నిమిషం"
  },
  lessThanXMinutes: {
    standalone: {
      one: "ఒక నిమిషం కన్నా తక్కువ",
      other: "{{count}} నిమిషాల కన్నా తక్కువ"
    },
    withPreposition: {
      one: "ఒక నిమిషం",
      other: "{{count}} నిమిషాల"
    }
  },
  xMinutes: {
    standalone: {
      one: "ఒక నిమిషం",
      // CLDR #1311
      other: "{{count}} నిమిషాలు"
    },
    withPreposition: {
      one: "ఒక నిమిషం",
      // CLDR #1311
      other: "{{count}} నిమిషాల"
    }
  },
  aboutXHours: {
    standalone: {
      one: "సుమారు ఒక గంట",
      other: "సుమారు {{count}} గంటలు"
    },
    withPreposition: {
      one: "సుమారు ఒక గంట",
      other: "సుమారు {{count}} గంటల"
    }
  },
  xHours: {
    standalone: {
      one: "ఒక గంట",
      // CLDR #1308
      other: "{{count}} గంటలు"
    },
    withPreposition: {
      one: "ఒక గంట",
      other: "{{count}} గంటల"
    }
  },
  xDays: {
    standalone: {
      one: "ఒక రోజు",
      // CLDR #1292
      other: "{{count}} రోజులు"
    },
    withPreposition: {
      one: "ఒక రోజు",
      other: "{{count}} రోజుల"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "సుమారు ఒక వారం",
      other: "సుమారు {{count}} వారాలు"
    },
    withPreposition: {
      one: "సుమారు ఒక వారం",
      other: "సుమారు {{count}} వారాలల"
    }
  },
  xWeeks: {
    standalone: {
      one: "ఒక వారం",
      other: "{{count}} వారాలు"
    },
    withPreposition: {
      one: "ఒక వారం",
      other: "{{count}} వారాలల"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "సుమారు ఒక నెల",
      other: "సుమారు {{count}} నెలలు"
    },
    withPreposition: {
      one: "సుమారు ఒక నెల",
      other: "సుమారు {{count}} నెలల"
    }
  },
  xMonths: {
    standalone: {
      one: "ఒక నెల",
      // CLDR #1281
      other: "{{count}} నెలలు"
    },
    withPreposition: {
      one: "ఒక నెల",
      other: "{{count}} నెలల"
    }
  },
  aboutXYears: {
    standalone: {
      one: "సుమారు ఒక సంవత్సరం",
      other: "సుమారు {{count}} సంవత్సరాలు"
    },
    withPreposition: {
      one: "సుమారు ఒక సంవత్సరం",
      other: "సుమారు {{count}} సంవత్సరాల"
    }
  },
  xYears: {
    standalone: {
      one: "ఒక సంవత్సరం",
      // CLDR #1275
      other: "{{count}} సంవత్సరాలు"
    },
    withPreposition: {
      one: "ఒక సంవత్సరం",
      other: "{{count}} సంవత్సరాల"
    }
  },
  overXYears: {
    standalone: {
      one: "ఒక సంవత్సరం పైగా",
      other: "{{count}} సంవత్సరాలకు పైగా"
    },
    withPreposition: {
      one: "ఒక సంవత్సరం",
      other: "{{count}} సంవత్సరాల"
    }
  },
  almostXYears: {
    standalone: {
      one: "దాదాపు ఒక సంవత్సరం",
      other: "దాదాపు {{count}} సంవత్సరాలు"
    },
    withPreposition: {
      one: "దాదాపు ఒక సంవత్సరం",
      other: "దాదాపు {{count}} సంవత్సరాల"
    }
  }
};
var formatDistance143 = function formatDistance144(token, count, options) {
  var result;
  var tokenValue = options !== null && options !== void 0 && options.addSuffix ? formatDistanceLocale71[token].withPreposition : formatDistanceLocale71[token].standalone;
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "లో";
    } else {
      return result + " క్రితం";
    }
  }
  return result;
};
var formatDistance_default73 = formatDistance143;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/_lib/formatLong/index.js
var dateFormats80 = {
  full: "d, MMMM y, EEEE",
  long: "d MMMM, y",
  medium: "d MMM, y",
  short: "dd-MM-yy"
};
var timeFormats80 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats80 = {
  full: "{{date}} {{time}}'కి'",
  long: "{{date}} {{time}}'కి'",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong80 = {
  date: buildFormatLongFn({
    formats: dateFormats80,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats80,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats80,
    defaultWidth: "full"
  })
};
var formatLong_default80 = formatLong80;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/_lib/formatRelative/index.js
var formatRelativeLocale72 = {
  lastWeek: "'గత' eeee p",
  // CLDR #1384
  yesterday: "'నిన్న' p",
  // CLDR #1393
  today: "'ఈ రోజు' p",
  // CLDR #1394
  tomorrow: "'రేపు' p",
  // CLDR #1395
  nextWeek: "'తదుపరి' eeee p",
  // CLDR #1386
  other: "P"
};
var formatRelative143 = function formatRelative144(token, _date, _baseDate, _options) {
  return formatRelativeLocale72[token];
};
var formatRelative_default73 = formatRelative143;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/_lib/localize/index.js
var eraValues72 = {
  narrow: ["క్రీ.పూ.", "క్రీ.శ."],
  abbreviated: ["క్రీ.పూ.", "క్రీ.శ."],
  wide: ["క్రీస్తు పూర్వం", "క్రీస్తుశకం"]
};
var quarterValues72 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["త్రై1", "త్రై2", "త్రై3", "త్రై4"],
  wide: ["1వ త్రైమాసికం", "2వ త్రైమాసికం", "3వ త్రైమాసికం", "4వ త్రైమాసికం"]
};
var monthValues72 = {
  narrow: ["జ", "ఫి", "మా", "ఏ", "మే", "జూ", "జు", "ఆ", "సె", "అ", "న", "డి"],
  abbreviated: ["జన", "ఫిబ్ర", "మార్చి", "ఏప్రి", "మే", "జూన్", "జులై", "ఆగ", "సెప్టెం", "అక్టో", "నవం", "డిసెం"],
  wide: ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"]
};
var dayValues72 = {
  narrow: ["ఆ", "సో", "మ", "బు", "గు", "శు", "శ"],
  short: ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"],
  abbreviated: ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"],
  wide: ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"]
};
var dayPeriodValues72 = {
  narrow: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  },
  abbreviated: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  },
  wide: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  }
};
var formattingDayPeriodValues57 = {
  narrow: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  },
  abbreviated: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  },
  wide: {
    am: "పూర్వాహ్నం",
    pm: "అపరాహ్నం",
    midnight: "అర్ధరాత్రి",
    noon: "మిట్టమధ్యాహ్నం",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి"
  }
};
var ordinalNumber143 = function ordinalNumber144(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "వ";
};
var localize72 = {
  ordinalNumber: ordinalNumber143,
  era: buildLocalizeFn({
    values: eraValues72,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues72,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback72(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues72,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues72,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues72,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues57,
    defaultFormattingWidth: "wide"
  })
};
var localize_default73 = localize72;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/_lib/match/index.js
var matchOrdinalNumberPattern71 = /^(\d+)(వ)?/i;
var parseOrdinalNumberPattern71 = /\d+/i;
var matchEraPatterns71 = {
  narrow: /^(క్రీ\.పూ\.|క్రీ\.శ\.)/i,
  abbreviated: /^(క్రీ\.?\s?పూ\.?|ప్ర\.?\s?శ\.?\s?పూ\.?|క్రీ\.?\s?శ\.?|సా\.?\s?శ\.?)/i,
  wide: /^(క్రీస్తు పూర్వం|ప్రస్తుత శకానికి పూర్వం|క్రీస్తు శకం|ప్రస్తుత శకం)/i
};
var parseEraPatterns71 = {
  any: [/^(పూ|శ)/i, /^సా/i]
};
var matchQuarterPatterns71 = {
  narrow: /^[1234]/i,
  abbreviated: /^త్రై[1234]/i,
  wide: /^[1234](వ)? త్రైమాసికం/i
};
var parseQuarterPatterns71 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns71 = {
  narrow: /^(జూ|జు|జ|ఫి|మా|ఏ|మే|ఆ|సె|అ|న|డి)/i,
  abbreviated: /^(జన|ఫిబ్ర|మార్చి|ఏప్రి|మే|జూన్|జులై|ఆగ|సెప్|అక్టో|నవ|డిసె)/i,
  wide: /^(జనవరి|ఫిబ్రవరి|మార్చి|ఏప్రిల్|మే|జూన్|జులై|ఆగస్టు|సెప్టెంబర్|అక్టోబర్|నవంబర్|డిసెంబర్)/i
};
var parseMonthPatterns71 = {
  narrow: [/^జ/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూ/i, /^జు/i, /^ఆ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i],
  any: [/^జన/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూన్/i, /^జులై/i, /^ఆగ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i]
};
var matchDayPatterns71 = {
  narrow: /^(ఆ|సో|మ|బు|గు|శు|శ)/i,
  short: /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  abbreviated: /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  wide: /^(ఆదివారం|సోమవారం|మంగళవారం|బుధవారం|గురువారం|శుక్రవారం|శనివారం)/i
};
var parseDayPatterns71 = {
  narrow: [/^ఆ/i, /^సో/i, /^మ/i, /^బు/i, /^గు/i, /^శు/i, /^శ/i],
  any: [/^ఆది/i, /^సోమ/i, /^మం/i, /^బుధ/i, /^గురు/i, /^శుక్ర/i, /^శని/i]
};
var matchDayPeriodPatterns71 = {
  narrow: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i,
  any: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i
};
var parseDayPeriodPatterns71 = {
  any: {
    am: /^పూర్వాహ్నం/i,
    pm: /^అపరాహ్నం/i,
    midnight: /^అర్ధ/i,
    noon: /^మిట్ట/i,
    morning: /ఉదయం/i,
    afternoon: /మధ్యాహ్నం/i,
    evening: /సాయంత్రం/i,
    night: /రాత్రి/i
  }
};
var match71 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern71,
    parsePattern: parseOrdinalNumberPattern71,
    valueCallback: function valueCallback140(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns71,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns71,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns71,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns71,
    defaultParseWidth: "any",
    valueCallback: function valueCallback141(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns71,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns71,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns71,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns71,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns71,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns71,
    defaultParseWidth: "any"
  })
};
var match_default72 = match71;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/te/index.js
var locale82 = {
  code: "te",
  formatDistance: formatDistance_default73,
  formatLong: formatLong_default80,
  formatRelative: formatRelative_default73,
  localize: localize_default73,
  match: match_default72,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var te_default = locale82;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/_lib/formatDistance/index.js
var formatDistanceLocale72 = {
  lessThanXSeconds: {
    one: "น้อยกว่า 1 วินาที",
    other: "น้อยกว่า {{count}} วินาที"
  },
  xSeconds: {
    one: "1 วินาที",
    other: "{{count}} วินาที"
  },
  halfAMinute: "ครึ่งนาที",
  lessThanXMinutes: {
    one: "น้อยกว่า 1 นาที",
    other: "น้อยกว่า {{count}} นาที"
  },
  xMinutes: {
    one: "1 นาที",
    other: "{{count}} นาที"
  },
  aboutXHours: {
    one: "ประมาณ 1 ชั่วโมง",
    other: "ประมาณ {{count}} ชั่วโมง"
  },
  xHours: {
    one: "1 ชั่วโมง",
    other: "{{count}} ชั่วโมง"
  },
  xDays: {
    one: "1 วัน",
    other: "{{count}} วัน"
  },
  aboutXWeeks: {
    one: "ประมาณ 1 สัปดาห์",
    other: "ประมาณ {{count}} สัปดาห์"
  },
  xWeeks: {
    one: "1 สัปดาห์",
    other: "{{count}} สัปดาห์"
  },
  aboutXMonths: {
    one: "ประมาณ 1 เดือน",
    other: "ประมาณ {{count}} เดือน"
  },
  xMonths: {
    one: "1 เดือน",
    other: "{{count}} เดือน"
  },
  aboutXYears: {
    one: "ประมาณ 1 ปี",
    other: "ประมาณ {{count}} ปี"
  },
  xYears: {
    one: "1 ปี",
    other: "{{count}} ปี"
  },
  overXYears: {
    one: "มากกว่า 1 ปี",
    other: "มากกว่า {{count}} ปี"
  },
  almostXYears: {
    one: "เกือบ 1 ปี",
    other: "เกือบ {{count}} ปี"
  }
};
var formatDistance145 = function formatDistance146(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale72[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      if (token === "halfAMinute") {
        return "ใน" + result;
      } else {
        return "ใน " + result;
      }
    } else {
      return result + "ที่ผ่านมา";
    }
  }
  return result;
};
var formatDistance_default74 = formatDistance145;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/_lib/formatLong/index.js
var dateFormats81 = {
  full: "วันEEEEที่ do MMMM y",
  long: "do MMMM y",
  medium: "d MMM y",
  short: "dd/MM/yyyy"
};
var timeFormats81 = {
  full: "H:mm:ss น. zzzz",
  long: "H:mm:ss น. z",
  medium: "H:mm:ss น.",
  short: "H:mm น."
};
var dateTimeFormats81 = {
  full: "{{date}} 'เวลา' {{time}}",
  long: "{{date}} 'เวลา' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong81 = {
  date: buildFormatLongFn({
    formats: dateFormats81,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats81,
    defaultWidth: "medium"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats81,
    defaultWidth: "full"
  })
};
var formatLong_default81 = formatLong81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/_lib/formatRelative/index.js
var formatRelativeLocale73 = {
  lastWeek: "eeee'ที่แล้วเวลา' p",
  yesterday: "'เมื่อวานนี้เวลา' p",
  today: "'วันนี้เวลา' p",
  tomorrow: "'พรุ่งนี้เวลา' p",
  nextWeek: "eeee 'เวลา' p",
  other: "P"
};
var formatRelative145 = function formatRelative146(token, _date, _baseDate, _options) {
  return formatRelativeLocale73[token];
};
var formatRelative_default74 = formatRelative145;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/_lib/localize/index.js
var eraValues73 = {
  narrow: ["B", "คศ"],
  abbreviated: ["BC", "ค.ศ."],
  wide: ["ปีก่อนคริสตกาล", "คริสต์ศักราช"]
};
var quarterValues73 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["ไตรมาสแรก", "ไตรมาสที่สอง", "ไตรมาสที่สาม", "ไตรมาสที่สี่"]
};
var dayValues73 = {
  narrow: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  short: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  abbreviated: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  wide: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
};
var monthValues73 = {
  narrow: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
  abbreviated: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
  wide: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
};
var dayPeriodValues73 = {
  narrow: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  },
  abbreviated: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  },
  wide: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "เช้า",
    afternoon: "บ่าย",
    evening: "เย็น",
    night: "กลางคืน"
  }
};
var formattingDayPeriodValues58 = {
  narrow: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  },
  abbreviated: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  },
  wide: {
    am: "ก่อนเที่ยง",
    pm: "หลังเที่ยง",
    midnight: "เที่ยงคืน",
    noon: "เที่ยง",
    morning: "ตอนเช้า",
    afternoon: "ตอนกลางวัน",
    evening: "ตอนเย็น",
    night: "ตอนกลางคืน"
  }
};
var ordinalNumber145 = function ordinalNumber146(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize73 = {
  ordinalNumber: ordinalNumber145,
  era: buildLocalizeFn({
    values: eraValues73,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues73,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback73(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues73,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues73,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues73,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues58,
    defaultFormattingWidth: "wide"
  })
};
var localize_default74 = localize73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/_lib/match/index.js
var matchOrdinalNumberPattern72 = /^\d+/i;
var parseOrdinalNumberPattern72 = /\d+/i;
var matchEraPatterns72 = {
  narrow: /^([bB]|[aA]|คศ)/i,
  abbreviated: /^([bB]\.?\s?[cC]\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?|ค\.?ศ\.?)/i,
  wide: /^(ก่อนคริสตกาล|คริสต์ศักราช|คริสตกาล)/i
};
var parseEraPatterns72 = {
  any: [/^[bB]/i, /^(^[aA]|ค\.?ศ\.?|คริสตกาล|คริสต์ศักราช|)/i]
};
var matchQuarterPatterns72 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^ไตรมาส(ที่)? ?[1234]/i
};
var parseQuarterPatterns72 = {
  any: [/(1|แรก|หนึ่ง)/i, /(2|สอง)/i, /(3|สาม)/i, /(4|สี่)/i]
};
var matchMonthPatterns72 = {
  narrow: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?)/i,
  abbreviated: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?')/i,
  wide: /^(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/i
};
var parseMonthPatterns72 = {
  wide: [/^มก/i, /^กุม/i, /^มี/i, /^เม/i, /^พฤษ/i, /^มิ/i, /^กรก/i, /^ส/i, /^กัน/i, /^ต/i, /^พฤศ/i, /^ธ/i],
  any: [/^ม\.?ค\.?/i, /^ก\.?พ\.?/i, /^มี\.?ค\.?/i, /^เม\.?ย\.?/i, /^พ\.?ค\.?/i, /^มิ\.?ย\.?/i, /^ก\.?ค\.?/i, /^ส\.?ค\.?/i, /^ก\.?ย\.?/i, /^ต\.?ค\.?/i, /^พ\.?ย\.?/i, /^ธ\.?ค\.?/i]
};
var matchDayPatterns72 = {
  narrow: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  short: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  abbreviated: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  wide: /^(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|ศุกร์|เสาร์)/i
};
var parseDayPatterns72 = {
  wide: [/^อา/i, /^จั/i, /^อั/i, /^พุธ/i, /^พฤ/i, /^ศ/i, /^เส/i],
  any: [/^อา/i, /^จ/i, /^อ/i, /^พ(?!ฤ)/i, /^พฤ/i, /^ศ/i, /^ส/i]
};
var matchDayPeriodPatterns72 = {
  any: /^(ก่อนเที่ยง|หลังเที่ยง|เที่ยงคืน|เที่ยง|(ตอน.*?)?.*(เที่ยง|เช้า|บ่าย|เย็น|กลางคืน))/i
};
var parseDayPeriodPatterns72 = {
  any: {
    am: /^ก่อนเที่ยง/i,
    pm: /^หลังเที่ยง/i,
    midnight: /^เที่ยงคืน/i,
    noon: /^เที่ยง/i,
    morning: /เช้า/i,
    afternoon: /บ่าย/i,
    evening: /เย็น/i,
    night: /กลางคืน/i
  }
};
var match72 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern72,
    parsePattern: parseOrdinalNumberPattern72,
    valueCallback: function valueCallback142(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns72,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns72,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns72,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns72,
    defaultParseWidth: "any",
    valueCallback: function valueCallback143(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns72,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns72,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns72,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns72,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns72,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns72,
    defaultParseWidth: "any"
  })
};
var match_default73 = match72;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/th/index.js
var locale83 = {
  code: "th",
  formatDistance: formatDistance_default74,
  formatLong: formatLong_default81,
  formatRelative: formatRelative_default74,
  localize: localize_default74,
  match: match_default73,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var th_default = locale83;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/_lib/formatDistance/index.js
var formatDistanceLocale73 = {
  lessThanXSeconds: {
    one: "bir saniyeden az",
    other: "{{count}} saniyeden az"
  },
  xSeconds: {
    one: "1 saniye",
    other: "{{count}} saniye"
  },
  halfAMinute: "yarım dakika",
  lessThanXMinutes: {
    one: "bir dakikadan az",
    other: "{{count}} dakikadan az"
  },
  xMinutes: {
    one: "1 dakika",
    other: "{{count}} dakika"
  },
  aboutXHours: {
    one: "yaklaşık 1 saat",
    other: "yaklaşık {{count}} saat"
  },
  xHours: {
    one: "1 saat",
    other: "{{count}} saat"
  },
  xDays: {
    one: "1 gün",
    other: "{{count}} gün"
  },
  aboutXWeeks: {
    one: "yaklaşık 1 hafta",
    other: "yaklaşık {{count}} hafta"
  },
  xWeeks: {
    one: "1 hafta",
    other: "{{count}} hafta"
  },
  aboutXMonths: {
    one: "yaklaşık 1 ay",
    other: "yaklaşık {{count}} ay"
  },
  xMonths: {
    one: "1 ay",
    other: "{{count}} ay"
  },
  aboutXYears: {
    one: "yaklaşık 1 yıl",
    other: "yaklaşık {{count}} yıl"
  },
  xYears: {
    one: "1 yıl",
    other: "{{count}} yıl"
  },
  overXYears: {
    one: "1 yıldan fazla",
    other: "{{count}} yıldan fazla"
  },
  almostXYears: {
    one: "neredeyse 1 yıl",
    other: "neredeyse {{count}} yıl"
  }
};
var formatDistance147 = function formatDistance148(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale73[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " sonra";
    } else {
      return result + " önce";
    }
  }
  return result;
};
var formatDistance_default75 = formatDistance147;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/_lib/formatLong/index.js
var dateFormats82 = {
  full: "d MMMM y EEEE",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd.MM.yyyy"
};
var timeFormats82 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats82 = {
  full: "{{date}} 'saat' {{time}}",
  long: "{{date}} 'saat' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong82 = {
  date: buildFormatLongFn({
    formats: dateFormats82,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats82,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats82,
    defaultWidth: "full"
  })
};
var formatLong_default82 = formatLong82;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/_lib/formatRelative/index.js
var formatRelativeLocale74 = {
  lastWeek: "'geçen hafta' eeee 'saat' p",
  yesterday: "'dün saat' p",
  today: "'bugün saat' p",
  tomorrow: "'yarın saat' p",
  nextWeek: "eeee 'saat' p",
  other: "P"
};
var formatRelative147 = function formatRelative148(token, _date, _baseDate, _options) {
  return formatRelativeLocale74[token];
};
var formatRelative_default75 = formatRelative147;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/_lib/localize/index.js
var eraValues74 = {
  narrow: ["MÖ", "MS"],
  abbreviated: ["MÖ", "MS"],
  wide: ["Milattan Önce", "Milattan Sonra"]
};
var quarterValues74 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1Ç", "2Ç", "3Ç", "4Ç"],
  wide: ["İlk çeyrek", "İkinci Çeyrek", "Üçüncü çeyrek", "Son çeyrek"]
};
var monthValues74 = {
  narrow: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
  abbreviated: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  wide: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
};
var dayValues74 = {
  narrow: ["P", "P", "S", "Ç", "P", "C", "C"],
  short: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
  abbreviated: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"],
  wide: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
};
var dayPeriodValues74 = {
  narrow: {
    am: "öö",
    pm: "ös",
    midnight: "gy",
    noon: "ö",
    morning: "sa",
    afternoon: "ös",
    evening: "ak",
    night: "ge"
  },
  abbreviated: {
    am: "ÖÖ",
    pm: "ÖS",
    midnight: "gece yarısı",
    noon: "öğle",
    morning: "sabah",
    afternoon: "öğleden sonra",
    evening: "akşam",
    night: "gece"
  },
  wide: {
    am: "Ö.Ö.",
    pm: "Ö.S.",
    midnight: "gece yarısı",
    noon: "öğle",
    morning: "sabah",
    afternoon: "öğleden sonra",
    evening: "akşam",
    night: "gece"
  }
};
var formattingDayPeriodValues59 = {
  narrow: {
    am: "öö",
    pm: "ös",
    midnight: "gy",
    noon: "ö",
    morning: "sa",
    afternoon: "ös",
    evening: "ak",
    night: "ge"
  },
  abbreviated: {
    am: "ÖÖ",
    pm: "ÖS",
    midnight: "gece yarısı",
    noon: "öğlen",
    morning: "sabahleyin",
    afternoon: "öğleden sonra",
    evening: "akşamleyin",
    night: "geceleyin"
  },
  wide: {
    am: "ö.ö.",
    pm: "ö.s.",
    midnight: "gece yarısı",
    noon: "öğlen",
    morning: "sabahleyin",
    afternoon: "öğleden sonra",
    evening: "akşamleyin",
    night: "geceleyin"
  }
};
var ordinalNumber147 = function ordinalNumber148(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + ".";
};
var localize74 = {
  ordinalNumber: ordinalNumber147,
  era: buildLocalizeFn({
    values: eraValues74,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues74,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback74(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues74,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues74,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues74,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues59,
    defaultFormattingWidth: "wide"
  })
};
var localize_default75 = localize74;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/_lib/match/index.js
var matchOrdinalNumberPattern73 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern73 = /\d+/i;
var matchEraPatterns73 = {
  narrow: /^(mö|ms)/i,
  abbreviated: /^(mö|ms)/i,
  wide: /^(milattan önce|milattan sonra)/i
};
var parseEraPatterns73 = {
  any: [/(^mö|^milattan önce)/i, /(^ms|^milattan sonra)/i]
};
var matchQuarterPatterns73 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]ç/i,
  wide: /^((i|İ)lk|(i|İ)kinci|üçüncü|son) çeyrek/i
};
var parseQuarterPatterns73 = {
  any: [/1/i, /2/i, /3/i, /4/i],
  abbreviated: [/1ç/i, /2ç/i, /3ç/i, /4ç/i],
  wide: [/^(i|İ)lk çeyrek/i, /(i|İ)kinci çeyrek/i, /üçüncü çeyrek/i, /son çeyrek/i]
};
var matchMonthPatterns73 = {
  narrow: /^[oşmnhtaek]/i,
  abbreviated: /^(oca|şub|mar|nis|may|haz|tem|ağu|eyl|eki|kas|ara)/i,
  wide: /^(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i
};
var parseMonthPatterns73 = {
  narrow: [/^o/i, /^ş/i, /^m/i, /^n/i, /^m/i, /^h/i, /^t/i, /^a/i, /^e/i, /^e/i, /^k/i, /^a/i],
  any: [/^o/i, /^ş/i, /^mar/i, /^n/i, /^may/i, /^h/i, /^t/i, /^ağ/i, /^ey/i, /^ek/i, /^k/i, /^ar/i]
};
var matchDayPatterns73 = {
  narrow: /^[psçc]/i,
  short: /^(pz|pt|sa|ça|pe|cu|ct)/i,
  abbreviated: /^(paz|pzt|sal|çar|per|cum|cts)/i,
  wide: /^(pazar(?!tesi)|pazartesi|salı|çarşamba|perşembe|cuma(?!rtesi)|cumartesi)/i
};
var parseDayPatterns73 = {
  narrow: [/^p/i, /^p/i, /^s/i, /^ç/i, /^p/i, /^c/i, /^c/i],
  any: [/^pz/i, /^pt/i, /^sa/i, /^ça/i, /^pe/i, /^cu/i, /^ct/i],
  wide: [/^pazar(?!tesi)/i, /^pazartesi/i, /^salı/i, /^çarşamba/i, /^perşembe/i, /^cuma(?!rtesi)/i, /^cumartesi/i]
};
var matchDayPeriodPatterns73 = {
  narrow: /^(öö|ös|gy|ö|sa|ös|ak|ge)/i,
  any: /^(ö\.?\s?[ös]\.?|öğleden sonra|gece yarısı|öğle|(sabah|öğ|akşam|gece)(leyin))/i
};
var parseDayPeriodPatterns73 = {
  any: {
    am: /^ö\.?ö\.?/i,
    pm: /^ö\.?s\.?/i,
    midnight: /^(gy|gece yarısı)/i,
    noon: /^öğ/i,
    morning: /^sa/i,
    afternoon: /^öğleden sonra/i,
    evening: /^ak/i,
    night: /^ge/i
  }
};
var match73 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern73,
    parsePattern: parseOrdinalNumberPattern73,
    valueCallback: function valueCallback144(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns73,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns73,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns73,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns73,
    defaultParseWidth: "any",
    valueCallback: function valueCallback145(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns73,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns73,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns73,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns73,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns73,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns73,
    defaultParseWidth: "any"
  })
};
var match_default74 = match73;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/tr/index.js
var locale84 = {
  code: "tr",
  formatDistance: formatDistance_default75,
  formatLong: formatLong_default82,
  formatRelative: formatRelative_default75,
  localize: localize_default75,
  match: match_default74,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var tr_default = locale84;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/_lib/formatDistance/index.js
var formatDistanceLocale74 = {
  lessThanXSeconds: {
    one: "بىر سىكۇنت ئىچىدە",
    other: "سىكۇنت ئىچىدە {{count}}"
  },
  xSeconds: {
    one: "بىر سىكۇنت",
    other: "سىكۇنت {{count}}"
  },
  halfAMinute: "يىرىم مىنۇت",
  lessThanXMinutes: {
    one: "بىر مىنۇت ئىچىدە",
    other: "مىنۇت ئىچىدە {{count}}"
  },
  xMinutes: {
    one: "بىر مىنۇت",
    other: "مىنۇت {{count}}"
  },
  aboutXHours: {
    one: "تەخمىنەن بىر سائەت",
    other: "سائەت {{count}} تەخمىنەن"
  },
  xHours: {
    one: "بىر سائەت",
    other: "سائەت {{count}}"
  },
  xDays: {
    one: "بىر كۈن",
    other: "كۈن {{count}}"
  },
  aboutXWeeks: {
    one: "تەخمىنەن بىرھەپتە",
    other: "ھەپتە {{count}} تەخمىنەن"
  },
  xWeeks: {
    one: "بىرھەپتە",
    other: "ھەپتە {{count}}"
  },
  aboutXMonths: {
    one: "تەخمىنەن بىر ئاي",
    other: "ئاي {{count}} تەخمىنەن"
  },
  xMonths: {
    one: "بىر ئاي",
    other: "ئاي {{count}}"
  },
  aboutXYears: {
    one: "تەخمىنەن بىر يىل",
    other: "يىل {{count}} تەخمىنەن"
  },
  xYears: {
    one: "بىر يىل",
    other: "يىل {{count}}"
  },
  overXYears: {
    one: "بىر يىلدىن ئارتۇق",
    other: "يىلدىن ئارتۇق {{count}}"
  },
  almostXYears: {
    one: "ئاساسەن بىر يىل",
    other: "يىل {{count}} ئاساسەن"
  }
};
var formatDistance149 = function formatDistance150(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale74[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result;
    } else {
      return result + " بولدى";
    }
  }
  return result;
};
var formatDistance_default76 = formatDistance149;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/_lib/formatLong/index.js
var dateFormats83 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats83 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats83 = {
  full: "{{date}} 'دە' {{time}}",
  long: "{{date}} 'دە' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong83 = {
  date: buildFormatLongFn({
    formats: dateFormats83,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats83,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats83,
    defaultWidth: "full"
  })
};
var formatLong_default83 = formatLong83;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/_lib/formatRelative/index.js
var formatRelativeLocale75 = {
  lastWeek: "'ئ‍ۆتكەن' eeee 'دە' p",
  yesterday: "'تۈنۈگۈن دە' p",
  today: "'بۈگۈن دە' p",
  tomorrow: "'ئەتە دە' p",
  nextWeek: "eeee 'دە' p",
  other: "P"
};
var formatRelative149 = function formatRelative150(token, _date, _baseDate, _options) {
  return formatRelativeLocale75[token];
};
var formatRelative_default76 = formatRelative149;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/_lib/localize/index.js
var eraValues75 = {
  narrow: ["ب", "ك"],
  abbreviated: ["ب", "ك"],
  wide: ["مىيلادىدىن بۇرۇن", "مىيلادىدىن كىيىن"]
};
var quarterValues75 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1", "2", "3", "4"],
  wide: ["بىرىنجى چارەك", "ئىككىنجى چارەك", "ئۈچىنجى چارەك", "تۆتىنجى چارەك"]
};
var monthValues75 = {
  narrow: ["ي", "ف", "م", "ا", "م", "ى", "ى", "ا", "س", "ۆ", "ن", "د"],
  abbreviated: ["يانۋار", "فېۋىرال", "مارت", "ئاپرىل", "ماي", "ئىيۇن", "ئىيول", "ئاۋغۇست", "سىنتەبىر", "ئۆكتەبىر", "نويابىر", "دىكابىر"],
  wide: ["يانۋار", "فېۋىرال", "مارت", "ئاپرىل", "ماي", "ئىيۇن", "ئىيول", "ئاۋغۇست", "سىنتەبىر", "ئۆكتەبىر", "نويابىر", "دىكابىر"]
};
var dayValues75 = {
  narrow: ["ي", "د", "س", "چ", "پ", "ج", "ش"],
  short: ["ي", "د", "س", "چ", "پ", "ج", "ش"],
  abbreviated: ["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"],
  wide: ["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"]
};
var dayPeriodValues75 = {
  narrow: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  },
  abbreviated: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  },
  wide: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەن",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشىم",
    night: "كىچە"
  }
};
var formattingDayPeriodValues60 = {
  narrow: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  },
  abbreviated: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  },
  wide: {
    am: "ئە",
    pm: "چ",
    midnight: "ك",
    noon: "چ",
    morning: "ئەتىگەندە",
    afternoon: "چۈشتىن كىيىن",
    evening: "ئاخشامدا",
    night: "كىچىدە"
  }
};
var ordinalNumber149 = function ordinalNumber150(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize75 = {
  ordinalNumber: ordinalNumber149,
  era: buildLocalizeFn({
    values: eraValues75,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues75,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback75(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues75,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues75,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues75,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues60,
    defaultFormattingWidth: "wide"
  })
};
var localize_default76 = localize75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/_lib/match/index.js
var matchOrdinalNumberPattern74 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern74 = /\d+/i;
var matchEraPatterns74 = {
  narrow: /^(ب|ك)/i,
  wide: /^(مىيلادىدىن بۇرۇن|مىيلادىدىن كىيىن)/i
};
var parseEraPatterns74 = {
  any: [/^بۇرۇن/i, /^كىيىن/i]
};
var matchQuarterPatterns74 = {
  narrow: /^[1234]/i,
  abbreviated: /^چ[1234]/i,
  wide: /^چارەك [1234]/i
};
var parseQuarterPatterns74 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns74 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[يفمئامئ‍ئاسۆند]/i,
  abbreviated: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i,
  wide: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i
};
var parseMonthPatterns74 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^ا/i, /^م/i, /^ى‍/i, /^ى‍/i, /^ا‍/i, /^س/i, /^ۆ/i, /^ن/i, /^د/i],
  any: [/^يان/i, /^فېۋ/i, /^مار/i, /^ئاپ/i, /^ماي/i, /^ئىيۇن/i, /^ئىيول/i, /^ئاۋ/i, /^سىن/i, /^ئۆك/i, /^نوي/i, /^دىك/i]
};
var matchDayPatterns74 = {
  narrow: /^[دسچپجشي]/i,
  short: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  abbreviated: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  wide: /^(يەكشەنبە|دۈشەنبە|سەيشەنبە|چارشەنبە|پەيشەنبە|جۈمە|شەنبە)/i
};
var parseDayPatterns74 = {
  narrow: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i]
};
var matchDayPeriodPatterns74 = {
  narrow: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i,
  any: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i
};
var parseDayPeriodPatterns74 = {
  any: {
    am: /^ئە/i,
    pm: /^چ/i,
    midnight: /^ك/i,
    noon: /^چ/i,
    morning: /ئەتىگەن/i,
    afternoon: /چۈشتىن كىيىن/i,
    evening: /ئاخشىم/i,
    night: /كىچە/i
  }
};
var match74 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern74,
    parsePattern: parseOrdinalNumberPattern74,
    valueCallback: function valueCallback146(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns74,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns74,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns74,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns74,
    defaultParseWidth: "any",
    valueCallback: function valueCallback147(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns74,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns74,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns74,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns74,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns74,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns74,
    defaultParseWidth: "any"
  })
};
var match_default75 = match74;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/ug/index.js
var locale85 = {
  code: "ug",
  formatDistance: formatDistance_default76,
  formatLong: formatLong_default83,
  formatRelative: formatRelative_default76,
  localize: localize_default76,
  match: match_default75,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var ug_default = locale85;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/_lib/formatDistance/index.js
function declension7(scheme, count) {
  if (scheme.one !== void 0 && count === 1) {
    return scheme.one;
  }
  var rem10 = count % 10;
  var rem100 = count % 100;
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}
function buildLocalizeTokenFn5(scheme) {
  return function(count, options) {
    if (options && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension7(scheme.future, count);
        } else {
          return "за " + declension7(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension7(scheme.past, count);
        } else {
          return declension7(scheme.regular, count) + " тому";
        }
      }
    } else {
      return declension7(scheme.regular, count);
    }
  };
}
var halfAtMinute = function halfAtMinute2(_, options) {
  if (options && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "за півхвилини";
    } else {
      return "півхвилини тому";
    }
  }
  return "півхвилини";
};
var formatDistanceLocale75 = {
  lessThanXSeconds: buildLocalizeTokenFn5({
    regular: {
      one: "менше секунди",
      singularNominative: "менше {{count}} секунди",
      singularGenitive: "менше {{count}} секунд",
      pluralGenitive: "менше {{count}} секунд"
    },
    future: {
      one: "менше, ніж за секунду",
      singularNominative: "менше, ніж за {{count}} секунду",
      singularGenitive: "менше, ніж за {{count}} секунди",
      pluralGenitive: "менше, ніж за {{count}} секунд"
    }
  }),
  xSeconds: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунди",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду тому",
      singularGenitive: "{{count}} секунди тому",
      pluralGenitive: "{{count}} секунд тому"
    },
    future: {
      singularNominative: "за {{count}} секунду",
      singularGenitive: "за {{count}} секунди",
      pluralGenitive: "за {{count}} секунд"
    }
  }),
  halfAMinute: halfAtMinute,
  lessThanXMinutes: buildLocalizeTokenFn5({
    regular: {
      one: "менше хвилини",
      singularNominative: "менше {{count}} хвилини",
      singularGenitive: "менше {{count}} хвилин",
      pluralGenitive: "менше {{count}} хвилин"
    },
    future: {
      one: "менше, ніж за хвилину",
      singularNominative: "менше, ніж за {{count}} хвилину",
      singularGenitive: "менше, ніж за {{count}} хвилини",
      pluralGenitive: "менше, ніж за {{count}} хвилин"
    }
  }),
  xMinutes: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} хвилина",
      singularGenitive: "{{count}} хвилини",
      pluralGenitive: "{{count}} хвилин"
    },
    past: {
      singularNominative: "{{count}} хвилину тому",
      singularGenitive: "{{count}} хвилини тому",
      pluralGenitive: "{{count}} хвилин тому"
    },
    future: {
      singularNominative: "за {{count}} хвилину",
      singularGenitive: "за {{count}} хвилини",
      pluralGenitive: "за {{count}} хвилин"
    }
  }),
  aboutXHours: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "близько {{count}} години",
      singularGenitive: "близько {{count}} годин",
      pluralGenitive: "близько {{count}} годин"
    },
    future: {
      singularNominative: "приблизно за {{count}} годину",
      singularGenitive: "приблизно за {{count}} години",
      pluralGenitive: "приблизно за {{count}} годин"
    }
  }),
  xHours: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} годину",
      singularGenitive: "{{count}} години",
      pluralGenitive: "{{count}} годин"
    }
  }),
  xDays: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} днi",
      pluralGenitive: "{{count}} днів"
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "близько {{count}} тижня",
      singularGenitive: "близько {{count}} тижнів",
      pluralGenitive: "близько {{count}} тижнів"
    },
    future: {
      singularNominative: "приблизно за {{count}} тиждень",
      singularGenitive: "приблизно за {{count}} тижні",
      pluralGenitive: "приблизно за {{count}} тижнів"
    }
  }),
  xWeeks: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} тиждень",
      singularGenitive: "{{count}} тижні",
      pluralGenitive: "{{count}} тижнів"
    }
  }),
  aboutXMonths: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "близько {{count}} місяця",
      singularGenitive: "близько {{count}} місяців",
      pluralGenitive: "близько {{count}} місяців"
    },
    future: {
      singularNominative: "приблизно за {{count}} місяць",
      singularGenitive: "приблизно за {{count}} місяці",
      pluralGenitive: "приблизно за {{count}} місяців"
    }
  }),
  xMonths: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} місяць",
      singularGenitive: "{{count}} місяці",
      pluralGenitive: "{{count}} місяців"
    }
  }),
  aboutXYears: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "близько {{count}} року",
      singularGenitive: "близько {{count}} років",
      pluralGenitive: "близько {{count}} років"
    },
    future: {
      singularNominative: "приблизно за {{count}} рік",
      singularGenitive: "приблизно за {{count}} роки",
      pluralGenitive: "приблизно за {{count}} років"
    }
  }),
  xYears: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "{{count}} рік",
      singularGenitive: "{{count}} роки",
      pluralGenitive: "{{count}} років"
    }
  }),
  overXYears: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "більше {{count}} року",
      singularGenitive: "більше {{count}} років",
      pluralGenitive: "більше {{count}} років"
    },
    future: {
      singularNominative: "більше, ніж за {{count}} рік",
      singularGenitive: "більше, ніж за {{count}} роки",
      pluralGenitive: "більше, ніж за {{count}} років"
    }
  }),
  almostXYears: buildLocalizeTokenFn5({
    regular: {
      singularNominative: "майже {{count}} рік",
      singularGenitive: "майже {{count}} роки",
      pluralGenitive: "майже {{count}} років"
    },
    future: {
      singularNominative: "майже за {{count}} рік",
      singularGenitive: "майже за {{count}} роки",
      pluralGenitive: "майже за {{count}} років"
    }
  })
};
var formatDistance151 = function formatDistance152(token, count, options) {
  options = options || {};
  return formatDistanceLocale75[token](count, options);
};
var formatDistance_default77 = formatDistance151;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/_lib/formatLong/index.js
var dateFormats84 = {
  full: "EEEE, do MMMM y 'р.'",
  long: "do MMMM y 'р.'",
  medium: "d MMM y 'р.'",
  short: "dd.MM.y"
};
var timeFormats84 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats84 = {
  full: "{{date}} 'о' {{time}}",
  long: "{{date}} 'о' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong84 = {
  date: buildFormatLongFn({
    formats: dateFormats84,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats84,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats84,
    defaultWidth: "full"
  })
};
var formatLong_default84 = formatLong84;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/_lib/formatRelative/index.js
var accusativeWeekdays8 = ["неділю", "понеділок", "вівторок", "середу", "четвер", "п’ятницю", "суботу"];
function lastWeek19(day) {
  var weekday = accusativeWeekdays8[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у минулу " + weekday + " о' p";
    case 1:
    case 2:
    case 4:
      return "'у минулий " + weekday + " о' p";
  }
}
function thisWeek9(day) {
  var weekday = accusativeWeekdays8[day];
  return "'у " + weekday + " о' p";
}
function nextWeek16(day) {
  var weekday = accusativeWeekdays8[day];
  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступну " + weekday + " о' p";
    case 1:
    case 2:
    case 4:
      return "'у наступний " + weekday + " о' p";
  }
}
var lastWeekFormat5 = function lastWeekFormat6(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek9(day);
  } else {
    return lastWeek19(day);
  }
};
var nextWeekFormat5 = function nextWeekFormat6(dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek9(day);
  } else {
    return nextWeek16(day);
  }
};
var formatRelativeLocale76 = {
  lastWeek: lastWeekFormat5,
  yesterday: "'вчора о' p",
  today: "'сьогодні о' p",
  tomorrow: "'завтра о' p",
  nextWeek: nextWeekFormat5,
  other: "P"
};
var formatRelative151 = function formatRelative152(token, date, baseDate, options) {
  var format = formatRelativeLocale76[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default77 = formatRelative151;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/_lib/localize/index.js
var eraValues76 = {
  narrow: ["до н.е.", "н.е."],
  abbreviated: ["до н. е.", "н. е."],
  wide: ["до нашої ери", "нашої ери"]
};
var quarterValues76 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"]
};
var monthValues76 = {
  // ДСТУ 3582:2013
  narrow: ["С", "Л", "Б", "К", "Т", "Ч", "Л", "С", "В", "Ж", "Л", "Г"],
  abbreviated: ["січ.", "лют.", "берез.", "квіт.", "трав.", "черв.", "лип.", "серп.", "верес.", "жовт.", "листоп.", "груд."],
  wide: ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"]
};
var formattingMonthValues18 = {
  narrow: ["С", "Л", "Б", "К", "Т", "Ч", "Л", "С", "В", "Ж", "Л", "Г"],
  abbreviated: ["січ.", "лют.", "берез.", "квіт.", "трав.", "черв.", "лип.", "серп.", "верес.", "жовт.", "листоп.", "груд."],
  wide: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
};
var dayValues76 = {
  narrow: ["Н", "П", "В", "С", "Ч", "П", "С"],
  short: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["нед", "пон", "вів", "сер", "чтв", "птн", "суб"],
  wide: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"]
};
var dayPeriodValues76 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранок",
    afternoon: "день",
    evening: "веч.",
    night: "ніч"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранок",
    afternoon: "день",
    evening: "веч.",
    night: "ніч"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "північ",
    noon: "полудень",
    morning: "ранок",
    afternoon: "день",
    evening: "вечір",
    night: "ніч"
  }
};
var formattingDayPeriodValues61 = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "півн.",
    noon: "пол.",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "північ",
    noon: "полудень",
    morning: "ранку",
    afternoon: "дня",
    evening: "веч.",
    night: "ночі"
  }
};
var ordinalNumber151 = function ordinalNumber152(dirtyNumber, options) {
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  var number = Number(dirtyNumber);
  var suffix;
  if (unit === "date") {
    if (number === 3 || number === 23) {
      suffix = "-є";
    } else {
      suffix = "-е";
    }
  } else if (unit === "minute" || unit === "second" || unit === "hour") {
    suffix = "-а";
  } else {
    suffix = "-й";
  }
  return number + suffix;
};
var localize76 = {
  ordinalNumber: ordinalNumber151,
  era: buildLocalizeFn({
    values: eraValues76,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues76,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback76(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues76,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues18,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues76,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues76,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues61,
    defaultFormattingWidth: "wide"
  })
};
var localize_default77 = localize76;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/_lib/match/index.js
var matchOrdinalNumberPattern75 = /^(\d+)(-?(е|й|є|а|я))?/i;
var parseOrdinalNumberPattern75 = /\d+/i;
var matchEraPatterns75 = {
  narrow: /^((до )?н\.?\s?е\.?)/i,
  abbreviated: /^((до )?н\.?\s?е\.?)/i,
  wide: /^(до нашої ери|нашої ери|наша ера)/i
};
var parseEraPatterns75 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns75 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[иі]?й?)? кв.?/i,
  wide: /^[1234](-?[иі]?й?)? квартал/i
};
var parseQuarterPatterns75 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns75 = {
  narrow: /^[слбктчвжг]/i,
  abbreviated: /^(січ|лют|бер(ез)?|квіт|трав|черв|лип|серп|вер(ес)?|жовт|лис(топ)?|груд)\.?/i,
  wide: /^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|червня|червень|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопад[а]?|грудень|грудня)/i
};
var parseMonthPatterns75 = {
  narrow: [/^с/i, /^л/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^л/i, /^с/i, /^в/i, /^ж/i, /^л/i, /^г/i],
  any: [/^сі/i, /^лю/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^лип/i, /^се/i, /^в/i, /^ж/i, /^лис/i, /^г/i]
};
var matchDayPatterns75 = {
  narrow: /^[нпвсч]/i,
  short: /^(нд|пн|вт|ср|чт|пт|сб)\.?/i,
  abbreviated: /^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,
  wide: /^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i
};
var parseDayPatterns75 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[он]/i, /^в/i, /^с[ер]/i, /^ч/i, /^п\W*?[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns75 = {
  narrow: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  abbreviated: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  wide: /^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i
};
var parseDayPeriodPatterns75 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^півн/i,
    noon: /^пол/i,
    morning: /^р/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match75 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern75,
    parsePattern: parseOrdinalNumberPattern75,
    valueCallback: function valueCallback148(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns75,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns75,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns75,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns75,
    defaultParseWidth: "any",
    valueCallback: function valueCallback149(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns75,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns75,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns75,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns75,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns75,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns75,
    defaultParseWidth: "any"
  })
};
var match_default76 = match75;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uk/index.js
var locale86 = {
  code: "uk",
  formatDistance: formatDistance_default77,
  formatLong: formatLong_default84,
  formatRelative: formatRelative_default77,
  localize: localize_default77,
  match: match_default76,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var uk_default = locale86;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/_lib/formatDistance/index.js
var formatDistanceLocale76 = {
  lessThanXSeconds: {
    one: "sekunddan kam",
    other: "{{count}} sekunddan kam"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekund"
  },
  halfAMinute: "yarim minut",
  lessThanXMinutes: {
    one: "bir minutdan kam",
    other: "{{count}} minutdan kam"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minut"
  },
  aboutXHours: {
    one: "tahminan 1 soat",
    other: "tahminan {{count}} soat"
  },
  xHours: {
    one: "1 soat",
    other: "{{count}} soat"
  },
  xDays: {
    one: "1 kun",
    other: "{{count}} kun"
  },
  aboutXWeeks: {
    one: "tahminan 1 hafta",
    other: "tahminan {{count}} hafta"
  },
  xWeeks: {
    one: "1 hafta",
    other: "{{count}} hafta"
  },
  aboutXMonths: {
    one: "tahminan 1 oy",
    other: "tahminan {{count}} oy"
  },
  xMonths: {
    one: "1 oy",
    other: "{{count}} oy"
  },
  aboutXYears: {
    one: "tahminan 1 yil",
    other: "tahminan {{count}} yil"
  },
  xYears: {
    one: "1 yil",
    other: "{{count}} yil"
  },
  overXYears: {
    one: "1 yildan ko'p",
    other: "{{count}} yildan ko'p"
  },
  almostXYears: {
    one: "deyarli 1 yil",
    other: "deyarli {{count}} yil"
  }
};
var formatDistance153 = function formatDistance154(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale76[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " dan keyin";
    } else {
      return result + " oldin";
    }
  }
  return result;
};
var formatDistance_default78 = formatDistance153;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/_lib/formatLong/index.js
var dateFormats85 = {
  full: "EEEE, do MMMM, y",
  long: "do MMMM, y",
  medium: "d MMM, y",
  short: "dd/MM/yyyy"
};
var timeFormats85 = {
  full: "h:mm:ss zzzz",
  long: "h:mm:ss z",
  medium: "h:mm:ss",
  short: "h:mm"
};
var dateTimeFormats85 = {
  any: "{{date}}, {{time}}"
};
var formatLong85 = {
  date: buildFormatLongFn({
    formats: dateFormats85,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats85,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats85,
    defaultWidth: "any"
  })
};
var formatLong_default85 = formatLong85;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/_lib/formatRelative/index.js
var formatRelativeLocale77 = {
  lastWeek: "'oldingi' eeee p 'da'",
  yesterday: "'kecha' p 'da'",
  today: "'bugun' p 'da'",
  tomorrow: "'ertaga' p 'da'",
  nextWeek: "eeee p 'da'",
  other: "P"
};
var formatRelative153 = function formatRelative154(token, _date, _baseDate, _options) {
  return formatRelativeLocale77[token];
};
var formatRelative_default78 = formatRelative153;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/_lib/localize/index.js
var eraValues77 = {
  narrow: ["M.A", "M."],
  abbreviated: ["M.A", "M."],
  wide: ["Miloddan Avvalgi", "Milodiy"]
};
var quarterValues77 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["CH.1", "CH.2", "CH.3", "CH.4"],
  wide: ["1-chi chorak", "2-chi chorak", "3-chi chorak", "4-chi chorak"]
};
var monthValues77 = {
  narrow: ["Y", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"],
  abbreviated: ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"],
  wide: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"]
};
var dayValues77 = {
  narrow: ["Y", "D", "S", "CH", "P", "J", "SH"],
  short: ["Ya", "Du", "Se", "Cho", "Pa", "Ju", "Sha"],
  abbreviated: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
  wide: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
};
var dayPeriodValues77 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "y.t",
    noon: "p.",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  }
};
var formattingDayPeriodValues62 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "y.t",
    noon: "p.",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "yarim tun",
    noon: "peshin",
    morning: "ertalab",
    afternoon: "tushdan keyin",
    evening: "kechqurun",
    night: "tun"
  }
};
var ordinalNumber153 = function ordinalNumber154(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize77 = {
  ordinalNumber: ordinalNumber153,
  era: buildLocalizeFn({
    values: eraValues77,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues77,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback77(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues77,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues77,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues77,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues62,
    defaultFormattingWidth: "wide"
  })
};
var localize_default78 = localize77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/_lib/match/index.js
var matchOrdinalNumberPattern76 = /^(\d+)(chi)?/i;
var parseOrdinalNumberPattern76 = /\d+/i;
var matchEraPatterns76 = {
  narrow: /^(m\.a|m\.)/i,
  abbreviated: /^(m\.a\.?\s?m\.?)/i,
  wide: /^(miloddan avval|miloddan keyin)/i
};
var parseEraPatterns76 = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns76 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](chi)? chorak/i
};
var parseQuarterPatterns76 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns76 = {
  narrow: /^[yfmasond]/i,
  abbreviated: /^(yan|fev|mar|apr|may|iyun|iyul|avg|sen|okt|noy|dek)/i,
  wide: /^(yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)/i
};
var parseMonthPatterns76 = {
  narrow: [/^y/i, /^f/i, /^m/i, /^a/i, /^m/i, /^i/i, /^i/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ya/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^iyun/i, /^iyul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns76 = {
  narrow: /^[ydschj]/i,
  short: /^(ya|du|se|cho|pa|ju|sha)/i,
  abbreviated: /^(yak|dush|sesh|chor|pay|jum|shan)/i,
  wide: /^(yakshanba|dushanba|seshanba|chorshanba|payshanba|juma|shanba)/i
};
var parseDayPatterns76 = {
  narrow: [/^y/i, /^d/i, /^s/i, /^ch/i, /^p/i, /^j/i, /^sh/i],
  any: [/^ya/i, /^d/i, /^se/i, /^ch/i, /^p/i, /^j/i, /^sh/i]
};
var matchDayPeriodPatterns76 = {
  narrow: /^(a|p|y\.t|p| (ertalab|tushdan keyin|kechqurun|tun))/i,
  any: /^([ap]\.?\s?m\.?|yarim tun|peshin| (ertalab|tushdan keyin|kechqurun|tun))/i
};
var parseDayPeriodPatterns76 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^y\.t/i,
    noon: /^pe/i,
    morning: /ertalab/i,
    afternoon: /tushdan keyin/i,
    evening: /kechqurun/i,
    night: /tun/i
  }
};
var match76 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern76,
    parsePattern: parseOrdinalNumberPattern76,
    valueCallback: function valueCallback150(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns76,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns76,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns76,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns76,
    defaultParseWidth: "any",
    valueCallback: function valueCallback151(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns76,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns76,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns76,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns76,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns76,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns76,
    defaultParseWidth: "any"
  })
};
var match_default77 = match76;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz/index.js
var locale87 = {
  code: "uz",
  formatDistance: formatDistance_default78,
  formatLong: formatLong_default85,
  formatRelative: formatRelative_default78,
  localize: localize_default78,
  match: match_default77,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var uz_default = locale87;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/_lib/formatDistance/index.js
var formatDistanceLocale77 = {
  lessThanXSeconds: {
    one: "1 сониядан кам",
    other: "{{count}} сониядан кам"
  },
  xSeconds: {
    one: "1 сония",
    other: "{{count}} сония"
  },
  halfAMinute: "ярим дақиқа",
  lessThanXMinutes: {
    one: "1 дақиқадан кам",
    other: "{{count}} дақиқадан кам"
  },
  xMinutes: {
    one: "1 дақиқа",
    other: "{{count}} дақиқа"
  },
  aboutXHours: {
    one: "тахминан 1 соат",
    other: "тахминан {{count}} соат"
  },
  xHours: {
    one: "1 соат",
    other: "{{count}} соат"
  },
  xDays: {
    one: "1 кун",
    other: "{{count}} кун"
  },
  aboutXWeeks: {
    one: "тахминан 1 хафта",
    other: "тахминан {{count}} хафта"
  },
  xWeeks: {
    one: "1 хафта",
    other: "{{count}} хафта"
  },
  aboutXMonths: {
    one: "тахминан 1 ой",
    other: "тахминан {{count}} ой"
  },
  xMonths: {
    one: "1 ой",
    other: "{{count}} ой"
  },
  aboutXYears: {
    one: "тахминан 1 йил",
    other: "тахминан {{count}} йил"
  },
  xYears: {
    one: "1 йил",
    other: "{{count}} йил"
  },
  overXYears: {
    one: "1 йилдан кўп",
    other: "{{count}} йилдан кўп"
  },
  almostXYears: {
    one: "деярли 1 йил",
    other: "деярли {{count}} йил"
  }
};
var formatDistance155 = function formatDistance156(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale77[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "дан кейин";
    } else {
      return result + " олдин";
    }
  }
  return result;
};
var formatDistance_default79 = formatDistance155;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/_lib/formatLong/index.js
var dateFormats86 = {
  full: "EEEE, do MMMM, y",
  long: "do MMMM, y",
  medium: "d MMM, y",
  short: "dd/MM/yyyy"
};
var timeFormats86 = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
};
var dateTimeFormats86 = {
  any: "{{date}}, {{time}}"
};
var formatLong86 = {
  date: buildFormatLongFn({
    formats: dateFormats86,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats86,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats86,
    defaultWidth: "any"
  })
};
var formatLong_default86 = formatLong86;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/_lib/formatRelative/index.js
var formatRelativeLocale78 = {
  lastWeek: "'ўтган' eeee p 'да'",
  yesterday: "'кеча' p 'да'",
  today: "'бугун' p 'да'",
  tomorrow: "'эртага' p 'да'",
  nextWeek: "eeee p 'да'",
  other: "P"
};
var formatRelative155 = function formatRelative156(token, _date, _baseDate, _options) {
  return formatRelativeLocale78[token];
};
var formatRelative_default79 = formatRelative155;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/_lib/localize/index.js
var eraValues78 = {
  narrow: ["М.А", "М"],
  abbreviated: ["М.А", "М"],
  wide: ["Милоддан Аввалги", "Милодий"]
};
var quarterValues78 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-чор.", "2-чор.", "3-чор.", "4-чор."],
  wide: ["1-чорак", "2-чорак", "3-чорак", "4-чорак"]
};
var monthValues78 = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  wide: ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентабр", "октабр", "ноябр", "декабр"]
};
var dayValues78 = {
  narrow: ["Я", "Д", "С", "Ч", "П", "Ж", "Ш"],
  short: ["як", "ду", "се", "чо", "па", "жу", "ша"],
  abbreviated: ["якш", "душ", "сеш", "чор", "пай", "жум", "шан"],
  wide: ["якшанба", "душанба", "сешанба", "чоршанба", "пайшанба", "жума", "шанба"]
};
var dayPeriodValues78 = {
  any: {
    am: "П.О.",
    pm: "П.К.",
    midnight: "ярим тун",
    noon: "пешин",
    morning: "эрталаб",
    afternoon: "пешиндан кейин",
    evening: "кечаси",
    night: "тун"
  }
};
var formattingDayPeriodValues63 = {
  any: {
    am: "П.О.",
    pm: "П.К.",
    midnight: "ярим тун",
    noon: "пешин",
    morning: "эрталаб",
    afternoon: "пешиндан кейин",
    evening: "кечаси",
    night: "тун"
  }
};
var ordinalNumber155 = function ordinalNumber156(dirtyNumber, _options) {
  return String(dirtyNumber);
};
var localize78 = {
  ordinalNumber: ordinalNumber155,
  era: buildLocalizeFn({
    values: eraValues78,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues78,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback78(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues78,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues78,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues78,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues63,
    defaultFormattingWidth: "any"
  })
};
var localize_default79 = localize78;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/_lib/match/index.js
var matchOrdinalNumberPattern77 = /^(\d+)(чи)?/i;
var parseOrdinalNumberPattern77 = /\d+/i;
var matchEraPatterns77 = {
  narrow: /^(м\.а|м\.)/i,
  abbreviated: /^(м\.а|м\.)/i,
  wide: /^(милоддан аввал|милоддан кейин)/i
};
var parseEraPatterns77 = {
  any: [/^м/i, /^а/i]
};
var matchQuarterPatterns77 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-чор./i,
  wide: /^[1234]-чорак/i
};
var parseQuarterPatterns77 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns77 = {
  narrow: /^[яфмамииасонд]/i,
  abbreviated: /^(янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек)/i,
  wide: /^(январ|феврал|март|апрел|май|июн|июл|август|сентабр|октабр|ноябр|декабр)/i
};
var parseMonthPatterns77 = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^д/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^май/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns77 = {
  narrow: /^[ядсчпжш]/i,
  short: /^(як|ду|се|чо|па|жу|ша)/i,
  abbreviated: /^(якш|душ|сеш|чор|пай|жум|шан)/i,
  wide: /^(якшанба|душанба|сешанба|чоршанба|пайшанба|жума|шанба)/i
};
var parseDayPatterns77 = {
  narrow: [/^я/i, /^д/i, /^с/i, /^ч/i, /^п/i, /^ж/i, /^ш/i],
  any: [/^як/i, /^ду/i, /^се/i, /^чор/i, /^пай/i, /^жу/i, /^шан/i]
};
var matchDayPeriodPatterns77 = {
  any: /^(п\.о\.|п\.к\.|ярим тун|пешиндан кейин|(эрталаб|пешиндан кейин|кечаси|тун))/i
};
var parseDayPeriodPatterns77 = {
  any: {
    am: /^п\.о\./i,
    pm: /^п\.к\./i,
    midnight: /^ярим тун/i,
    noon: /^пешиндан кейин/i,
    morning: /эрталаб/i,
    afternoon: /пешиндан кейин/i,
    evening: /кечаси/i,
    night: /тун/i
  }
};
var match77 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern77,
    parsePattern: parseOrdinalNumberPattern77,
    valueCallback: function valueCallback152(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns77,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns77,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns77,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns77,
    defaultParseWidth: "any",
    valueCallback: function valueCallback153(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns77,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns77,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns77,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns77,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns77,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns77,
    defaultParseWidth: "any"
  })
};
var match_default78 = match77;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/uz-Cyrl/index.js
var locale88 = {
  code: "uz-Cyrl",
  formatDistance: formatDistance_default79,
  formatLong: formatLong_default86,
  formatRelative: formatRelative_default79,
  localize: localize_default79,
  match: match_default78,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var uz_Cyrl_default = locale88;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/_lib/formatDistance/index.js
var formatDistanceLocale78 = {
  lessThanXSeconds: {
    one: "dưới 1 giây",
    other: "dưới {{count}} giây"
  },
  xSeconds: {
    one: "1 giây",
    other: "{{count}} giây"
  },
  halfAMinute: "nửa phút",
  lessThanXMinutes: {
    one: "dưới 1 phút",
    other: "dưới {{count}} phút"
  },
  xMinutes: {
    one: "1 phút",
    other: "{{count}} phút"
  },
  aboutXHours: {
    one: "khoảng 1 giờ",
    other: "khoảng {{count}} giờ"
  },
  xHours: {
    one: "1 giờ",
    other: "{{count}} giờ"
  },
  xDays: {
    one: "1 ngày",
    other: "{{count}} ngày"
  },
  aboutXWeeks: {
    one: "khoảng 1 tuần",
    other: "khoảng {{count}} tuần"
  },
  xWeeks: {
    one: "1 tuần",
    other: "{{count}} tuần"
  },
  aboutXMonths: {
    one: "khoảng 1 tháng",
    other: "khoảng {{count}} tháng"
  },
  xMonths: {
    one: "1 tháng",
    other: "{{count}} tháng"
  },
  aboutXYears: {
    one: "khoảng 1 năm",
    other: "khoảng {{count}} năm"
  },
  xYears: {
    one: "1 năm",
    other: "{{count}} năm"
  },
  overXYears: {
    one: "hơn 1 năm",
    other: "hơn {{count}} năm"
  },
  almostXYears: {
    one: "gần 1 năm",
    other: "gần {{count}} năm"
  }
};
var formatDistance157 = function formatDistance158(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale78[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " nữa";
    } else {
      return result + " trước";
    }
  }
  return result;
};
var formatDistance_default80 = formatDistance157;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/_lib/formatLong/index.js
var dateFormats87 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017
  full: "EEEE, 'ngày' d MMMM 'năm' y",
  // ngày 25 tháng 08 năm 2017
  long: "'ngày' d MMMM 'năm' y",
  // 25 thg 08 năm 2017
  medium: "d MMM 'năm' y",
  // 25/08/2017
  short: "dd/MM/y"
};
var timeFormats87 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats87 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017 23:25:59
  full: "{{date}} {{time}}",
  // ngày 25 tháng 08 năm 2017 23:25
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong87 = {
  date: buildFormatLongFn({
    formats: dateFormats87,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats87,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats87,
    defaultWidth: "full"
  })
};
var formatLong_default87 = formatLong87;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/_lib/formatRelative/index.js
var formatRelativeLocale79 = {
  lastWeek: "eeee 'tuần trước vào lúc' p",
  yesterday: "'hôm qua vào lúc' p",
  today: "'hôm nay vào lúc' p",
  tomorrow: "'ngày mai vào lúc' p",
  nextWeek: "eeee 'tới vào lúc' p",
  other: "P"
};
var formatRelative157 = function formatRelative158(token, _date, _baseDate, _options) {
  return formatRelativeLocale79[token];
};
var formatRelative_default80 = formatRelative157;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/_lib/localize/index.js
var eraValues79 = {
  narrow: ["TCN", "SCN"],
  abbreviated: ["trước CN", "sau CN"],
  wide: ["trước Công Nguyên", "sau Công Nguyên"]
};
var quarterValues79 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"]
};
var formattingQuarterValues4 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  // I notice many news outlet use this "quý II/2018"
  wide: ["quý I", "quý II", "quý III", "quý IV"]
};
var monthValues79 = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"],
  wide: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"]
};
var formattingMonthValues19 = {
  narrow: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  abbreviated: ["thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12"],
  wide: ["tháng 01", "tháng 02", "tháng 03", "tháng 04", "tháng 05", "tháng 06", "tháng 07", "tháng 08", "tháng 09", "tháng 10", "tháng 11", "tháng 12"]
};
var dayValues79 = {
  narrow: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  short: ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"],
  abbreviated: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  wide: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
};
var dayPeriodValues79 = {
  // narrow date period is extremely rare in Vietnamese
  // I used abbreviated form for noon, morning and afternoon
  // which are regconizable by Vietnamese, others cannot be any shorter
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "nửa đêm",
    noon: "tr",
    morning: "sg",
    afternoon: "ch",
    evening: "tối",
    night: "đêm"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  },
  wide: {
    am: "SA",
    pm: "CH",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  }
};
var formattingDayPeriodValues64 = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "nửa đêm",
    noon: "tr",
    morning: "sg",
    afternoon: "ch",
    evening: "tối",
    night: "đêm"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "nửa đêm",
    noon: "trưa",
    morning: "sáng",
    afternoon: "chiều",
    evening: "tối",
    night: "đêm"
  },
  wide: {
    am: "SA",
    pm: "CH",
    midnight: "nửa đêm",
    noon: "giữa trưa",
    morning: "vào buổi sáng",
    afternoon: "vào buổi chiều",
    evening: "vào buổi tối",
    night: "vào ban đêm"
  }
};
var ordinalNumber157 = function ordinalNumber158(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (unit === "quarter") {
    switch (number) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
    }
  } else if (unit === "day") {
    switch (number) {
      case 1:
        return "thứ 2";
      case 2:
        return "thứ 3";
      case 3:
        return "thứ 4";
      case 4:
        return "thứ 5";
      case 5:
        return "thứ 6";
      case 6:
        return "thứ 7";
      case 7:
        return "chủ nhật";
    }
  } else if (unit === "week") {
    if (number === 1) {
      return "thứ nhất";
    } else {
      return "thứ " + number;
    }
  } else if (unit === "dayOfYear") {
    if (number === 1) {
      return "đầu tiên";
    } else {
      return "thứ " + number;
    }
  }
  return String(number);
};
var localize79 = {
  ordinalNumber: ordinalNumber157,
  era: buildLocalizeFn({
    values: eraValues79,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues79,
    defaultWidth: "wide",
    formattingValues: formattingQuarterValues4,
    defaultFormattingWidth: "wide",
    argumentCallback: function argumentCallback79(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues79,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues19,
    defaultFormattingWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues79,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues79,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues64,
    defaultFormattingWidth: "wide"
  })
};
var localize_default80 = localize79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/_lib/match/index.js
var matchOrdinalNumberPattern78 = /^(\d+)/i;
var parseOrdinalNumberPattern78 = /\d+/i;
var matchEraPatterns78 = {
  narrow: /^(tcn|scn)/i,
  abbreviated: /^(trước CN|sau CN)/i,
  wide: /^(trước Công Nguyên|sau Công Nguyên)/i
};
var parseEraPatterns78 = {
  any: [/^t/i, /^s/i]
};
var matchQuarterPatterns78 = {
  narrow: /^([1234]|i{1,3}v?)/i,
  abbreviated: /^q([1234]|i{1,3}v?)/i,
  wide: /^quý ([1234]|i{1,3}v?)/i
};
var parseQuarterPatterns78 = {
  any: [/(1|i)$/i, /(2|ii)$/i, /(3|iii)$/i, /(4|iv)$/i]
};
var matchMonthPatterns78 = {
  // month number may contain leading 0, 'thg' prefix may have space, underscore or empty before number
  // note the order of '1' since it is a sub-string of '10', so must be lower priority
  narrow: /^(0?[2-9]|10|11|12|0?1)/i,
  // note the order of 'thg 1' since it is sub-string of 'thg 10', so must be lower priority
  abbreviated: /^thg[ _]?(0?[1-9](?!\d)|10|11|12)/i,
  // note the order of 'Mười' since it is sub-string of Mười Một, so must be lower priority
  wide: /^tháng ?(Một|Hai|Ba|Tư|Năm|Sáu|Bảy|Tám|Chín|Mười|Mười ?Một|Mười ?Hai|0?[1-9](?!\d)|10|11|12)/i
};
var parseMonthPatterns78 = {
  narrow: [/0?1$/i, /0?2/i, /3/, /4/, /5/, /6/, /7/, /8/, /9/, /10/, /11/, /12/],
  abbreviated: [/^thg[ _]?0?1(?!\d)/i, /^thg[ _]?0?2/i, /^thg[ _]?0?3/i, /^thg[ _]?0?4/i, /^thg[ _]?0?5/i, /^thg[ _]?0?6/i, /^thg[ _]?0?7/i, /^thg[ _]?0?8/i, /^thg[ _]?0?9/i, /^thg[ _]?10/i, /^thg[ _]?11/i, /^thg[ _]?12/i],
  wide: [/^tháng ?(Một|0?1(?!\d))/i, /^tháng ?(Hai|0?2)/i, /^tháng ?(Ba|0?3)/i, /^tháng ?(Tư|0?4)/i, /^tháng ?(Năm|0?5)/i, /^tháng ?(Sáu|0?6)/i, /^tháng ?(Bảy|0?7)/i, /^tháng ?(Tám|0?8)/i, /^tháng ?(Chín|0?9)/i, /^tháng ?(Mười|10)/i, /^tháng ?(Mười ?Một|11)/i, /^tháng ?(Mười ?Hai|12)/i]
};
var matchDayPatterns78 = {
  narrow: /^(CN|T2|T3|T4|T5|T6|T7)/i,
  short: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  abbreviated: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  wide: /^(Chủ ?Nhật|Chúa ?Nhật|thứ ?Hai|thứ ?Ba|thứ ?Tư|thứ ?Năm|thứ ?Sáu|thứ ?Bảy)/i
};
var parseDayPatterns78 = {
  narrow: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  short: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  abbreviated: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  wide: [/(Chủ|Chúa) ?Nhật/i, /Hai/i, /Ba/i, /Tư/i, /Năm/i, /Sáu/i, /Bảy/i]
};
var matchDayPeriodPatterns78 = {
  narrow: /^(a|p|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  abbreviated: /^(am|pm|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  wide: /^(ch[^i]*|sa|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i
};
var parseDayPeriodPatterns78 = {
  any: {
    am: /^(a|sa)/i,
    pm: /^(p|ch[^i]*)/i,
    midnight: /nửa đêm/i,
    noon: /trưa/i,
    morning: /sáng/i,
    afternoon: /chiều/i,
    evening: /tối/i,
    night: /^đêm/i
  }
};
var match78 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern78,
    parsePattern: parseOrdinalNumberPattern78,
    valueCallback: function valueCallback154(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns78,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns78,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns78,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns78,
    defaultParseWidth: "any",
    valueCallback: function valueCallback155(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns78,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns78,
    defaultParseWidth: "wide"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns78,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns78,
    defaultParseWidth: "wide"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns78,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns78,
    defaultParseWidth: "any"
  })
};
var match_default79 = match78;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/vi/index.js
var locale89 = {
  code: "vi",
  formatDistance: formatDistance_default80,
  formatLong: formatLong_default87,
  formatRelative: formatRelative_default80,
  localize: localize_default80,
  match: match_default79,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
    /* First week of new year contains Jan 1st  */
  }
};
var vi_default = locale89;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/_lib/formatDistance/index.js
var formatDistanceLocale79 = {
  lessThanXSeconds: {
    one: "不到 1 秒",
    other: "不到 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分钟",
  lessThanXMinutes: {
    one: "不到 1 分钟",
    other: "不到 {{count}} 分钟"
  },
  xMinutes: {
    one: "1 分钟",
    other: "{{count}} 分钟"
  },
  xHours: {
    one: "1 小时",
    other: "{{count}} 小时"
  },
  aboutXHours: {
    one: "大约 1 小时",
    other: "大约 {{count}} 小时"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大约 1 个星期",
    other: "大约 {{count}} 个星期"
  },
  xWeeks: {
    one: "1 个星期",
    other: "{{count}} 个星期"
  },
  aboutXMonths: {
    one: "大约 1 个月",
    other: "大约 {{count}} 个月"
  },
  xMonths: {
    one: "1 个月",
    other: "{{count}} 个月"
  },
  aboutXYears: {
    one: "大约 1 年",
    other: "大约 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超过 1 年",
    other: "超过 {{count}} 年"
  },
  almostXYears: {
    one: "将近 1 年",
    other: "将近 {{count}} 年"
  }
};
var formatDistance159 = function formatDistance160(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale79[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "内";
    } else {
      return result + "前";
    }
  }
  return result;
};
var formatDistance_default81 = formatDistance159;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/_lib/formatLong/index.js
var dateFormats88 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats88 = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats88 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong88 = {
  date: buildFormatLongFn({
    formats: dateFormats88,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats88,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats88,
    defaultWidth: "full"
  })
};
var formatLong_default88 = formatLong88;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/_lib/formatRelative/index.js
function checkWeek(date, baseDate, options) {
  var baseFormat = "eeee p";
  if (isSameUTCWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'下个'" + baseFormat;
  }
  return "'上个'" + baseFormat;
}
var formatRelativeLocale80 = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: "PP p"
};
var formatRelative159 = function formatRelative160(token, date, baseDate, options) {
  var format = formatRelativeLocale80[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
var formatRelative_default81 = formatRelative159;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/_lib/localize/index.js
var eraValues80 = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
var quarterValues80 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
var monthValues80 = {
  narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var dayValues80 = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var dayPeriodValues80 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var formattingDayPeriodValues65 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var ordinalNumber159 = function ordinalNumber160(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number.toString() + "日";
    case "hour":
      return number.toString() + "时";
    case "minute":
      return number.toString() + "分";
    case "second":
      return number.toString() + "秒";
    default:
      return "第 " + number.toString();
  }
};
var localize80 = {
  ordinalNumber: ordinalNumber159,
  era: buildLocalizeFn({
    values: eraValues80,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues80,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback80(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues80,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues80,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues80,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues65,
    defaultFormattingWidth: "wide"
  })
};
var localize_default81 = localize80;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/_lib/match/index.js
var matchOrdinalNumberPattern79 = /^(第\s*)?\d+(日|时|分|秒)?/i;
var parseOrdinalNumberPattern79 = /\d+/i;
var matchEraPatterns79 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns79 = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns79 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
var parseQuarterPatterns79 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns79 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns79 = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns79 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns79 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns79 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var parseDayPeriodPatterns79 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match79 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern79,
    parsePattern: parseOrdinalNumberPattern79,
    valueCallback: function valueCallback156(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns79,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns79,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns79,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns79,
    defaultParseWidth: "any",
    valueCallback: function valueCallback157(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns79,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns79,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns79,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns79,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns79,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns79,
    defaultParseWidth: "any"
  })
};
var match_default80 = match79;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-CN/index.js
var locale90 = {
  code: "zh-CN",
  formatDistance: formatDistance_default81,
  formatLong: formatLong_default88,
  formatRelative: formatRelative_default81,
  localize: localize_default81,
  match: match_default80,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var zh_CN_default = locale90;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/_lib/formatDistance/index.js
var formatDistanceLocale80 = {
  lessThanXSeconds: {
    one: "少於 1 秒",
    other: "少於 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分鐘",
  lessThanXMinutes: {
    one: "少於 1 分鐘",
    other: "少於 {{count}} 分鐘"
  },
  xMinutes: {
    one: "1 分鐘",
    other: "{{count}} 分鐘"
  },
  xHours: {
    one: "1 小時",
    other: "{{count}} 小時"
  },
  aboutXHours: {
    one: "大約 1 小時",
    other: "大約 {{count}} 小時"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大約 1 個星期",
    other: "大約 {{count}} 個星期"
  },
  xWeeks: {
    one: "1 個星期",
    other: "{{count}} 個星期"
  },
  aboutXMonths: {
    one: "大約 1 個月",
    other: "大約 {{count}} 個月"
  },
  xMonths: {
    one: "1 個月",
    other: "{{count}} 個月"
  },
  aboutXYears: {
    one: "大約 1 年",
    other: "大約 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超過 1 年",
    other: "超過 {{count}} 年"
  },
  almostXYears: {
    one: "將近 1 年",
    other: "將近 {{count}} 年"
  }
};
var formatDistance161 = function formatDistance162(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale80[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "內";
    } else {
      return result + "前";
    }
  }
  return result;
};
var formatDistance_default82 = formatDistance161;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/_lib/formatLong/index.js
var dateFormats89 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats89 = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats89 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong89 = {
  date: buildFormatLongFn({
    formats: dateFormats89,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats89,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats89,
    defaultWidth: "full"
  })
};
var formatLong_default89 = formatLong89;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/_lib/formatRelative/index.js
var formatRelativeLocale81 = {
  lastWeek: "'上個'eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個'eeee p",
  other: "P"
};
var formatRelative161 = function formatRelative162(token, _date, _baseDate, _options) {
  return formatRelativeLocale81[token];
};
var formatRelative_default82 = formatRelative161;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/_lib/localize/index.js
var eraValues81 = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
var quarterValues81 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
var monthValues81 = {
  narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var dayValues81 = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var dayPeriodValues81 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "午夜",
    noon: "晌",
    morning: "早",
    afternoon: "午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "午夜",
    noon: "中午",
    morning: "上午",
    afternoon: "下午",
    evening: "晚上",
    night: "夜晚"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "午夜",
    noon: "中午",
    morning: "上午",
    afternoon: "下午",
    evening: "晚上",
    night: "夜晚"
  }
};
var formattingDayPeriodValues66 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "午夜",
    noon: "晌",
    morning: "早",
    afternoon: "午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "午夜",
    noon: "中午",
    morning: "上午",
    afternoon: "下午",
    evening: "晚上",
    night: "夜晚"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "午夜",
    noon: "中午",
    morning: "上午",
    afternoon: "下午",
    evening: "晚上",
    night: "夜晚"
  }
};
var ordinalNumber161 = function ordinalNumber162(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number + "日";
    case "hour":
      return number + "時";
    case "minute":
      return number + "分";
    case "second":
      return number + "秒";
    default:
      return "第 " + number;
  }
};
var localize81 = {
  ordinalNumber: ordinalNumber161,
  era: buildLocalizeFn({
    values: eraValues81,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues81,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback81(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues81,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues81,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues81,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues66,
    defaultFormattingWidth: "wide"
  })
};
var localize_default82 = localize81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/_lib/match/index.js
var matchOrdinalNumberPattern80 = /^(第\s*)?\d+(日|時|分|秒)?/i;
var parseOrdinalNumberPattern80 = /\d+/i;
var matchEraPatterns80 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns80 = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns80 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]季/i,
  wide: /^第[一二三四]季度/i
};
var parseQuarterPatterns80 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns80 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns80 = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns80 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^週[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns80 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns80 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨)/i
};
var parseDayPeriodPatterns80 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match80 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern80,
    parsePattern: parseOrdinalNumberPattern80,
    valueCallback: function valueCallback158(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns80,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns80,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns80,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns80,
    defaultParseWidth: "any",
    valueCallback: function valueCallback159(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns80,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns80,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns80,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns80,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns80,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns80,
    defaultParseWidth: "any"
  })
};
var match_default81 = match80;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-HK/index.js
var locale91 = {
  code: "zh-HK",
  formatDistance: formatDistance_default82,
  formatLong: formatLong_default89,
  formatRelative: formatRelative_default82,
  localize: localize_default82,
  match: match_default81,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var zh_HK_default = locale91;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/_lib/formatDistance/index.js
var formatDistanceLocale81 = {
  lessThanXSeconds: {
    one: "少於 1 秒",
    other: "少於 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分鐘",
  lessThanXMinutes: {
    one: "少於 1 分鐘",
    other: "少於 {{count}} 分鐘"
  },
  xMinutes: {
    one: "1 分鐘",
    other: "{{count}} 分鐘"
  },
  xHours: {
    one: "1 小時",
    other: "{{count}} 小時"
  },
  aboutXHours: {
    one: "大約 1 小時",
    other: "大約 {{count}} 小時"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大約 1 個星期",
    other: "大約 {{count}} 個星期"
  },
  xWeeks: {
    one: "1 個星期",
    other: "{{count}} 個星期"
  },
  aboutXMonths: {
    one: "大約 1 個月",
    other: "大約 {{count}} 個月"
  },
  xMonths: {
    one: "1 個月",
    other: "{{count}} 個月"
  },
  aboutXYears: {
    one: "大約 1 年",
    other: "大約 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超過 1 年",
    other: "超過 {{count}} 年"
  },
  almostXYears: {
    one: "將近 1 年",
    other: "將近 {{count}} 年"
  }
};
var formatDistance163 = function formatDistance164(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale81[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "內";
    } else {
      return result + "前";
    }
  }
  return result;
};
var formatDistance_default83 = formatDistance163;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/_lib/formatLong/index.js
var dateFormats90 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats90 = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats90 = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong90 = {
  date: buildFormatLongFn({
    formats: dateFormats90,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats90,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats90,
    defaultWidth: "full"
  })
};
var formatLong_default90 = formatLong90;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/_lib/formatRelative/index.js
var formatRelativeLocale82 = {
  lastWeek: "'上個'eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個'eeee p",
  other: "P"
};
var formatRelative163 = function formatRelative164(token, _date, _baseDate, _options) {
  return formatRelativeLocale82[token];
};
var formatRelative_default83 = formatRelative163;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/_lib/localize/index.js
var eraValues82 = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
var quarterValues82 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一刻", "第二刻", "第三刻", "第四刻"],
  wide: ["第一刻鐘", "第二刻鐘", "第三刻鐘", "第四刻鐘"]
};
var monthValues82 = {
  narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var dayValues82 = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var dayPeriodValues82 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  }
};
var formattingDayPeriodValues67 = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜間"
  }
};
var ordinalNumber163 = function ordinalNumber164(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number + "日";
    case "hour":
      return number + "時";
    case "minute":
      return number + "分";
    case "second":
      return number + "秒";
    default:
      return "第 " + number;
  }
};
var localize82 = {
  ordinalNumber: ordinalNumber163,
  era: buildLocalizeFn({
    values: eraValues82,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues82,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback82(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues82,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues82,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues82,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues67,
    defaultFormattingWidth: "wide"
  })
};
var localize_default83 = localize82;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/_lib/match/index.js
var matchOrdinalNumberPattern81 = /^(第\s*)?\d+(日|時|分|秒)?/i;
var parseOrdinalNumberPattern81 = /\d+/i;
var matchEraPatterns81 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns81 = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns81 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻鐘/i
};
var parseQuarterPatterns81 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns81 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns81 = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns81 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^週[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns81 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns81 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨)/i
};
var parseDayPeriodPatterns81 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match81 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern81,
    parsePattern: parseOrdinalNumberPattern81,
    valueCallback: function valueCallback160(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns81,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns81,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns81,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns81,
    defaultParseWidth: "any",
    valueCallback: function valueCallback161(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns81,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns81,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns81,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns81,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns81,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns81,
    defaultParseWidth: "any"
  })
};
var match_default82 = match81;

// node_modules/.pnpm/date-fns@2.29.3/node_modules/date-fns/esm/locale/zh-TW/index.js
var locale92 = {
  code: "zh-TW",
  formatDistance: formatDistance_default83,
  formatLong: formatLong_default90,
  formatRelative: formatRelative_default83,
  localize: localize_default83,
  match: match_default82,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var zh_TW_default = locale92;

export {
  af_default,
  ar_default,
  ar_DZ_default,
  ar_EG_default,
  ar_MA_default,
  ar_SA_default,
  ar_TN_default,
  az_default,
  be_default,
  be_tarask_default,
  bg_default,
  bn_default,
  bs_default,
  ca_default,
  cs_default,
  cy_default,
  da_default,
  de_default,
  de_AT_default,
  el_default,
  en_AU_default,
  en_CA_default,
  en_GB_default,
  en_IE_default,
  en_IN_default,
  en_NZ_default,
  en_ZA_default,
  eo_default,
  es_default,
  et_default,
  eu_default,
  fa_IR_default,
  fi_default,
  fr_default,
  fr_CA_default,
  fr_CH_default,
  fy_default,
  gd_default,
  gl_default,
  gu_default,
  he_default,
  hi_default,
  hr_default,
  ht_default,
  hu_default,
  hy_default,
  id_default,
  is_default,
  it_default,
  it_CH_default,
  ja_default,
  ja_Hira_default,
  ka_default,
  kk_default,
  km_default,
  kn_default,
  ko_default,
  lb_default,
  lt_default,
  lv_default,
  mk_default,
  mn_default,
  ms_default,
  mt_default,
  nb_default,
  nl_default,
  nl_BE_default,
  nn_default,
  oc_default,
  pl_default,
  pt_default,
  pt_BR_default,
  ro_default,
  ru_default,
  sk_default,
  sl_default,
  sq_default,
  sr_default,
  sr_Latn_default,
  sv_default,
  ta_default,
  te_default,
  th_default,
  tr_default,
  ug_default,
  uk_default,
  uz_default,
  uz_Cyrl_default,
  vi_default,
  zh_CN_default,
  zh_HK_default,
  zh_TW_default
};
//# sourceMappingURL=chunk-CBSJHWAB.js.map
