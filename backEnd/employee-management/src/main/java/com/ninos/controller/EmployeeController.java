package com.ninos.controller;
import com.ninos.dto.EmployeeDTO;
import com.ninos.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//    @GetMapping("/all")
//    public List<EmployeeDTO> getEmployees(){
//       return employeeService.getAllEmployees();
//    }




    // http://localhost:8080/api/v1/employees/all?page=#&size=#
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/all")
    public List<EmployeeDTO> getEmployees(@RequestParam int page, @RequestParam int size){
        return employeeService.getAllEmployees(page,size);
    }



    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/employee-size")
    public Long getEmployeeSize(){
        return employeeService.findAllEmployeeSize();
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
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>(OK);
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public EmployeeDTO updateEmployee(@RequestBody EmployeeDTO employeeDTO, @PathVariable("id") Long employeeId){
         return employeeService.updateEmployee(employeeDTO,employeeId);
    }







}
