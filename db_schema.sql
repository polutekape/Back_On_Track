CREATE TABLE USERS(
	userid char(15) NOT NULL PRIMARY KEY,
	password varchar(15) NOT NULL
	);

INSERT INTO USERS(userid,password) VALUES('kapz','polo');
INSERT INTO Data(userid,val) VALUES('kapz',3);
INSERT INTO Data(userid,val) VALUES('kapz',5);


CREATE TABLE Data(
	userid char(15) NOT NULL,
	dat DATE NOT NULL default CURRENT_DATE,
	tim TIME NOT NULL default CURRENT_TIME(0),
	val INT NOT NUll,
	PRIMARY KEY (userid,dat,tim),
	CONSTRAINT FK_Users FOREIGN KEY (userid) REFERENCES USERS(userid) ON DELETE RESTRICT ON UPDATE CASCADE
	); 
	

CREATE TABLE Vibrate(
	userid char(15) NOT NULL,
	dat DATE NOT NULL default CURRENT_DATE,
	vib INT,
	PRIMARY KEY(userid,dat),
	CONSTRAINT FK_Users FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE RESTRICT ON UPDATE CASCADE
	); 

CREATE OR REPLACE FUNCTION ins_RefIntgVibrate()
   RETURNS TRIGGER AS $$
   DECLARE 
   Res RECORD;
   Res2 RECORD;
   
   BEGIN 
   IF(TG_OP = 'INSERT') THEN
   	SELECT * INTO Res FROM Vibrate WHERE userid = NEW.userid;	
		IF FOUND THEN
	  		RAISE NOTICE '% updat its value',NEW.userid;
	  		UPDATE Vibrate SET vib = vib+1 WHERE userid = NEW.userid AND dat = NEW.dat;
	  		RETURN NULL;
		ELSE
	  		RAISE NOTICE 'New Student Inserted';
	  	   RETURN NEW;
		END IF;
	 END IF;   
   END;
$$ LANGUAGE PLpgSQL;


CREATE TRIGGER ins_RefIntgVibrate
BEFORE INSERT ON Vibrate FOR EACH ROW 
EXECUTE PROCEDURE ins_RefIntgVibrate();






