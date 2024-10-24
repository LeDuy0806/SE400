package gin_item_handler

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"todo-list/common"
	"todo-list/modules/item/biz"
	"todo-list/modules/item/model"
	"todo-list/modules/item/storage"
)

func UpdateItem(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var itemBody model.TodoItemUpdate

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}

		if err := c.ShouldBindBodyWithJSON(&itemBody); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
			return
		}

		store := storage.NewSQLStorage(db)
		business := biz.NewUpdateItemBiz(store)

		if err := business.UpdateItem(c.Request.Context(), id, &itemBody); err != nil {
			c.JSON(http.StatusInternalServerError, err)
			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponseData(true))
	}
}
