//package com.hashdb.entities;
//
//import java.math.BigInteger;
//
//import javax.persistence.*;
//
//import org.springframework.data.annotation.Id;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "image")
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class Image {
//	@Id
//	@Column(name = "id")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//
//	@Column(name = "name")
//	private String name;
//
//	@Column(name = "type")
//	private String type;
//	
//	@Column(name = "otherHashValue")
//	private BigInteger otherHashValue;
//	
//	@Column(name = "len")
//	private int len;
//	
//	@Column(name="algorithmId")
//	private int algorithmId;
//	
//}