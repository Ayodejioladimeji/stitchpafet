import React from 'react';
import { strictAddComma } from 'comma-separator';
// import { format } from 'timeago.js';
import { FaMinusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// COMPONENTS
import Loading from './../../../common/alert/Loading';
import { getDate } from '../../../utils/utils';

//

const RecentTransactions = () => {
  const { alert } = useSelector((state) => state);
  const { userTransaction } = useSelector((state) => state.wallet);

  return (
    <>
      {' '}
      {userTransaction === null ? (
        <p className='text-center mt-5 text-secondary'>No Transaction yet</p>
      ) : (
        <>
          {' '}
          {alert.loading ? (
            <div className='transaction-loading'>
              <Loading width='25px' height='25px' color='#fff' />
            </div>
          ) : (
            <div className='recent-transactions'>
              <h3>Recent Transactions</h3>
              {userTransaction.map((item, index) => {
                const { _id, amount, description, status, updated_at } = item;
                return (
                  index <= 5 && (
                    <React.Fragment key={_id}>
                      <div className='recent-div'>
                        <div className='recent-div-left'>
                          <p className='recent-count'>{index + 1}</p>
                          {description === 'Wallet topup' ? (
                            <FaMinusCircle className='recent-blue-icon' />
                          ) : description === 'Money received' ? (
                            <FaMinusCircle className='recent-green-icon' />
                          ) : (
                            <FaMinusCircle className='recent-icon' />
                          )}
                          <div className='recent-left-details'>
                            <h3>{description}</h3>
                            <small>{getDate(updated_at)}</small>{' '}
                            {/* <span className='ml-4'>{format(updated_at)}</span> */}
                          </div>
                        </div>

                        <div className='recent-div-right'>
                          <h3 className='transaction-price'>
                            ₦{strictAddComma(amount)}
                          </h3>
                          {status === 'completed' ? (
                            <small className='recent-blue-icon'>{status}</small>
                          ) : status === 'incoming' ? (
                            <small className='recent-green-icon'>
                              {status}
                            </small>
                          ) : (
                            <small className='recent-icon'>{status}</small>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  )
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RecentTransactions;
