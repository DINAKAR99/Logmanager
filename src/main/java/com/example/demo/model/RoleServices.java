package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "role_services")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RoleServices {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roleServiceSequenceGenerator")
    @SequenceGenerator(name = "roleServiceSequenceGenerator", allocationSize = 1)
    @Column(name = "role_id")
    private int roleId;
    @Column(name = "service_id")
    private int serviceId;
}
