export const CV_DATA = "CV_DATA";
export const CV_DATA_TOTAL = "CV_DATA_TOTAL";
export const cvDataAction = (cvDataState) => {
  return {
    type: "CV_DATA",
    payload: {
      infectionData: cvDataState.infectionData,
      deathData: cvDataState.deathData
    }
  }
};
export const cvDataActionTotal = (cvDataState) => {
  return {
    type: "CV_DATA_TOTAL",
    payload: {
      date: cvDataState.date,
      positive: cvDataState.positive,
      hospitalize: cvDataState.hospitalize,
      severe: cvDataState.severe,
      death: cvDataState.death
    }
  }
};

