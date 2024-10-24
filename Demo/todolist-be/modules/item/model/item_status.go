package model

import (
	"database/sql/driver"
	"fmt"
	"strings"
)

type EnumStatus int

const (
	ItemStatusToDo    EnumStatus = iota
	ItemStatusDoing   EnumStatus = iota
	ItemStatusDone    EnumStatus = iota
	ItemStatusDeleted EnumStatus = iota
)

// String is a method on the EnumStatus type, which converts the EnumStatus to a string value
func (s *EnumStatus) String() string {
	return [...]string{"TO_DO", "DOING", "DONE", "DELETED"}[*s]
}

// parseStr2EnumStatus is a helper function to convert a string to EnumStatus
func parseStr2EnumStatus(str string) (EnumStatus, error) {
	switch str {
	case "TO_DO":
		return ItemStatusToDo, nil
	case "DOING":
		return ItemStatusDoing, nil
	case "DONE":
		return ItemStatusDone, nil
	case "DELETED":
		return ItemStatusDeleted, nil
	default:
		return -1, fmt.Errorf("parseStr2EnumStatus: %s is not a valid EnumStatus", str)
	}
}

// Scan is a method on the EnumStatus type, which converts the value from the database to the EnumStatus type
func (s *EnumStatus) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("EnumStatus.Scan: %v is not a []byte", value)
	}

	str, err := parseStr2EnumStatus(string(bytes))

	if err != nil {
		return err
	}

	*s = str

	return nil
}

// Value is a method on the EnumStatus type, which converts the EnumStatus to a value that can be stored in the database
func (s *EnumStatus) Value() (driver.Value, error) {
	if s == nil {
		return nil, nil
	}
	return s.String(), nil
}

// MarshalJSON is a method on the EnumStatus type, which converts the EnumStatus to a JSON value
func (s *EnumStatus) MarshalJSON() ([]byte, error) {
	if s == nil {
		return nil, nil
	}

	return []byte(fmt.Sprintf("\"%s\"", s.String())), nil
}

// UnmarshalJSON is a method on the EnumStatus type, which converts the JSON value to the EnumStatus type
func (s *EnumStatus) UnmarshalJSON(data []byte) error {
	str := strings.ReplaceAll(string(data), "\"", "")

	enum, err := parseStr2EnumStatus(str)

	if err != nil {
		return err
	}

	*s = enum

	return nil
}
