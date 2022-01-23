<template>
  <v-card>
    <v-card-title>
      {{ $t('general.routes.scrapeInvoice') }}
    </v-card-title>
    <v-card-text>
      <div class="text-md-body-1">نکات استفاده:</div>
      <ul class="m-20">
        <li>
          کار استخراج صورت حساب باید به صورت خودکار انجام شود. اگر به هر دلیلی آخرین صورت حساب در لیست وجود نداشت،
          از این دکمه استفاده کنید.
        </li>
        <li>
          پروسه استخراج صورت حساب حدود یک تا دو دقیقه طول میکشه
        </li>
        <li>
          باید مطمئن باشید پسورد دیجیکالا آپدیت هست.
        </li>
        <li>
          در صورت عدم موفقیت مجدد بزنید.
        </li>
        <li>
          اونقدر بزن تا بالاخره درست شه. چون لاجیکش درسته ولی safety زیاد نذاشتم براش.
        </li>
        <li>
          در ضمن کار کردن ربات به باز بودن این صفحه ربطی نداره.بعد از زدن دکمه میتونید این صفحه رو ببندید
        </li>
      </ul>
      <v-btn
          v-if="taskId === null"
          @click="handleScrape"
          color="primary"
          class="m-10"
      >
        {{ $t('general.start') }}
      </v-btn>
      <v-progress-circular
          v-else-if="taskId && !taskDone"
          color="amber"
          class="m-10"
          indeterminate
      />
      <v-sheet v-if="taskDone">
        <v-btn
            v-if="taskState === 'FAILURE'"
            color="error"
            class="m-10"
            depressed
        >
          عملیات شکست خورد
        </v-btn>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'scrape',
  data() {
    return {
      taskId: null,
      taskState: undefined,
      taskColors: {
        'FAILURE': 'red',
        'PENDING': 'yellow',
        'SUCCESS': 'success',
      },
      stateInterval: null,
      taskSucceeded: false,
      taskFailed: false,
      taskDone: false,
    }
  },
  computed: {
    taskColor() {
      return this.taskColors[this.taskState] || 'black'
    },
  },
  beforeDestroy() {
    this.stopChecking()
  },
  methods: {
    handleScrape() {
      this.taskSucceeded = false
      this.taskFailed = false
      this.taskDone = false
      this.axios.post(this.$api.celeryTest)
          .then(res => {
            console.log('scrape task res', res)
            this.taskId = res.data.task_id
            this.handleTaskId()
          })
          .catch(err => {
            console.log('task test error', err)
            this.addSnackbar('red', err.response.data)
          })
    },
    handleTaskId() {
      this.stateInterval = window.setInterval(() => {
        const url = this.$api.taskState.replace('{0}', this.taskId)
        this.axios.get(url)
            .then(res => {
              console.log('task state response:', res)
              this.taskState = res.data.state
              console.log('taskState', this.taskState)
              if (this.taskState !== 'PENDING') {
                this.stopChecking()
                this.taskDone = true
                this.taskId = null
                if (this.taskState === 'SUCCESS') {
                  this.addAlert('success', this.$t('general.alert.operationSuccess'))
                  this.$router.push({name: 'invoiceDownload'})
                }
              }
            })
            .catch(err => {
              console.log('task state error', err)
              this.stopChecking()
            })
      }, 2000)

    },
    stopChecking() {
      window.clearInterval(this.stateInterval)
    },
  },
}
</script>

<style scoped>

</style>