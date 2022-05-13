import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { queryClient } from '../../../plugins/react-query';
import { clothingStore } from '../../../store/clothing.store';
import { drivingLicenseStore } from '../../../store/driving-license.store';
import { employeeRoleStore } from '../../../store/employee-role.store';
import { employeeStore } from '../../../store/employees.store';
import { employmentTermStore } from '../../../store/employment-term.store';
import { employmentTypeStore } from '../../../store/employment-type.store';
import { nationalityStore } from '../../../store/nationality.store';
import { workingWeekStore } from '../../../store/working-week.store';
import { SelectData, ValueType } from '../../../types';
import { ICreateEmployee, ModalProps } from '../../../types/props';
import { groupClothinByType } from '../../../utils/clothing';
import Input from '../../Atoms/Form/Input';
import CustomSelect from '../../Atoms/Form/Select';
import Heading from '../../Atoms/Heading';
import Icon from '../../Atoms/Icon';
import Button from '../../Molecules/Button/Button';
import Collapsible from '../../Molecules/Modal/Collapsible';

interface IModalProps extends ModalProps {
  employeeId?: string;
  isUpdating?: boolean;
  handleSuccess: () => void;
}

const defaultState: ICreateEmployee = {
  profileUrl:
    'https://res.cloudinary.com/jsanbderg/image/upload/v1652029488/image_odfnts.png',
  firstName: '',
  lastName: '',
  seqNumber: '',
  contractNumber: '',
  socialSecurityNumber: '',
  nationalityId: '',
  personalIdentificationNumber: '',
  employeeRoleId: '',
  employmentTypeId: '',
  employmentTermId: '',
  workingWeekId: '',
  salary: NaN,
  startDate: '',
  endDate: '',
  regDate: '',
  phone: '',
  email: '',
  address: '',
  postalCode: '',
  city: '',
  country: '',
  bankCode: '',
  bankAccountNumber: '',
  drivingLicenseId: '',
  otherInfo: '',
  clothingIds: [],
};

export default function AddNewEmployeeModal({
  setShow,
  employeeId,
  isUpdating = false,
  handleSuccess,
  ...props
}: IModalProps) {
  const closeModal = () => {
    setShow(false);
  };


  const [values, setvalues] = useState<ICreateEmployee>({ ...defaultState });
  const [data1, setData1] = useState<any>([{ id: 'id', size: 'size' }]);
  const [type1, setType1] = useState<string>('text');
  const [type2, setType2] = useState<string>('text');
  const [type3, setType3] = useState<string>('text');

  const handleChange = (e: ValueType) => {
    setvalues({ ...values, [e.name]: e.value });
  };

  const onBlurtype1 = (e: any) => {
    if (e.target.value === "") {
      setType1('text')
    }
  }

  const onBlurtype2 = (e: any) => {
    if (e.target.value === "") {
      setType2('text')
    }
  }

  const onBlurtype3 = (e: any) => {
    if (e.target.value === "") {
      setType3('text')
    }
  }

  const onFocus1 = (e: any) => {
    setType1('date')
  }

  const onFocus2 = (e: any) => {
    setType2('date')
  }

  const onFocus3 = (e: any) => {
    setType3('date')
  }

  const { data: employee } = employeeStore.getById(employeeId);
  const { data: nationalities } = nationalityStore.getAll();
  const { data: employeeRoles } = employeeRoleStore.getAll();
  const { data: employmentTypes } = employmentTypeStore.getAll();
  const { data: employmentTerms } = employmentTermStore.getAll();
  const { data: workingWeeks } = workingWeekStore.getAll();
  const { data: drivingLicenses } = drivingLicenseStore.getAll();
  const { data: clothingData } = clothingStore.getAll();
  const clothings = groupClothinByType(clothingData?.data || []);

  const { mutateAsync } = employeeStore.createEmployee();
  const { mutateAsync: updateMutation } = employeeStore.updateEmployee();

  useEffect(() => {
    if (employee?.data) {
      setvalues((prev) => ({
        ...prev,
        profileUrl: employee.data.profileUrl || '',
        firstName: employee.data.firstName,
        lastName: employee.data.lastName,
        seqNumber: employee.data.seqNumber,
        contractNumber: employee.data.contractNumber,
        socialSecurityNumber: employee.data.socialSecurityNumber,
        nationalityId: employee.data.nationality.id,
        personalIdentificationNumber: employee.data.personalIdentificationNumber,
        employeeRoleId: employee.data.employeeRole.id,
        employmentTypeId: employee.data.employmentType.id,
        employmentTermId: employee.data.employmentTerm.id,
        workingWeekId: employee.data.workingWeek?.id,
        salary: employee.data.salary,
        startDate: employee.data.startDate,
        endDate: employee.data.endDate,
        regDate: employee.data.regDate,
        phone: employee.data.phone,
        email: employee.data.email,
        address: employee.data.address,
        postalCode: employee.data.postalCode,
        city: employee.data.city,
        country: employee.data.country,
        bankCode: employee.data.bankCode,
        bankAccountNumber: employee.data.bankAccountNumber,
        drivingLicenseId: employee.data.drivingLicense.id,
        otherInfo: employee.data.otherInfo,

      }));
      setData1(employee.data.clothings)
    }
  }, [employee?.data]);

  const handleChangeClothing = (e: ValueType) => {
    const { clothingIds } = values;
    const newClothingIds = [...clothingIds, e.value.toString()];
    setvalues({ ...values, clothingIds: newClothingIds });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading('Saving ....');
    if (employeeId && isUpdating) {
      updateMutation(
        { ...values, id: employeeId },
        {
          async onSuccess(_data) {
            toast.success('Employee was updated successfully', { id: toastId });
            queryClient.invalidateQueries(['employeeById', employeeId]);
            closeModal();
            handleSuccess();
          },
          onError(error: any) {
            toast.error(
              error.response.data.message || 'error occurred please try again',
              { id: toastId },
            );
          },
        },
      );
    } else {
      mutateAsync(values, {
        async onSuccess(_data) {
          toast.success('Employee was created successfully', { id: toastId });
          queryClient.invalidateQueries(['employees']);
          closeModal();
          resetForm();
          handleSuccess();
        },
        onError(error: any) {
          toast.error(error.response.data.message || 'error occurred please try again', {
            id: toastId,
          });
        },
      });
    }
  };

  const resetForm = () => {
    setvalues({ ...defaultState });
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  return (
    <div className="side-modal">
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div className="body-header p-4 mb-2 d-flex justify-content-between">
            <Heading fontWeight="bold" fontSize="xl">
              {isUpdating ? 'Atnaujinti duomenis' : 'Registruoti naują'}
            </Heading>
            <button className="close-icon btn w-auto" type="button" onClick={closeModal}>
              <span className="close-txt font-bold text-capitalize tracking-0">
                Uždaryti
              </span>
              <img
                src={'/icons/close-icon.svg'}
                className="cursor-pointer"
                width={30}
                alt="close-icon"
              />
            </button>
          </div>
          <div className="body-content px-4">
            <Collapsible isOpen={true} title="Duomenys">
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <div className="profile-pic w-20 h-20">
                    <label
                      htmlFor="profileUrl"
                      className="w-20 h-20 border rounded-circle text-center text-sm py-3 px-2 bg-light-gray cursor-pointer">
                      <Icon name="plus" size={28} />
                      <p className="text-xxs">Pridėti nuotrauką</p>
                    </label>
                  </div>
                  {/* hidden input file */}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="profileUrl"
                    id="profileUrl"
                    onChange={(_e) => {
                      // const file = e.target.files[0];
                      // if (file) {
                      //   const reader = new FileReader();
                      //   reader.onloadend = () => {
                      //     setvalues((prev) => ({ ...prev, profileUrl: reader.result }));
                      //   };
                      //   reader.readAsDataURL(file);
                      // }
                    }}
                    hidden
                  />

                  <div className="profile-info w-100 row px-3">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        name="seqNumber"
                        handleChange={handleChange}
                        placeholder="Grafiko Nr. *"
                        value={values.seqNumber}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        className="mr-3"
                        name="contractNumber"
                        handleChange={handleChange}
                        placeholder="Sutarties Nr. *"
                        value={values.contractNumber}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <Input
                        name="socialSecurityNumber"
                        handleChange={handleChange}
                        placeholder="Sodros Nr."
                        value={values.socialSecurityNumber}
                      />
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-2">
                      <CustomSelect
                        name="nationalityId"
                        handleChange={handleChange}
                        placeholder="Šalis *"
                        value={values.nationalityId}
                        options={
                          nationalities?.data.map((n) => ({
                            value: n.id,
                            label: n.name,
                          })) as SelectData[]
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="personalIdentificationNumber"
                      handleChange={handleChange}
                      placeholder="Asmens kodas *"
                      value={values.personalIdentificationNumber}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="firstName"
                      handleChange={handleChange}
                      placeholder="Vardas *"
                      value={values.firstName}
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                    <Input
                      name="lastName"
                      handleChange={handleChange}
                      placeholder="Parvardė *"
                      value={values.lastName}
                    />
                  </div>
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Darbo sąlygos">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employeeRoleId"
                    handleChange={handleChange}
                    placeholder="Pareigos *"
                    value={values.employeeRoleId}
                    options={
                      employeeRoles?.data.map((n) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2" >
                  <Input
                    className="mr-3"
                    type={type1}
                    onFocus={onFocus1}
                    onBlur={onBlurtype1}
                    name="regDate"
                    handleChange={handleChange}
                    placeholder="Įdarbinimo data *"
                    value={values.regDate}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="startDate"
                    type={type2}
                    onFocus={onFocus2}
                    onBlur={onBlurtype2}
                    handleChange={handleChange}
                    placeholder="Pirmoji darbo diena *"
                    value={values.startDate}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="endDate"
                    type={type3}
                    onFocus={onFocus3}
                    onBlur={onBlurtype3}
                    handleChange={handleChange}
                    placeholder="Paskutinė darbo diena"
                    value={values.endDate}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employmentTermId"
                    handleChange={handleChange}
                    placeholder="Sutarties tipas *"
                    value={values.employmentTermId}
                    options={
                      employmentTerms?.data.map((n) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="employmentTypeId"
                    handleChange={handleChange}
                    placeholder="Etatas *"
                    value={values.employmentTypeId}
                    options={
                      employmentTypes?.data.map((n) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    name="workingWeekId"
                    handleChange={handleChange}
                    placeholder="Darbo savaitė *"
                    value={values.workingWeekId}
                    options={
                      workingWeeks?.data.map((n) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="salary"
                    type="number"
                    handleChange={handleChange}
                    placeholder="Atlyginimas"
                    value={values.salary}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Kontaktiniai duomenys">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="phone"
                    type="tel"
                    handleChange={handleChange}
                    placeholder="Telefonas *"
                    value={values.phone}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    className="mr-3"
                    name="email"
                    handleChange={handleChange}
                    placeholder="El. paštas *"
                    value={values.email}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Gyvenamoji vieta">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="address"
                    handleChange={handleChange}
                    placeholder="Adresas"
                    value={values.address}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    className="mr-3"
                    name="postalCode"
                    handleChange={handleChange}
                    placeholder="Pašto kodas"
                    value={values.postalCode}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="city"
                    handleChange={handleChange}
                    placeholder="Miestas"
                    value={values.city}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="country"
                    handleChange={handleChange}
                    placeholder="Valstybė"
                    value={values.country}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Banko rekvizitai">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    name="bankCode"
                    handleChange={handleChange}
                    placeholder="Banko rekvizitai"
                    value={values.bankCode}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <Input
                    className="mr-3"
                    name="bankAccountNumber"
                    handleChange={handleChange}
                    placeholder="Sąskaitos numeris"
                    value={values.bankAccountNumber}
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Vairuotojo pazymejimas">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2">
                  <CustomSelect
                    className="mr-3"
                    name="drivingLicenseId"
                    handleChange={handleChange}
                    placeholder="Kategorija"
                    value={values.drivingLicenseId}
                    options={
                      drivingLicenses?.data.map((n) => ({
                        value: n.id,
                        label: n.name,
                      })) as SelectData[]
                    }
                  />
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Avalynės ir drabužių dydžiai">
              <div className="p-3 row">
                {/* Informacija apie drabužius */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 p-2 d-flex flex-wrap gap-2">
                  {Object.keys(clothings).map((item) => (
                    <CustomSelect
                      key={item}
                      name={`clothings.${item}`}
                      handleChange={handleChangeClothing}
                      placeholder={item}
                      value={isUpdating && data1.find((ditem: { id: string; }) => clothings[item].find(citem => citem.id === ditem.id) !== undefined)?.id}
                      options={
                        clothings[item]?.map((n) => ({
                          value: n.id,
                          label: n.size,
                        })) as SelectData[]
                      }
                    />
                  ))}
                </div>
              </div>
            </Collapsible>
            <Collapsible isOpen={true} title="Kita info">
              <div className="p-3 row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-8 p-2">
                  <Input
                    name="otherInfo"
                    handleChange={handleChange}
                    placeholder=""
                    value={values.otherInfo}
                  />
                </div>
              </div>
            </Collapsible>
          </div>
          <div className="body-modal-footer row px-4">
            <div className="col-3 mr-2">
              <Button className="text-capitalize b-radius" onClick={() => handleSubmit()}>
                <Icon name="save" />
                <span>Išsaugoti</span>
              </Button>
            </div>
            <div className="col-3">
              <Button className="text-capitalize b-radius light" onClick={handleCancel}>
                Atšaukti
              </Button>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
              <div className="d-flex w-100 m-0">
                  <div className="col-6">
                      <Button children={'Kurti naują'} className={'whitish curved-border-left'}/>
                  </div>
                  <div className="col-6">
                      <Button children={'Uždaryti'} className={'blueish curved-border-right'}/>
                  </div>
              </div>
          </Modal.Footer> */}
      </Modal>
    </div>
  );
}
