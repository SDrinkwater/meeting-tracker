import * as types from '../constants/ActionTypes';

const initialState = {
  meetings: [],
};

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MEETING:
      return {
        meetings: [...state.meetings,
          {
            id: action.id,
            clock: 0,
            time: '00:00:00',
            play: false,
          },
        ],
      };

    case types.REMOVE_MEETING: {
      const localMeetings = state.meetings;
      localMeetings.splice(-1, 1);
      return { meetings: localMeetings };
    }

    case types.REMOVE_MEETING_BY_ID:
      return {
        meetings: state.meetings.filter(meeting =>
          meeting.id !== action.id,
        ),
      };

    case types.TOGGLE_MEETING:
      return {
        meetings: state.meetings.map(meeting =>
          (meeting.id === action.id
            ? { ...meeting, play: !meeting.play }
            : meeting
          ),
        ),
      };

    case types.RESET_MEETING:
      return {
        meetings: state.meetings.map(meeting =>
          (meeting.id === action.id
            ? {
              clock: 0,
              time: '00:00:00',
              play: false,
            }
            : meeting
          ),
        ),
      };

    default:
      return state;
  }
};

export default meetings;
