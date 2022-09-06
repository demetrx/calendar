import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Add from 'components/AddBtn/AddBtn';
import Calendar from 'components/Calendar/Calendar';
import DatePicker from 'components/DatePicker/DatePicker';
import EventDialog from 'components/EventDialog/EventDialog';
import Filter from 'components/Filter/Filter';

import { IEvent, IYM } from 'types';
import { getTodayYearAndMonth } from 'calc';

const LS_EVENTS_KEY = 'genesis-events';
const LS_FILTERS_KEY = 'genesis-filters';

function App() {
  const [curYM, setCurYM] = useState<IYM>(getTodayYearAndMonth());
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [relevantEvents, setRelevantEvents] = useState<IEvent[]>([]);
  const [eventToEdit, setEventToEdit] = useState<IEvent | null>(null);

  const isFirstRender = useRef(true);

  const changeMonth = (month: number) => {
    // prev year
    if (month === -1) {
      month = 11;
      setCurYM((pv) => ({ year: pv.year - 1, month }));
      return;
    }

    // next year
    if (month === 12) {
      month = 0;
      setCurYM((pv) => ({ year: pv.year + 1, month }));
      return;
    }

    // current year
    setCurYM((pv) => ({ ...pv, month }));
  };

  useEffect(() => {
    console.log(eventToEdit);

    if (eventToEdit) {
      setEditOpen(true);
    }
  }, [eventToEdit]);

  useEffect(() => {
    const newRelevantEvents = events.filter(
      (e) => e.month === curYM.month && e.year === curYM.year
    );

    setRelevantEvents(newRelevantEvents);
  }, [curYM, events]);

  useEffect(() => {
    const savedEvents = localStorage.getItem(LS_EVENTS_KEY);
    const savedFilters = localStorage.getItem(LS_FILTERS_KEY);

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    if (savedFilters) {
      setCurYM(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem(LS_EVENTS_KEY, JSON.stringify(events));
    localStorage.setItem(LS_FILTERS_KEY, JSON.stringify(curYM));
  }, [events, curYM]);

  const addEventHandler = (event: IEvent) => {
    setEvents((pv) => [event, ...pv]);
  };

  const deleteEventHandler = (event: IEvent) => {
    setEvents((pv) => pv.filter((e) => e.id !== event.id));
    setEventToEdit(null);
  };

  const editEventHandler = (event: IEvent) => {
    deleteEventHandler(event);
    addEventHandler(event);
    setEventToEdit(null);
  };

  return (
    <div className="app">
      <div className="interactions">
        <Add onClick={() => setAddOpen(true)} />
        <Filter curYM={curYM} onChangeMonth={changeMonth} />
        <DatePicker curYM={curYM} onPick={setCurYM} />
      </div>

      <Calendar
        curYM={curYM}
        events={relevantEvents}
        onEventClick={(e: IEvent | null) => setEventToEdit(e)}
      />

      {addOpen && (
        <EventDialog
          heading="Add new idea item"
          onClose={() => setAddOpen(false)}
          onSave={addEventHandler}
          isOpened={addOpen}
        />
      )}
      {editOpen && (
        <EventDialog
          heading="Edit idea item"
          event={eventToEdit}
          onClose={() => setEditOpen(false)}
          onSave={editEventHandler}
          onDelete={deleteEventHandler}
          isOpened={editOpen}
        />
      )}
    </div>
  );
}

export default App;
