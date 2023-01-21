package com.ninos.repository;

import com.ninos.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;




public interface EmployeeRepository extends JpaRepository<Employee, Long> {

//     List<Employee> findEmployeeByFirstNameContaining(String name);
       Page<Employee> findEmployeeByFirstNameContaining(String name, Pageable pageable);

       @Query("select count (id) from Employee where firstName like %?1%")
       Long getEmployeeLengthByKeySearch(String key);




}
