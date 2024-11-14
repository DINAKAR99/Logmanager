package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "lm_services_mst")
public class ServiceMaster {

  @Id
  @Column(name = "service_id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "serviceMasterSequenceGenerator")
  @SequenceGenerator(name = "serviceMasterSequenceGenerator", allocationSize = 1)
  private Long serviceId;

  @Column(name = "service_name")
  private String serviceName;

  @Column(name = "url")
  private String url;

  @Column(name = "parent_id")
  private int parentId;

  @Column(name = "display_order")
  private int displayOrder;

  @Column(name = "description")
  private String description;

  @Column(name = "delete_flag")
  private String deleteFlag;

  @Column(name = "is_parent_col")
  private String isParentCol;

  @Column(name = "service_path")
  private String servicePath;

  @Transient
  private String checked;

  public String getChecked() {
    return checked;
  }

  public void setChecked(String checked) {
    this.checked = checked;
  }

  public String getServicePath() {
    return servicePath;
  }

  public void setServicePath(String servicePath) {
    this.servicePath = servicePath;
  }

  public String getIsParentCol() {
    return isParentCol;
  }

  public void setIsParentCol(String isParentCol) {
    this.isParentCol = isParentCol;
  }

  public Long getServiceId() {
    return serviceId;
  }

  public void setServiceId(Long serviceId) {
    this.serviceId = serviceId;
  }

  public String getServiceName() {
    return serviceName;
  }

  public void setServiceName(String serviceName) {
    this.serviceName = serviceName;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public int getParentId() {
    return parentId;
  }

  public void setParentId(int parentId) {
    this.parentId = parentId;
  }

  public int getDisplayOrder() {
    return displayOrder;
  }

  public void setDisplayOrder(int displayOrder) {
    this.displayOrder = displayOrder;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDeleteFlag() {
    return deleteFlag;
  }

  public void setDeleteFlag(String deleteFlag) {
    this.deleteFlag = deleteFlag;
  }

  @Override
  public String toString() {
    return ("ServiceMaster [serviceId=" +
        serviceId +
        ", serviceName=" +
        serviceName +
        ", url=" +
        url +
        ", parentId=" +
        parentId +
        ", displayOrder=" +
        displayOrder +
        ", description=" +
        description +
        ", deleteFlag=" +
        deleteFlag +
        ", isParentCol=" +
        isParentCol +
        ", servicePath=" +
        servicePath +
        ", checked=" +
        checked +
        "]");
  }
}
