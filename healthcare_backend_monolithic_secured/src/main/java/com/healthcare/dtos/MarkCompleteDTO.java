package com.healthcare.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * {
 *        "appointmentId" : 1,
           "testIds": [1, 2, 3],
  		   
	}
 */
@Getter
@Setter
@ToString //only during debugging
@AllArgsConstructor
@NoArgsConstructor
public class MarkCompleteDTO {
	private Long appointmentId;
	private List<Long> testIds;//conversion done by Jackso n from json[] -> List
}
