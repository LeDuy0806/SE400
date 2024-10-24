package storage

import (
	"context"
	"todo-list/common"
	"todo-list/modules/item/model"
)

func (s *sqlStorage) UpdateItem(ctx context.Context, condition map[string]interface{}, data *model.TodoItemUpdate) error {
	if err := s.db.Model(&model.TodoItem{}).Where(condition).Updates(data).Error; err != nil {
		return common.ErrDB(err)
	}
	return nil
}
