-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 11:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_selling`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `bill_monthly` (IN `_month_id` INT)   BEGIN

SELECT Amount from charge c JOIN employe e on c.employe_id=e.employe_id WHERE c.month=_month_id and c.employe_id=e.employe_id;



END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `charge_month` (IN `_month` INT, IN `_year` VARCHAR(100), IN `_description` TEXT, IN `_Account_id` INT, IN `_user_id` VARCHAR(100))   BEGIN
if(read_salary() > read_acount_balance(_Account_id))THEN
SELECT "Deny" as msg;
else
INSERT IGNORE INTO `charge`(`employe_id`, `title_id`, `Amount`, `Account_id`, `month`, `year`, `description`, `user_id`,`date`)
 SELECT e.employe_id,j.title_id,j.salary,_Account_id,_month,_year,_description,_user_id,
CURRENT_DATE from employe e JOIN job_title  j on e.title_id=j.title_id;
IF(row_count()>0)THEN
SELECT "Registered" as msg;
ELSE
SELECT "NOt" as msg;
END IF;    
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_procedure` (IN `_username` VARCHAR(100), IN `_password` VARCHAR(100))   BEGIN


if EXISTS(SELECT * FROM users WHERE users.username = _username and users.password = MD5(_password))THEN	


if EXISTS(SELECT * FROM users WHERE users.username = _username and 	users.status = 'Active')THEN
 
SELECT * FROM users where users.username = _username;

ELSE

SELECT 'Locked' msg;

end if;
ELSE


SELECT 'Deny' msg;

END if;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payment_statement` (IN `_tellphone` INT)   BEGIN

if(_tellphone = '0000-00-00')THEN
SELECT concat(c.frist_name, ' ', c.last_name) as customer_name, ca.car_name,p.amount as price, p.amount_paid,p.balance,ac.bank_name,pm.name as method,p.date from payment p JOIN customers c on p.customer_id=c.customer_id JOIN account ac on p.Account_id=ac.Account_id
JOIN payment_method pm on p.p_method_id=pm.p_method_id JOIN sell s on p.customer_id=s.customer_id JOIN car ca on s.car_id=ca.car_id;
ELSE
SELECT concat(c.frist_name, ' ', c.last_name) as customer_name, ca.car_name,p.amount as price, p.amount_paid,p.balance,ac.bank_name,pm.name as method,p.date from payment p JOIN customers c on p.customer_id=c.customer_id JOIN account ac on p.Account_id=ac.Account_id
JOIN payment_method pm on p.p_method_id=pm.p_method_id JOIN sell s on p.customer_id=s.customer_id JOIN car ca on s.car_id=ca.car_id WHERE c.phone=_tellphone;
END if;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_all_cars` ()   BEGIN

SELECT c.car_id,c.car_name,cm.modal as car_modal,c.size,s.company_name,c.unit_price,c.price from car c JOIN car_modals cm on c.car_modal_id=cm.car_modal_id JOIN suplier s on c.suplier_id=s.suplier_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_all_car_price` (IN `_car_id` INT)   BEGIN

SELECT c.car_id,c.price FROM car c WHERE c.car_id=_car_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_all_employe` ()   BEGIN
SELECT e.employe_id,e.frist_name,e.last_name,e.phone,e.city,e.state,b.address as branch,j.position,j.salary from employe e JOIN branch b on e.branch_id=b.branch_id JOIN job_title j on e.title_id=j.title_id ORDER BY e.employe_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_all_users` ()   BEGIN

SELECT u.user_id,concat(e.frist_name, ' ', e.last_name) as employe_name, u.username,u.image,u.date from users u JOIN employe e on u.employe_id=e.employe_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_amount` (IN `_customer_id` INT)   BEGIN

SELECT s.customer_id,s.balance FROM sell s WHERE s.customer_id=_customer_id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_customer_statement` (IN `_from` DATE, IN `_to` DATE)   BEGIN
if(_from = '0000-00-00')THEN
SELECT * FROM customers;
ELSE
SELECT * FROM customers WHERE  customers.date BETWEEN _from and _to ORDER by customers.date ASC;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_employe_name` ()   BEGIN


SELECT e.employe_id, concat(e.frist_name, ' ', e.last_name) as full_name from employe e;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_employe_statement` (IN `_tellphone` INT)   BEGIN
if(_tellphone = '0000-00-00')THEN
SELECT e.employe_id,e.frist_name,e.last_name,e.phone,e.city,e.state,b.address as branch,jt.position,jt.salary from employe e JOIN branch b on e.branch_id=b.branch_id JOIN job_title jt on e.title_id=jt.title_id;
ELSE
SELECT e.employe_id,e.frist_name,e.last_name,e.phone,e.city,e.state,b.address as branch,jt.position,jt.salary from employe e JOIN branch b on e.branch_id=b.branch_id JOIN job_title jt on e.title_id=jt.title_id WHERE phone=_tellphone;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_sell_statement` (IN `_tellphone` INT)   BEGIN

if(_tellphone = '0000-00-00')THEN
SELECT concat(c.frist_name, ' ', c.last_name) as customer_name, ca.car_name,ca.price,s.quantity,s.price as Total_price,s.date from sell s JOIN customers c on s.customer_id=c.customer_id JOIN car ca on s.car_id=ca.car_id;
ELSE
SELECT concat(c.frist_name, ' ', c.last_name) as customer_name, ca.car_name,ca.price,s.quantity,s.price as Total_price,s.date from sell s JOIN customers c on s.customer_id=c.customer_id JOIN car ca on s.car_id=ca.car_id 
WHERE c.phone=_tellphone;
END if;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register_expense_sp` (IN `_id` INT, IN `_amount` FLOAT(11,2), IN `_type` VARCHAR(50), IN `_desc` TEXT, IN `_userId` VARCHAR(50), IN `_Account_id` INT)   BEGIN
 if(_type = 'Expense')THEN

if((SELECT read_acount_balance(_Account_id) < _amount))THEN

SELECT 'Deny' as Message;

ELSE

INSERT into expense(expense.amount,expense.type,expense.description,expense.user_id,expense.Account_id)
VALUES(_amount,_type,_desc,_userId,_Account_id);

SELECT 'Registered' as Message;

END if;
ELSE
if(_type = 'Expense')THEN

if((SELECT read_acount_balance(_Account_id) < _amount))THEN

SELECT 'Deny' as Message;
END IF;
ELSE
if EXISTS( SELECT * FROM expense WHERE expense.id = _id)THEN
UPDATE expense SET expense.amount = _amount, expense.type = _type, expense.description = _desc,expense.user_id=_userId,expense.Account_id=_Account_id
WHERE expense.id = _id;

SELECT 'Updated' as Message;
ELSE

INSERT into expense(expense.amount,expense.type,expense.description,expense.user_id,expense.Account_id)
VALUES(_amount,_type,_desc,_userId,_Account_id);

SELECT 'Registered' as Message;

END if;
END IF;

END if;

END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `read_acount_balance` (`_Account_id` INT) RETURNS INT(11)  BEGIN
SET @balance=0.00;
SELECT SUM(balance)INTO @balance FROM account WHERE Account_id
=_Account_id;
RETURN @balance;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `read_salary` () RETURNS DECIMAL(11,2)  BEGIN
SET @salary=0.00;
SELECT SUM(salary)INTO @salary FROM job_title;
RETURN @salary;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Account_id` int(11) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `holder_name` varchar(50) NOT NULL,
  `accoun_number` int(11) NOT NULL,
  `balance` decimal(12,0) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account_id`, `bank_name`, `holder_name`, `accoun_number`, `balance`, `date`) VALUES
(2, 'ips_pank', 'samafale', 618846254, 59060, '2023-06-06 11:40:08'),
(3, 'Hormuud', 'anwar', 616095981, 339, '2023-06-04 18:07:17'),
(5, 'Edahab', 'farxaan', 2147483647, 80, '2023-06-04 18:52:10');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `bill_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `Amount` decimal(11,2) NOT NULL,
  `month` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `address`, `city`, `state`, `date`) VALUES
(1, 'hodan', 'mugdisho', 'banadir', '2023-05-07 20:54:52'),
(3, 'hilwaa', 'mugdisho', 'banadir', '2023-05-08 22:13:50');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `car_id` int(11) NOT NULL,
  `car_name` varchar(50) NOT NULL,
  `car_modal_id` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `suplier_id` int(11) NOT NULL,
  `unit_price` float(11,2) NOT NULL,
  `price` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`car_id`, `car_name`, `car_modal_id`, `size`, `suplier_id`, `unit_price`, `price`, `date`) VALUES
(2, 'toyota', 1, 66, 1, 7000.00, 7800, '2023-05-11 10:56:20'),
(3, 'marchines', 2, 69, 2, 4000.00, 4900, '2023-05-10 07:57:11'),
(4, 'Tesla Model S', 1, 34, 8, 9000.00, 9800, '2023-05-27 06:22:10'),
(5, 'Jaguar F-Type', 9, 34, 3, 9000.00, 9900, '2023-05-27 06:22:47'),
(6, 'Kia Sportage', 11, 34, 9, 9000.00, 9800, '2023-05-27 06:23:11'),
(7, 'Mazda MX-5 Miata', 12, 34, 11, 9000.00, 9800, '2023-05-27 06:23:33');

-- --------------------------------------------------------

--
-- Table structure for table `car_modals`
--

CREATE TABLE `car_modals` (
  `car_modal_id` int(11) NOT NULL,
  `modal` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_modals`
--

INSERT INTO `car_modals` (`car_modal_id`, `modal`) VALUES
(1, 'Toyota Camry'),
(2, 'Honda Civic'),
(3, 'Ford F-150'),
(4, 'Chevrolet Silverado'),
(5, 'Nissan Altima'),
(6, 'Hyundai Elantra'),
(7, 'Kia Optima'),
(8, 'BMW 3 Series'),
(9, 'Mercedes-Benz C-Class'),
(10, 'Audi A4'),
(11, 'Volkswagen Jetta'),
(12, 'Subaru Outback'),
(13, 'Jeep Wrangler'),
(14, 'Toyota RAV4'),
(15, 'Honda CR-V'),
(16, 'Ford Mustang'),
(17, 'Chevrolet Corvette'),
(18, 'Porsche 911'),
(19, 'Lamborghini Huracan'),
(20, 'Ferrari 488 GTB'),
(21, 'mmmm');

-- --------------------------------------------------------

--
-- Table structure for table `charge`
--

CREATE TABLE `charge` (
  `charge_id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `Amount` decimal(12,0) NOT NULL,
  `month` int(11) NOT NULL,
  `year` varchar(100) NOT NULL,
  `Account_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charge`
--

INSERT INTO `charge` (`charge_id`, `employe_id`, `title_id`, `Amount`, `month`, `year`, `Account_id`, `description`, `user_id`, `date`) VALUES
(1, 1, 1, 200, 1, '2023', 2, 'mushaar', 'USR001', '2023-06-05 16:00:00'),
(2, 3, 2, 240, 1, '2023', 2, 'mushaar', 'USR001', '2023-06-05 16:00:00'),
(3, 4, 3, 700, 1, '2023', 2, 'mushaar', 'USR001', '2023-06-05 16:00:00'),
(4, 5, 4, 500, 1, '2023', 2, 'mushaar', 'USR001', '2023-06-05 16:00:00'),
(5, 6, 5, 2000, 1, '2023', 2, 'mushaar', 'USR001', '2023-06-05 16:00:00');

--
-- Triggers `charge`
--
DELIMITER $$
CREATE TRIGGER `update_balance` AFTER INSERT ON `charge` FOR EACH ROW BEGIN
UPDATE account SET balance= balance-new.Amount
WHERE Account_id=new.Account_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `frist_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `frist_name`, `last_name`, `phone`, `address`, `city`, `state`, `date`) VALUES
(1, 'maxamed ', 'nuur', '616727782', 'dayniile', 'mugdisho', 'Banaadir', '2023-06-03 11:03:08'),
(2, 'shuuriye', 'saciid', '3733878', 'hilwaa', 'mugdisho', 'banaadir', '2023-06-04 14:26:54'),
(3, 'nafiso', 'saciid', '373783', 'hilwaa', 'mugdisho', 'banaadir', '2023-06-04 14:28:00'),
(4, 'cabdalla', 'abdiwaahid', '61728282', 'taleex', 'mugdisho', 'banadir', '2023-06-05 07:07:14'),
(5, 'nuur', 'cali', '266278268', 'hodan', 'mugdisho', 'banadir', '2023-06-05 07:31:56'),
(6, 'caisha', 'saciid', '6627628', 'hilwaa', 'mugdisho', 'banadir', '2023-06-05 07:32:20'),
(7, 'faiza', 'nuur', '2626782', 'yaaqshiid', 'mugdisho', 'banadir', '2023-06-05 07:32:42'),
(8, 'abdikaafi', 'saalax', '252565676', 'hilwaa', 'mugdisho', 'banadir', '2023-06-05 07:46:48'),
(9, 'abdifitaax', 'maxamed', '762767867', 'hilwaa', 'mugdisho', 'banaadir', '2023-06-05 07:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `employe`
--

CREATE TABLE `employe` (
  `employe_id` int(11) NOT NULL,
  `frist_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employe`
--

INSERT INTO `employe` (`employe_id`, `frist_name`, `last_name`, `phone`, `city`, `state`, `branch_id`, `title_id`, `date`) VALUES
(1, 'anwar', 'isaakh', '616095981', 'mugdisho', 'banadir', 1, 1, '2023-05-15 09:49:14'),
(3, 'moha', 'ali', '65765678', 'mugdisho', 'banadir', 3, 2, '2023-06-04 18:45:31'),
(4, 'farxaan', 'saciid', '615566565', 'mugdisho', 'banadir', 3, 3, '2023-06-04 18:45:36'),
(5, 'deeq', 'nuur', '619989878', 'mugdisho', 'banadir', 1, 4, '2023-06-04 18:45:41'),
(6, 'shamso', 'saciid', '617289392', 'ugdisho', 'banaadir', 1, 5, '2023-06-04 18:45:44');

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `id` int(11) NOT NULL,
  `amount` float(9,2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `Account_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`id`, `amount`, `type`, `description`, `user_id`, `Account_id`, `date`) VALUES
(1, 200.00, 'Income', 'webhost', 'USR001', 5, '2023-06-03 22:31:26'),
(2, 400.00, 'Expense', 'kiro', 'USR001', 2, '2023-06-04 14:28:54'),
(3, 300.00, 'Income', 'web', 'USR001', 2, '2023-06-04 14:30:36'),
(4, 100.00, 'Income', 'web', 'USR001', 2, '2023-06-04 14:30:46');

--
-- Triggers `expense`
--
DELIMITER $$
CREATE TRIGGER `update_acc` AFTER INSERT ON `expense` FOR EACH ROW BEGIN
    IF NEW.type = 'Income' THEN
        UPDATE account
        SET balance = balance+new.amount
        WHERE Account_id=new.Account_id;
        
        ELSE
                UPDATE account
        SET balance = balance-new.amount
        WHERE Account_id=new.Account_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `job_title`
--

CREATE TABLE `job_title` (
  `title_id` int(11) NOT NULL,
  `position` varchar(50) NOT NULL,
  `salary` decimal(12,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_title`
--

INSERT INTO `job_title` (`title_id`, `position`, `salary`) VALUES
(1, 'waardiye', 200),
(2, 'cleaner', 240),
(3, 'Manager', 700),
(4, 'Assistant Manager', 500),
(5, 'Administrator', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`month_id`, `month_name`) VALUES
(1, 'Jan'),
(2, 'Feb'),
(3, 'Mar'),
(4, 'Apr'),
(5, 'May'),
(6, 'Jun'),
(7, 'July'),
(8, 'Aug'),
(9, 'Sep'),
(10, 'Oct'),
(11, 'Nov'),
(12, 'Dec');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(12,0) NOT NULL,
  `amount_paid` decimal(12,0) NOT NULL DEFAULT 0,
  `balance` decimal(12,0) NOT NULL DEFAULT 0,
  `Account_id` int(11) NOT NULL,
  `p_method_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `customer_id`, `amount`, `amount_paid`, `balance`, `Account_id`, `p_method_id`, `date`) VALUES
(1, 1, 14700, 14000, 700, 2, 1, '2023-06-04 14:33:10'),
(2, 1, 700, 400, 300, 2, 1, '2023-06-04 14:33:19'),
(3, 1, 300, 300, 0, 2, 1, '2023-06-04 14:33:25'),
(4, 2, 29400, 29400, 0, 2, 1, '2023-06-04 14:33:45'),
(5, 3, 9800, 9000, 800, 2, 1, '2023-06-04 14:34:20'),
(6, 3, 800, 800, 0, 2, 1, '2023-06-04 14:34:27'),
(7, 4, 58800, 58800, 0, 2, 1, '2023-06-05 07:09:11');

--
-- Triggers `payment`
--
DELIMITER $$
CREATE TRIGGER `update_account_balance` AFTER INSERT ON `payment` FOR EACH ROW BEGIN
UPDATE account SET balance= balance+new.amount_paid
WHERE Account_id=new.Account_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_price` AFTER INSERT ON `payment` FOR EACH ROW BEGIN

update sell s set s.balance=new.balance 
WHERE s.customer_id=new.customer_id;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_status` AFTER INSERT ON `payment` FOR EACH ROW BEGIN
    IF NEW.balance = 0 THEN
        UPDATE sell
        SET status = 'paid'
        WHERE customer_id=new.customer_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `p_method_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`p_method_id`, `name`) VALUES
(1, 'Evc'),
(2, 'EDahab'),
(3, 'Bank');

-- --------------------------------------------------------

--
-- Table structure for table `sell`
--

CREATE TABLE `sell` (
  `sell_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sell`
--

INSERT INTO `sell` (`sell_id`, `customer_id`, `car_id`, `quantity`, `price`, `balance`, `status`, `date`) VALUES
(1, 1, 3, 3, 14700, 0, 'paid', '2023-06-04 14:33:25'),
(2, 2, 4, 3, 29400, 0, 'paid', '2023-06-04 14:33:45'),
(3, 3, 3, 2, 9800, 0, 'paid', '2023-06-04 14:34:27'),
(4, 4, 6, 6, 58800, 0, 'paid', '2023-06-05 07:09:11'),
(5, 5, 6, 3, 29400, 29400, 'pending', '2023-06-05 07:33:01'),
(6, 6, 7, 2, 19600, 19600, 'pending', '2023-06-05 07:33:12'),
(7, 7, 3, 3, 14700, 14700, 'pending', '2023-06-05 07:33:27'),
(8, 8, 5, 3, 29700, 29700, 'pending', '2023-06-05 07:47:42'),
(9, 9, 7, 1, 9800, 9800, 'pending', '2023-06-05 07:47:52');

-- --------------------------------------------------------

--
-- Table structure for table `suplier`
--

CREATE TABLE `suplier` (
  `suplier_id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suplier`
--

INSERT INTO `suplier` (`suplier_id`, `company_name`, `country`) VALUES
(1, 'Toyota', 'Japan'),
(2, 'Ford', 'United States'),
(3, 'General Motors (GM)', 'United States'),
(4, 'Honda', 'Japan'),
(5, 'Nissan', 'Japan'),
(6, 'Volkswagen (VW)', 'Germany'),
(7, 'BMW', 'Germany'),
(8, 'Tesla', 'United States'),
(9, 'Mazda', 'Japan'),
(10, 'Subaru', 'Japan'),
(11, 'Lexus', 'Japan'),
(12, 'Chevrolet', 'United States');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Active',
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employe_id`, `username`, `password`, `image`, `status`, `date`) VALUES
('USR001', 1, 'anwar', '202cb962ac59075b964b07152d234b70', 'USR001.png', 'Active', '2023-06-04 19:42:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `car_modal_id` (`car_modal_id`),
  ADD KEY `suplier_id` (`suplier_id`);

--
-- Indexes for table `car_modals`
--
ALTER TABLE `car_modals`
  ADD PRIMARY KEY (`car_modal_id`);

--
-- Indexes for table `charge`
--
ALTER TABLE `charge`
  ADD PRIMARY KEY (`charge_id`),
  ADD UNIQUE KEY `employe_id` (`employe_id`,`month`,`year`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`employe_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `title_id` (`title_id`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_title`
--
ALTER TABLE `job_title`
  ADD PRIMARY KEY (`title_id`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `Account_id` (`Account_id`),
  ADD KEY `payment_method_id` (`p_method_id`),
  ADD KEY `payment_ibfk_2` (`customer_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`p_method_id`);

--
-- Indexes for table `sell`
--
ALTER TABLE `sell`
  ADD PRIMARY KEY (`sell_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `suplier`
--
ALTER TABLE `suplier`
  ADD PRIMARY KEY (`suplier_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD KEY `employe_id` (`employe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `Account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `car_modals`
--
ALTER TABLE `car_modals`
  MODIFY `car_modal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `charge`
--
ALTER TABLE `charge`
  MODIFY `charge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employe`
--
ALTER TABLE `employe`
  MODIFY `employe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job_title`
--
ALTER TABLE `job_title`
  MODIFY `title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `p_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sell`
--
ALTER TABLE `sell`
  MODIFY `sell_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `suplier`
--
ALTER TABLE `suplier`
  MODIFY `suplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`car_modal_id`) REFERENCES `car_modals` (`car_modal_id`),
  ADD CONSTRAINT `car_ibfk_2` FOREIGN KEY (`suplier_id`) REFERENCES `suplier` (`suplier_id`);

--
-- Constraints for table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`),
  ADD CONSTRAINT `employe_ibfk_2` FOREIGN KEY (`title_id`) REFERENCES `job_title` (`title_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`Account_id`) REFERENCES `account` (`Account_id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`p_method_id`) REFERENCES `payment_method` (`p_method_id`);

--
-- Constraints for table `sell`
--
ALTER TABLE `sell`
  ADD CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `sell_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employe_id`) REFERENCES `employe` (`employe_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
