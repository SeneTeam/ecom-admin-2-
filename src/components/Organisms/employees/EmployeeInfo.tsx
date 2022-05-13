import React, { useState } from 'react';

import { EmployeeDto } from '../../../types/services/employees.types';
import Button from '../../Molecules/Button/Button';
import Details from '../../Molecules/custom/Details';
import SuccessModal from '../Modals/SuccessModal';
import AddNewEmployeeModal from './AddNewEmployeeModal';

export default function EmployeeInfo(props: { employee: EmployeeDto }) {
  const [rightModalShow, setRightModalShow] = useState(false);
  const [isSuccessModalOpen, setisSuccessModalOpen] = useState(false);

  let basicInfo = {},
    workingCondition = {},
    residenceInfo = {},
    drivingLicense = {},
    clothingSize = {},
    otherInfo = {},
    contactInfo = {};

  console.log(props.employee);

  if (props.employee) {
    basicInfo = {
      'Grafiko Nr.': props.employee?.seqNumber,
      'Sutarties Nr.': props.employee?.contractNumber,
      'Sodros Nr.': props.employee.seqNumber,
      'Šalis': props.employee.nationality.name,
      'Asmens kodas': props.employee?.socialSecurityNumber,
      'Darbuotojas': props.employee.firstName.toUpperCase() + ' ' + props.employee.lastName.toUpperCase(),
      'Statusas': props.employee.isActive ? 'Active' : 'InActive',
    };

    workingCondition = {
      'Pareigos': props.employee.employeeRole?.name,
      'Įdarbinimo pradžia': props.employee.regDate.split('T')[0],
      'Pirmoji darbo diena': props.employee.startDate.split('T')[0],
      'Įdarbinimo pabaiga': props.employee.endDate.split('T')[0],
      'Sutarties tipas': props.employee.employmentTerm.name,
      'Etatas': props.employee.employmentType.name,
      'Darbo savaitės trukmė': props.employee.workingWeek ? props.employee.workingWeek.name : 'Nėra duomenų',
      'Atlyginimas': `${props.employee.salary} €`
    };

    residenceInfo = {
      'Adresas': `${props.employee.address}, ${props.employee.postalCode} ${props.employee.city}, ${props.employee.country}`,
    };

    drivingLicense = {
      // Vairuotojo pažymėjimas
      'Numeris': 'Nėra duomenų',
      'Kategorija': props.employee.drivingLicense.name,
    };

    {Object.values(props.employee.clothings).map((key) => clothingSize = Object.assign({}, clothingSize, { [key.type.name] : key.size }) )}

    otherInfo = {
      'Informacija': props.employee.otherInfo,
    }
    
    contactInfo = {
      'Telefonas': props.employee.phone,
      'El. paštas': props.employee.email,
    };
  }

  return (
    <React.Fragment>
      {props.employee ? (
        <div className="py-4 px-5 bg-white">
          <div className="p-2 border d-inline-block">
            <div className="w-20 h-20 border rounded-circle text-center text-sm">
              {/* Photo placeholder */}
              <img
                src={props.employee?.profileUrl!}
                className="d-block w-20 h-20 rounded-circle"
                // width={85}
                // style={{ borderRadius: '50%', marginLeft: '-3px', marginTop: '1px' }}
                alt="Profile url"
              />
            </div>
          </div>
          <div className="action py-3 row">
            {/* <button className="d-inline-block w-auto py-3 text-xs text-lowercase rounded">
            Atnaujinti duomenis
          </button> */}
            <div className="col-3 mr-3">
              <Button
                onClick={() => setRightModalShow(true)}
                className="text-capitalize b-radius">
                Atnaujinti duomenis
              </Button>
            </div>
            <div className="col-3 ml-3">
              <Button
                className="text-capitalize b-radius light"
                // onClick={() => setPopupModalShow(true)}
              >
                Archyvuoti darbuotoją
              </Button>
            </div>
            {/* <button className="mx-2 d-inline-block w-auto py-3 text-sm text-lowercase rounded">
            Archyvuoti darbuotoją
          </button> */}
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <Details title="Duomenys" data={basicInfo} />
            </div>
            
            <div className="col-12 col-md-6">
              <Details title="Darbo sąlygos" data={workingCondition} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Kontaktiniai duomenys" data={contactInfo} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Gyvenamoji vieta" data={residenceInfo} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Vairuotojo pažymėjimas" data={drivingLicense} />
            </div>

            <div className="col-12 col-md-6">
              <Details title="Avalynės ir drabužių dydžiai" data={clothingSize} />
            </div>
            
            <div className="col-12 col-md-6">
              <Details title="Kita info" data={otherInfo} />
            </div>
          </div>

          <AddNewEmployeeModal
            handleSuccess={() => setisSuccessModalOpen(true)}
            show={rightModalShow}
            className={'side-modal'}
            setShow={setRightModalShow}
            onHide={() => setRightModalShow(false)}
            employeeId={props.employee.id}
            isUpdating={true}
          />

          <SuccessModal
            isUpdate={true}
            show={isSuccessModalOpen}
            onHide={() => setisSuccessModalOpen(false)}
            setShow={setisSuccessModalOpen}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
}
