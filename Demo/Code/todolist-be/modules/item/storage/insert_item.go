package storage

import (
	"context"
	"todo-list/common"
	"todo-list/modules/item/model"
)

/*
InsertItem creates a new item in the database
*/
func (s *sqlStorage) InsertItem(ctx context.Context, data *model.TodoItemCreation) error {
	if err := s.db.Create(data).Error; err != nil {
		return common.ErrDB(err)
	}
	return nil
}
