import React from 'react';
import { observer } from 'mobx-react-lite';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const CustomSelect = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Props of Component
   */
  const { className, children, title } = props;

  React.useEffect(() => {}, [truckOwnerStore.provinces]);

  const [selected, setSelected] = React.useState<boolean>(false);

  return (
    <>
      <div className="custom-dropdown">
        <div className="label" onClick={() => setSelected(true)}>
          All
        </div>
        <div className={`dropdown-menu ${selected ? 'show' : ''}`}>
          <ul>
            <li onClick={() => {}}>All</li>
            {truckOwnerStore.provinces.map((item: any, index: number) => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default observer(CustomSelect);
