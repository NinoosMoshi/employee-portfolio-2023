package com.ninos.service;

import com.ninos.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {

//    List<EmployeeDTO> getAllEmployees();


    List<EmployeeDTO> getAllEmployees(int page, int size);

    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO, Long id);
    void deleteEmployeeById(Long id);

    Long findAllEmployeeSize();



}
