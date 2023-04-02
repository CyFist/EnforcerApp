import * as React from 'react';
import { configureAbly, useChannel } from '@ably-labs/react-hooks';
import _ from 'lodash';

import { useRecoilState } from 'recoil';
import { RecordsAtom } from '../state/recordsState';

const Ably = () => {
  const [uRecords, setuRecords] = useRecoilState(RecordsAtom);
  const [messages, updateMessages] = React.useState([]);

  configureAbly({
    key: 'j-xiCQ.61x5Zg:b_NQrYaBYse-_iHQGdIhZB73b7s8Y6plHKeJBisoKkA',
    clientId: 'chinyang'
  });

  const [channel] = useChannel('[?rewind=1]restdb records', (message) => {
    //console.log(message, 'render');
    updateMessages((prev) => [...prev, message]);
  });
  React.useEffect(() => {
    if (!_.isEmpty(messages)) {
      const ev = messages[messages.length - 1].data.event;
      const collection = ev.collection;
      const payload = ev.payload[0];
      const method = ev.method;

      const uRecordsClone = _.cloneDeep(uRecords);

      switch (method) {
        case 'POST':
          switch (collection) {
            case 'records': // code to be executed if collection = records;
              uRecordsClone.push(payload);
              setuRecords(
                _.orderBy(
                  uRecordsClone,
                  [
                    (o) => {
                      return o.Valid;
                    },
                    'User'
                  ],
                  ['desc', 'asc']
                )
              );
              break;
            case 'quiz': // code to be executed if collection = quiz;
              break;
            default: // code to be executed if
            // doesn't match any cases
          }
          // code block
          break;
        case 'PUT':
          switch (collection) {
            case 'records': // code to be executed if collection = records;
              const index = _.findIndex(uRecordsClone, { User: payload.User });
              _.assign(uRecordsClone[index], payload);
              setuRecords(
                _.orderBy(
                  uRecordsClone,
                  [
                    (o) => {
                      return o.Valid;
                    },
                    'User'
                  ],
                  ['desc', 'asc']
                )
              );
              break;
            case 'quiz': // code to be executed if collection = quiz;
              break;
            default: // code to be executed if
            //  doesn't match any cases
          }

          // code block
          break;
        case 'DELETE':
          switch (collection) {
            case 'records': // code to be executed if collection = records;
              const index = _.findIndex(uRecordsClone, { _id: payload });
              uRecordsClone.splice(index, 1);
              setuRecords(
                _.orderBy(
                  uRecordsClone,
                  [
                    (o) => {
                      return o.Valid;
                    },
                    'User'
                  ],
                  ['desc', 'asc']
                )
              );
              break;
            case 'quiz': // code to be executed if collection = quiz;
              break;
            default: // code to be executed if
            // doesn't match any cases
          }
          break;
        default:
        // code block
      }
    }
  }, [messages]);

  return <div key="try"></div>;
};

export default Ably;
