package gin_item_handler

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"todo-list/common"
	"todo-list/modules/item/biz"
	"todo-list/modules/item/model"
	"todo-list/modules/item/storage"
)

func CreateItem(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var item model.TodoItemCreation

		if err := c.ShouldBind(&item); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}
		
		store := storage.NewSQLStorage(db)

		business := biz.NewCreateItemBiz(store)

		if err := business.CreateItem(c.Request.Context(), &item); err != nil {
			c.JSON(http.StatusBadRequest, err)
			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponseData(item.Id))
	}
}
