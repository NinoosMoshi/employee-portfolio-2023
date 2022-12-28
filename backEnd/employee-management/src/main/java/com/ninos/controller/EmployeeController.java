package com.ninos.controller;

import com.ninos.dto.EmployeeDTO;
import com.ninos.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/all")
    public List<EmployeeDTO> getEmployees(){
       return employeeService.getAllEmployees();
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/get-employee/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable("id") Long employeeId){
        return employeeService.getEmployeeById(employeeId);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public EmployeeDTO createNewEmployee(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.saveEmployee(employeeDTO);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public EmployeeDTO updateEmployee(@RequestBody EmployeeDTO employeeDTO, @PathVariable("id") Long employeeId){
         return employeeService.updateEmployee(employeeDTO,employeeId);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        EmployeeDTO employeeDTO = employeeService.getEmployeeById(employeeId);
        employeeService.deleteEmployeeById(employeeId);
        return new ResponseEntity<>("You delete Employee: " +
                employeeDTO.getFirstName() + " " + employeeDTO.getLastName() +" successfully", HttpStatus.OK);
    }




}
