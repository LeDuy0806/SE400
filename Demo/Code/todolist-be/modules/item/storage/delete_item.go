package storage

import (
	"context"
	"todo-list/common"
	"todo-list/modules/item/model"
)

func (s *sqlStorage) DeleteItem(ctx context.Context, condition map[string]interface{}) error {
	if err := s.db.Table(model.TodoItem{}.TableName()).Where(condition).Updates(map[string]interface{}{
		"status": 4,
	}).Error; err != nil {
		return common.ErrDB(err)
	}
	return nil
}
