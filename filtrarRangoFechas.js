const moment = require("moment");

const horarios = [
  { end_time: "14:00", start_time: "09:00" },
  { end_time: "18:00", start_time: "15:00" },
  { end_time: "20:00", start_time: "19:00" },
  { end_time: "22:00", start_time: "21:00" },
];

const calendario = [
  { end_hour: "14:00:00", flexible: 0, id: 3, start_hour: "09:00:00" },
  { end_hour: "18:00:00", flexible: 0, id: 44, start_hour: "15:00:00" },
];

const rangosPendientes = calendario.filter((CalendarNext) => {
  const shouldKeep = !horarios.reduce((FichadoCurr, FichadoNext) => {
    const isEndAfterStart = moment(FichadoNext.end_time, "HH:mm").isSameOrAfter(
      moment(CalendarNext.start_hour, "HH:mm:ss")
    );
    const isStartBeforeEnd = moment(
      FichadoNext.start_time,
      "HH:mm"
    ).isSameOrBefore(moment(CalendarNext.end_hour, "HH:mm:ss"));
    const isInRange = isEndAfterStart && isStartBeforeEnd;
    console.log(
      `${FichadoNext.start_time} ${FichadoNext.end_time} is in range of ${CalendarNext.start_hour} ${CalendarNext.end_hour}`,
      isInRange
    );
    if (FichadoCurr) {
      return FichadoCurr;
    } else {
      return isInRange;
    }
  }, false);
  return shouldKeep;
});

/*
09:00 a 14:00
08:00 a 13:00 pasa
10:00 a 13:00 pasa
10:00 a 15:00 pasa
08:00 a 15:00 pasa
07:00 a 08:00 no pasa
15:00 a 16:00 no pasa
*/
