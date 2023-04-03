import React, { useEffect, useState } from 'react';
import '../../App.css';
import Spinner from '../Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunchList, selectDataAvailabilityState, selectLaunchList, selectLaunchParams, selectLoadingState } from '../../features/LaunchSlice';

const LaunchList = () => {
  const dispatch = useDispatch();
  const bLoading = useSelector(selectLoadingState);
  const oSearchParams = useSelector(selectLaunchParams);
  const aLaunchList = useSelector(selectLaunchList);
  const bDataAvailable = useSelector(selectDataAvailabilityState);

  const handleScroll = (oEvent) => {
    const bIsBottom = (oEvent.target.scrollHeight - oEvent.target.scrollTop) === oEvent.target.clientHeight;
    if (bIsBottom === true && bLoading === false && bDataAvailable === true) { 
      dispatch(getLaunchList(oSearchParams));
    }
  }

  useEffect(() => {
    dispatch(getLaunchList(oSearchParams));
  }, []);

  return (
    <div className='launch-list' onScroll={handleScroll}>
      <ul>
        {
          aLaunchList?.map((oLaunch, iKey) => (
            <div key={iKey}>
                <h1>{ oLaunch.mission_name }</h1>
                {
                  oLaunch.upcoming === true && ( <label>upcoming</label> )
                }
                {
                  oLaunch.launch_success === true && ( <label>Success</label> )
                }
                {
                  oLaunch.launch_success === false && ( <label>Failed</label> )
                }
                <button>View</button>
              </div>
          ))
        }
      </ul>
      {
        bLoading === true && ( <Spinner/> )
      }
      {
        bDataAvailable === false && ( 
            <h1>No Data Available!</h1>
          )
      }
    </div>
  );
}

export default LaunchList;
