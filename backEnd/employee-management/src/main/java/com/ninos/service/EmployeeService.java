package com.ninos.service;

import com.ninos.dto.EmployeeDTO;
import com.ninos.entity.Employee;

import java.util.List;

public interface EmployeeService {

//    List<EmployeeDTO> getAllEmployees();


    List<EmployeeDTO> getAllEmployees(int page, int size);

    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO, Long id);
    void deleteEmployeeById(Long id);

    Long findAllEmployeeSize();


    List<EmployeeDTO> getEmployeesByKey(String name,int page, int size);

    Long getEmployeeByKeyLength(String key);

}
