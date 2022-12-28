package com.ninos.service.impl;

import com.ninos.dto.EmployeeDTO;
import com.ninos.entity.Employee;
import com.ninos.repository.EmployeeRepository;
import com.ninos.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOS = employees.stream().map(temp -> entityToDto(temp)).collect(Collectors.toList());
        return employeeDTOS;
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).get();
        EmployeeDTO employeeDTO = entityToDto(employee);
        return employeeDTO;
    }



    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        Employee employee = dtoToEntity(employeeDTO);
        Employee save = employeeRepository.save(employee);

        EmployeeDTO employeeDtoResponse = entityToDto(save);
        return employeeDtoResponse;
    }




    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO, Long id) {
        Employee employee = employeeRepository.findById(id).get();

        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPhone(employeeDTO.getPhone());
        Employee save = employeeRepository.save(employee);

        EmployeeDTO employeeDtoResponse = entityToDto(save);
        return employeeDtoResponse;
    }



    @Override
    public void deleteEmployeeById(Long id) {
       employeeRepository.deleteById(id);
    }




    // DTO To Entity
    public Employee dtoToEntity(EmployeeDTO employeeDTO){
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        return employee;
    }

    // Entity To DTO
    public EmployeeDTO entityToDto(Employee employee){
        EmployeeDTO employeeDTO = modelMapper.map(employee, EmployeeDTO.class);
        return employeeDTO;
    }




}
