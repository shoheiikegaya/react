import {createSelector} from 'reselect';

const cvdataSelector = (state) => state.cvdata;

export const getInfectionData = createSelector(
  [cvdataSelector],
  state => state.infectionData
);
export const getDeathData = createSelector(
  [cvdataSelector],
  state => state.deathData
);

export const getDate= createSelector(
  [cvdataSelector],
  state => state.date
);
export const getPositive= createSelector(
  [cvdataSelector],
  state => state.positive
);
export const getHospitalize= createSelector(
  [cvdataSelector],
  state => state.hospitalize
);
export const getSevere= createSelector(
  [cvdataSelector],
  state => state.severe
);
export const getDeath= createSelector(
  [cvdataSelector],
  state => state.death
);




