package model

import (
	"errors"
	"todo-list/common"
)

const EntityName = "Todo_Item"

var (
	ErrTitleEmpty    = errors.New("title can't be empty")
	ErrItemIsDeleted = errors.New("item is deleted")
)

type TodoItem struct {
	common.BaseSQLModel
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Status      EnumStatus `json:"status"`
	Tag         string     `json:"tag"`
}

func (TodoItem) TableName() string {
	return "todo_items"
}

type TodoItemCreation struct {
	Id          int         `json:"-" gorm:"column:id"`
	Title       string      `json:"title" gorm:"column:title"`
	Description string      `json:"description" gorm:"column:description"`
	Status      *EnumStatus `json:"status" gorm:"column:status"`
	Tag         string      `json:"tag" gorm:"column:tag"`
}

func (TodoItemCreation) TableName() string {
	return "todo_items"
}

type TodoItemUpdate struct {
	Title       *string     `json:"title" gorm:"column:title"`
	Description *string     `json:"description" gorm:"column:description"`
	Status      *EnumStatus `json:"status" gorm:"column:status"`
	Tag         *string     `json:"tag" gorm:"column:tag"`
}

func (TodoItemUpdate) TableName() string {
	return "todo_items"
}
