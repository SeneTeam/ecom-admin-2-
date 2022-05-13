import { useQuery } from 'react-query';

import { drivingLicenseService } from '../services/driving-license/driving-license.service';

class DrivingLicense {
  getAll() {
    return useQuery(['d-licenses'], () => drivingLicenseService.getAll());
  }
  getById(id?: string) {
    return useQuery(
      ['employee-roles', id],
      () => drivingLicenseService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }
}

export const drivingLicenseStore = new DrivingLicense();
