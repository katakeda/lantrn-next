import React, { ChangeEvent, FocusEvent, useMemo, useState } from 'react';
import Calendar, {
  CalendarTileProperties,
  ViewCallbackProperties,
} from 'react-calendar';
import DatePicker from 'react-datepicker';
import { Facility } from '../../types';

interface FacilitiesDetailProps {
  facility: Facility;
  availabilities: string[];
}

const dateToKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
};

const handleChangeRaw = (event: FocusEvent<HTMLInputElement>) => {
  event.preventDefault();
};

const FacilitiesDetail: React.FC<FacilitiesDetailProps> = ({
  facility,
  availabilities,
}) => {
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [availabilitiesState, setAvailabilitiesState] =
    useState<string[]>(availabilities);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');
  const [subscribedDate, setSubscribedDate] = useState<Date | null>(null);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const availabilityKeys = useMemo(
    () => availabilitiesState.map((a) => dateToKey(new Date(a))),
    [availabilitiesState]
  );

  const hanleTileDisabled = ({ date }: CalendarTileProperties) => {
    return !availabilityKeys.includes(dateToKey(date));
  };

  const handleTileClassName = ({ date }: CalendarTileProperties) => {
    return availabilityKeys.includes(dateToKey(date)) ? 'bg-blue-300' : null;
  };

  const handleActiveDateChange = async ({
    activeStartDate,
  }: ViewCallbackProperties) => {
    const date = activeStartDate.toISOString().split('T')[0];
    const response = await fetch(
      `/api/facilities/availability?facility_id=${facility.facilityId}&date=${date}`
    );
    if (response.status >= 300) {
      return setFetchError(true);
    }
    const data = await response.json();
    setAvailabilitiesState(data.availabilities);
  };

  const handleSubscribedEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSubscribedEmail(event.currentTarget.value);
  };

  const handleSubscribedDateChange = (date: Date | null) => {
    setSubscribedDate(date);
  };

  const handleSubscribe = async () => {
    if (subscribedDate && subscribedEmail) {
      const [year, month] = subscribedDate
        .toISOString()
        .split('T')[0]
        .split('-');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscribedEmail,
          targetDate: `${year}-${month}-01`,
          facilityId: parseInt(facility.id),
        }),
      };
      const response = await fetch('/api/subscriptions', options);
      if (response.status >= 300) {
        return setFetchError(true);
      }
      setSubscribed(true);
    }
  };

  const handleDaySelect = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_RESERVATION_URL}/${facility.facilityId}`,
      '_blank'
    );
  };

  return (
    <article className="px-12 py-8 xl:px-64">
      {fetchError && (
        <section className="mb-4">
          <div className="text-center text-lg text-red-500">
            Something went wrong
          </div>
        </section>
      )}
      <section className="mb-4 flex items-center justify-center">
        <div className="text-xl text-gray-500">{facility.name}</div>
      </section>
      <section className="mb-4">
        <div className="flex flex-col items-center">
          <Calendar
            minDate={new Date()}
            minDetail={'month'}
            tileDisabled={hanleTileDisabled}
            tileClassName={handleTileClassName}
            onActiveStartDateChange={handleActiveDateChange}
            onClickDay={handleDaySelect}
            next2Label={null}
            prev2Label={null}
          />
          <div className="flex space-x-2 py-4 md:px-4">
            <div className="flex space-x-1">
              <span className="text-sm text-gray-500">Available</span>
              <div className="h-4 w-4 bg-blue-300"></div>
            </div>
            <div className="flex space-x-1">
              <span className="text-sm text-gray-500">Reserved</span>
              <div className="h-4 w-4 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center space-y-2">
        <div className="text-center text-3xl text-gray-500">{`Didn't find what you were looking for?`}</div>
        <div className="text-md text-center text-gray-500">
          <p>Subscribe to receive updates as campsites become available!</p>
          <p>Enter your email and the month you are interested in visiting.</p>
        </div>
        {subscribed ? (
          <div className="text-center text-2xl text-gray-500">
            Thank you for signing up!
          </div>
        ) : (
          <div className="flex w-full max-w-lg flex-col space-y-1 p-4 shadow-lg">
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-sm p-2 text-center ring-1 ring-gray-300 focus:outline-none"
              value={subscribedEmail}
              onChange={handleSubscribedEmailChange}
            />
            <DatePicker
              selected={subscribedDate}
              onChange={handleSubscribedDateChange}
              onChangeRaw={handleChangeRaw}
              minDate={new Date()}
              isClearable={true}
              placeholderText="Select Date"
              className="w-full rounded-sm p-2 text-center text-gray-500 ring-1 ring-gray-300 focus:outline-none"
            />
            <button
              className="w-full rounded-md bg-green-500 p-2 text-white"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

export default FacilitiesDetail;
