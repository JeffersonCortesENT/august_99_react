import React, { useEffect, useState } from 'react';
import '../../App.css';
import Spinner from '../Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getLaunchList, selectDataAvailabilityState, selectInSearch, selectLaunchList, selectLaunchParams, selectLoadingState, selectSearchResult } from '../../features/LaunchSlice';

const LaunchList = () => {
  const dispatch = useDispatch();
  const bLoading = useSelector(selectLoadingState);
  const oSearchParams = useSelector(selectLaunchParams);
  const aLaunchList = useSelector(selectLaunchList);
  const bDataAvailable = useSelector(selectDataAvailabilityState);
  const bInSearch = useSelector(selectInSearch);
  const [aLaunchData, setLaunchData] = useState([]); 
  const aSearchResult = useSelector(selectSearchResult);

  const handleScroll = (oEvent) => {
    const bIsBottom = (oEvent.target.scrollHeight - oEvent.target.scrollTop) === oEvent.target.clientHeight;
    if (bIsBottom === true && bLoading === false && bDataAvailable === true) { 
      dispatch(getLaunchList(oSearchParams));
    }
  }

  useEffect(() => {
    dispatch(getLaunchList(oSearchParams));
  }, []);

  useEffect(() => {
    if (bInSearch === true) {
      setLaunchData(aSearchResult);
    } else {
      setLaunchData(aLaunchList);
    }
  }, [bInSearch, aLaunchList, aSearchResult]);

  return (
    <div className='launch-list' onScroll={handleScroll}>
      <ul>
        {
          aLaunchData.length > 0 ? 
          (
            aLaunchData?.map((oLaunch, iKey) => (
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
                </div>
            ))
          )
          : 
          (
            bLoading === false && <h1>No Data Available!</h1>
          )

        }
      </ul>
      {
        bLoading === true && ( <Spinner/> )
      }
      {
        bDataAvailable === false && 
        ( 
          <h1>No Data Available!</h1>
        )
      }
    </div>
  );
}

export default LaunchList;
