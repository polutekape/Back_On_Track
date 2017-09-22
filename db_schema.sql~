CREATE TABLE USERS(
	userid char(15) NOT NULL PRIMARY KEY,
	password varchar(15) NOT NULL
	);

CREATE TABLE Data(
	userid char(15) NOT NULL,
	dat DATE NOT NULL default CURRENT_DATE,
	tim TIME NOT NULL default CURRENT_TIME(0),
	val INT NOT NUll,
	CONSTRAINT FK_Users FOREIGN KEY (userid) REFERENCES USERS(userid) ON DELETE RESTRICT ON UPDATE CASCADE
	); 

INSERT INTO USERS(userid,password) VALUES('kapz','polo');
INSERT INTO Data(userid,val) VALUES('kapz',3);
INSERT INTO Data(userid,val) VALUES('kapz',5);